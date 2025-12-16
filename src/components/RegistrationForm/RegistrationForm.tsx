import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import css from './RegistrationForm.module.css';
import sprite from "/sprite.svg";

const schema = yup.object({
  name: yup
    .string()
    .max(32, 'Name must not exceed 32 characters')
    .required('Please enter your name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .required('Please enter a password'),
});

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  onClose: () => void;
}

export default function RegistrationForm({
  onClose,
}: RegistrationFormProps) {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await registerUser(data.email, data.password);
      toast.success('Registration successful! Welcome to Nanny.Services!');
      onClose();
    } catch (error) {
      let errorMessage = 'Registration error';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        
        if (firebaseError.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered';
        } else if (firebaseError.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        } else if (firebaseError.message) {
          errorMessage = firebaseError.message;
        }
      }

      toast.error(errorMessage);
    }
  };

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

      <h2 className={css.title}>Registration</h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.formGroup}>
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            className={css.input}
            maxLength={32}
          />
          {errors.name && (
            <span className={css.errorText}>{errors.name.message}</span>
          )}
        </div>

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
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={css.input}
            maxLength={128}
          />
          {errors.password && (
            <span className={css.errorText}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registration...' : 'Sign Up'}
        </button>
      </form>

      <p className={css.switchText}>
        Already have an account?{' '}
        <Link to="/sign-in" className={css.switchButton}>
          Log In
        </Link>
      </p>
    </div>
  );
}