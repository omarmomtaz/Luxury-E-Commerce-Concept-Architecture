import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import { StoreProvider } from "./context/StoreContext";
import CartDrawer from "./components/shared/CartDrawer";
import CheckoutModal from "./components/shared/CheckoutModal";
import PitchHubPage from "./pages/PitchHubPage";
import MaisonVerrePage from "./pages/MaisonVerrePage";
import SolenePage from "./pages/SolenePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PitchHubPage />} />
          <Route path="/maison-verre" element={<MaisonVerrePage />} />
          <Route path="/solene" element={<SolenePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
        <CheckoutModal />
      </BrowserRouter>
    </StoreProvider>
  );
}