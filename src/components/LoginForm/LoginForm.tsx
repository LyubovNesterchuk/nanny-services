import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import css from './LoginForm.module.css';
import sprite from "/sprite.svg";


const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter a password'),
});

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({
  onClose,
}: LoginFormProps) {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      onClose();
    } catch (error) {
      let errorMessage = 'Login error';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        
        if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = 'User not found';
        } else if (firebaseError.code === 'auth/wrong-password') {
          errorMessage = 'Invalid password';
        } else if (firebaseError.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid credentials';
        } else if (firebaseError.message) {
          errorMessage = firebaseError.message;
        }
      }

      toast.error(errorMessage);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={css.container}>
      <button className={css.closeButton} onClick={onClose} aria-label="Close">
        <svg
              className={css.iconClose}
              width="32"
              height="32"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-close`} />
        </svg>
      </button>

      <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.formGroup}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={css.input}
          />
          {errors.email && (
            <span className={css.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <div className={css.passwordWrapper}>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={css.input}
            />

            <button
              type="button"
              className={css.passwordToggle}
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                className={css.iconClose}
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use
                  href={`${sprite}#${
                    showPassword ? 'icon-eye' : 'icon-eye-off'
                  }`}
                />
              </svg>
            </button>
          </div>

          {errors.password && (
            <span className={css.errorText}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

    </div>
  );
}