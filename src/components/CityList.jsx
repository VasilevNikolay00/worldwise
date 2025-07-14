import style from "./CityList.module.css";
import { Spinner } from "./Spinner";
import { CityItem } from "./CityItem";
import { useCities } from "../contexts/CitiesContext";

export function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities || cities.length === 0) {
    return <p className={style.noCities}>No cities found</p>;
  }

  return (
    <ul className={style.cityList}>
      {cities.map((city, i) => (
        <CityItem key={city.id} city={city}></CityItem>
      ))}
    </ul>
  );
}
