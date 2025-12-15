import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../schemas/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import css from "./AuthModal.module.css";

interface Props {
  onClose: () => void;
  mode: "login" | "register";
}

interface FormData {
  email: string;
  password: string;
}

export const AuthModal = ({ onClose, mode }: Props) => {
  const { login, register } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (mode === "login") {
      await login(data.email, data.password);
    } else {
      await register(data.email, data.password);
    }
    onClose();
  };

  
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...formRegister("email")} placeholder="Email" />
          <p>{errors.email?.message}</p>

          <input
            type="password"
            {...formRegister("password")}
            placeholder="Password"
          />
          <p>{errors.password?.message}</p>

          <button type="submit">
            {mode === "login" ? "Log in" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
