import style from "./CountriesList.module.css";
import { Spinner } from "./Spinner";
import { CountriesItem } from "./CountriesItem";
import { useCities } from "../contexts/CitiesContext";

export function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities || cities.length === 0) {
    return <p className={style.noCities}>No countries found</p>;
  }

  const countriesSet = new Set(
    cities.map((city) => ({
      country: city.country,
      emoji: city.emoji,
    }))
  )
    .values()
    .toArray();

  return (
    <ul className={style.countryList}>
      {countriesSet.map((country, i) => {
        return <CountriesItem key={i} country={country}></CountriesItem>;
      })}
    </ul>
  );
}
