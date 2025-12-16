import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

import Modal from "./components/Modal/Modal";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location };

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />

      <Routes location={state?.background || location}>
        <Route path="/" element={<Home />} />
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



