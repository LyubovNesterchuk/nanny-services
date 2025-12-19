import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ref, get } from "firebase/database";

import { auth, db } from "../../services/firebase";
import type { Nanny } from "../../types/nanny";
import { fetchNannies } from "../../utils/nannies";

import NannyCard from "../../components/NannyCard/NannyCard";
import Filters from "../../components/Filters/Filters";
import Modal from "../../components/Modal/Modal";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal";

import styles from "../Nannies/Nannies.module.css";

export default function Favorites() {
  const user = auth.currentUser;

  const [favorites, setFavorites] = useState<Nanny[]>([]);
  const [filter, setFilter] = useState("Show all");
  const [loading, setLoading] = useState(true);
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);

  useEffect(() => {
  if (!user) return;

  const loadFavorites = async () => {
    try {
      const favRef = ref(db, `users/${user.uid}/favorites`);
      const snapshot = await get(favRef);

      if (!snapshot.exists()) {
        setFavorites([]);
        return;
      }

      const favoriteIds = Object.keys(snapshot.val());

      const { items } = await fetchNannies(undefined, true);

      const favoriteNannies = items.filter(nanny =>
        favoriteIds.includes(nanny.id)
      );

      setFavorites(favoriteNannies);
    } catch {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  loadFavorites();
}, [user]);
  

  const filteredFavorites = useMemo(() => {
    const data = [...favorites];

    switch (filter) {
      case "A to Z":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case "Less than 10$":
        return data.filter(n => n.price_per_hour < 10);
      case "Greater than 10$":
        return data.filter(n => n.price_per_hour >= 10);
      case "Popular":
        return data.sort((a, b) => b.rating - a.rating);
      case "Not popular":
        return data.sort((a, b) => a.rating - b.rating);
      default:
        return data;
    }
  }, [favorites, filter]);

 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  const handleFavoriteRemoved = (id: string) => {
    setFavorites(prev => prev.filter(nanny => nanny.id !== id));
  };
  
  return (
    <section className={styles.page}>
      <Filters value={filter} onChange={setFilter} />

      {filteredFavorites.length === 0 ? (
        <p className={styles.empty}>
          You haven't added any nannies to your favorites yet
        </p>
      ) : (
        <ul className={styles.list}>
          {filteredFavorites.map(nanny => (
            <li key={nanny.id} className={styles.item}>
              <NannyCard
                nanny={nanny}
                onMakeAppointment={setSelectedNanny}
                onFavoriteRemoved={handleFavoriteRemoved}
              />
            </li>
          ))}
        </ul>
      )}

      {selectedNanny && (
        <Modal onClose={() => setSelectedNanny(null)}>
          <AppointmentModal
            nanny={selectedNanny}
            onClose={() => setSelectedNanny(null)}
          />
        </Modal>
      )}
    </section>
  );
}