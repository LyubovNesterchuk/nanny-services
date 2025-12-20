import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./NannyCard.module.css";

import type { Nanny } from "../../types/nanny";
import { getAge } from "../../utils/formatDate";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { auth } from "../../services/firebase";


type Props = {
  nanny: Nanny;
  onMakeAppointment: (nanny: Nanny) => void;
  onFavoriteRemoved?: (id: string) => void; 
};

export default function NannyCard({
  nanny,
  onMakeAppointment,
  onFavoriteRemoved,
}: Props) {
  
  const [expanded, setExpanded] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
 
   useEffect(() => {
    isFavorite(nanny.id).then(setIsFav);
  }, [nanny.id]);

  const handleFavorite = async () => {
  if (!auth.currentUser) {
    toast.error("This feature is available only for authorized users");
    return;
  }

  if (favLoading) return;

  try {
    setFavLoading(true);
    const result = await toggleFavorite(nanny.id);
    setIsFav(result);

    if (!result && onFavoriteRemoved) {
      onFavoriteRemoved(nanny.id); 
    }

    toast.success(
      result ? "Added to favorites" : "Removed from favorites"
    );
  } catch {
    toast.error("Something went wrong");
  } finally {
    setFavLoading(false);
  }
};

  return (
    <article className={styles.card}>
      
      <div className={styles.header}>

      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className={styles.avatar}
          />
          <span className={`${styles.status} ${styles["status--online"]}`} />
        </div>
      </div>

        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.textName}>
              <p className={styles.text}>Nanny</p>
              <h3 className={styles.name}>{nanny.name}</h3>
            </div>
            <div className={styles.meta}>
              <p className={styles.metaItem}>
                <svg className={styles.iconMap} 
                width="16"
                height="16"
                aria-hidden="true">
                  <use href={`${import.meta.env.BASE_URL}sprite.svg#icon-map-pin`} />
                </svg>
                {nanny.location} 
              </p>

              <p className={styles.metaItem}>
                <svg className={styles.iconStar} 
                width="16"
                height="16"
                aria-hidden="true">
                  <use href={`${import.meta.env.BASE_URL}sprite.svg#icon-star-fill`} />
                </svg>
                Rating: {nanny.rating} 
              </p>

              <p className={styles.metaItem}>
                Price / 1 hour:
                <span className={styles.price}> {nanny.price_per_hour}$</span>
              </p>
            </div>

              <button
                  type="button"
                  className={styles.heartBtn}
                  onClick={handleFavorite}
                  aria-label="Add to favorites"
                >
                  <svg
                    className={styles.heartIcon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <use
                      href={`${import.meta.env.BASE_URL}sprite.svg#${
                        isFav ? "icon-heart-red" : "icon-heart"
                      }`}
                    />
                  </svg>
                </button>
          </div>

          <ul className={styles.tags}>
            <li  className={styles.tagsItem}>Age: <span className={styles.tagsSpan}>{getAge(nanny.birthday)}</span></li>
            <li className={styles.tagsItem}>Experience: <span className={styles.tagsSpan}>{nanny.experience}</span></li>
            <li className={styles.tagsItem}>Kids Age: <span className={styles.tagsSpan}>{nanny.kids_age}</span></li>
            <li className={styles.tagsItem}>Characters: <span className={styles.tagsSpan}>{Array.isArray(nanny.characters)
                  ? nanny .characters.join(', ')
                  : nanny.characters || '—'}</span></li>
            <li className={styles.tagsItem}>Education: <span className={styles.tagsSpan}>{nanny.education}</span></li>
          </ul>
          <p className={styles.about}>{nanny.about}</p>

          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? "Hide" : "Read more"}
          </button>

          {expanded && (
                  <div className={styles.extra}>
                  {nanny.reviews?.length ? (
            <ul className={styles.comments}>
              {nanny.reviews.map((review) => (
                <li key={`${review.reviewer}-${review.rating}`} className={styles.comment}>
                  
                  <div className={styles.reviewHeader}>

                    <div className={styles.avatarReviewer}>
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>

                      <div className={styles.reviewer}>
                      <p className={styles.reviewerName}>{review.reviewer}</p>
                      <p className={styles.rating}>
                        <svg className={styles.iconStar} 
                          width="16"
                          height="16"
                          aria-hidden="true">
                            <use href={`${import.meta.env.BASE_URL}sprite.svg#icon-star-fill`} />
                        </svg> 
                        {review.rating.toFixed(1)}
                      </p>
                    </div>

                  </div>
                  <p className={styles.reviewerCommment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
             
              <button
                type="button"
                className={styles.appointment}
                onClick={() => onMakeAppointment(nanny)}
              >
                Make an appointment
              </button>
       
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
