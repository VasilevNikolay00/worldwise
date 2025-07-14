import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

export function CityItem({ city }) {
  const {currentCity} = useCities();
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${city.id===currentCity?.id && styles["cityItem--active"]}`}
        to={`${city.id}?name=${city.cityName}&lat=${city.position.lat}&lng=${city.position.lng}`
        }>
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}
