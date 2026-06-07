// @ts-ignore
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFuelPrices } from './apis/fuelApiLib';
import { FuelApi } from './apis/FuelApi';

import Header from './components/Header';
import FuelMap from './components/FuelMap';
import About from './components/About';
import Home from './components/Home';
import StationDetail from './components/StationDetail';
import FuelTable from './components/FuelTable';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Componente principal de la aplicación
function App() {

  const [stations, setStations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFuelPrices()
      .then(data => {
        console.log(data);
        setStations(data.ListaEESSPrecio);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />

      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={<Home stations={stations} loading={loading} error={error} />}
        />
        <Route path="/mapa" element={<FuelMap stations={stations} />} />
        <Route path="/lista" element={<FuelTable stations={stations} />} />
        <Route
          path="/station/:id"
          element={<StationDetail stations={stations} user={user} />}
        />
        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;