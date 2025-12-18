import { useState } from "react";
import styles from "./Filters.module.css";

interface FiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Filters({ value, onChange }: FiltersProps) {
  const [open, setOpen] = useState(false);

  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Filters</span>

      <button
        className={styles.button}
        onClick={() => setOpen(prev => !prev)}
      >
        {value}
        <span className={open ? styles.arrowUp : styles.arrow} />
      </button>

      {open && (
        <ul className={styles.list}>
          {options.map(option => (
            <li
              key={option}
              className={styles.item}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}