import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { ButtonBack } from "./ButtonBack";
import { Spinner } from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export function City({ city }) {
  const { setLoading, isLoading, setCurrentCity, currentCity } = useCities();

  const { id } = useParams();

  useEffect(function () {
    async function fetchCities() {
      const BASE_URL = "http://localhost:3001";
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentCity(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  if (!currentCity) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}
