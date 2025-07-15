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

//Contexts
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={"cities"} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City></City>} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
