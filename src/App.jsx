// React and hooks
import { useEffect, useState } from "react";

// React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Global styles
import "./index.css";

// Pages
import { Homepage } from "./pages/Homepage";
import { Product } from "./pages/Product";
import { Pricing } from "./pages/Pricing";
import { PageNotFound } from "./pages/PageNotFound";
import { AppLayout } from "./pages/AppLayout";
import { Login } from "./pages/Login";

// Components
import { CityList } from "./components/CityList";
import { City } from "./components/City";
import { CountriesList } from "./components/CountriesList";
import { Form } from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:3001";

  useEffect(function () {
    async function fetchCities() {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to={"cities"} />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City></City>} />
          <Route
            path="countries"
            element={
              <CountriesList
                cities={cities}
                isLoading={isLoading}
              ></CountriesList>
            }
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
