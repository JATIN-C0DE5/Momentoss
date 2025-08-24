import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import CardsPage from './pages/CardsPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import RecipientPage from './pages/RecipientPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import './styles/globals.css';

function AppContent() {
  const location = useLocation();

  // Hide Navbar only on recipient page (/gcard/:hash)
  const hideNavbar = location.pathname.startsWith("/gcard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/confirmation/:id" element={<ConfirmationPage />} />
        <Route path="/gcard/:hash" element={<RecipientPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
