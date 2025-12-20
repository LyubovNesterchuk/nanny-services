import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites/Favorites";
import Modal from "./components/Modal/Modal";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location };

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
        
      <Header />

      <Routes location={state?.background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      
      {state?.background && (
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Modal onClose={handleCloseModal}>
                <LoginForm onClose={handleCloseModal} />
              </Modal>
            }
          />

          <Route
            path="/sign-up"
            element={
              <Modal onClose={handleCloseModal}>
                <RegistrationForm onClose={handleCloseModal} />
              </Modal>
            }
          />

        </Routes>
      )}
    </>
  );
}

