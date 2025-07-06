import style from "./CityList.module.css";
import { Spinner } from "./Spinner";
import { CityItem } from "./CityItem";

export function CityList({ cities, isLoading }) {
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
