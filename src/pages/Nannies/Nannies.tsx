import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMemo } from "react";

import type { Nanny } from "../../types/nanny";
import { fetchNannies } from "../../utils/nannies";
import NannyCard from "../../components/NannyCard/NannyCard";
import Filters from "../../components/Filters/Filters"
import styles from "./Nannies.module.css";

import Modal from "../../components/Modal/Modal";
import AppointmentModal from '../../components/AppointmentModal/AppointmentModal';

export default function Nannies() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("Show all");
  
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);


const filteredNannies = useMemo(() => {
  const data = [...nannies];

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
}, [nannies, filter]);

  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { items, lastKey: newKey } = await fetchNannies(
        lastKey || undefined
      );

      setNannies(prev => {
        const map = new Map(prev.map(n => [n.id, n]));
        items.forEach(n => map.set(n.id, n));
        return Array.from(map.values());
        });
      setLastKey(newKey);

      if (items.length < 3) {
        setHasMore(false);
      }
    } catch {
      toast.error("Failed to load nannies");
    } finally {
      setLoading(false);
    }
  }, [lastKey, loading, hasMore]);


const [initialized, setInitialized] = useState(false);

useEffect(() => {
  if (initialized) return;
  setInitialized(true);
  loadMore();
}, [initialized, loadMore]);

  return (
    <section className={styles.page}>
 
      <Filters value={filter} onChange={setFilter} />
      
      <ul className={styles.list}>
        {filteredNannies.map(nanny => (
          <li key={nanny.id} className={styles.item}>
            <NannyCard nanny={nanny} onMakeAppointment={setSelectedNanny}/>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
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