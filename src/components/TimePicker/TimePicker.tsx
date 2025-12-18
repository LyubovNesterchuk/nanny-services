import { useEffect, useRef, useState } from "react";
import css from "./TimePicker.module.css";
import sprite from "/sprite.svg";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
}

export default function TimePicker({
  value,
  onChange,
  options,
  error,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={wrapperRef}>
  
      <button
        type="button"
        className={`${css.input} ${error ? css.error : ""}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={css.value}>{value || "00:00"}</span>

        <svg className={css.icon} width="20" height="20">
          <use href={`${sprite}#icon-clock`} />
        </svg>
      </button>

      {open && (
        <div className={css.dropdown}>
          <p className={css.title}>Meeting time</p>

          <ul className={css.list}>
            {options.map(time => (
              <li key={time}>
                <button
                  type="button"
                  className={`${css.option} ${
                    value === time ? css.active : ""
                  }`}
                  onClick={() => {
                    onChange(time);
                    setOpen(false);
                  }}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
