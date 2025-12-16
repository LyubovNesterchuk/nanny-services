import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import css from './LoginForm.module.css';

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

  return (
    <div className={css.container}>
      <button className={css.closeButton} onClick={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
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
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={css.input}
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
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className={css.switchText}>
        Don't have an account?{' '}
        <Link to="/sign-up" className={css.switchButton}>
          Register
        </Link>
      </p>
    </div>
  );
}