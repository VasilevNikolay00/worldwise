import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import { Button } from "./Button";
import { ButtonBack } from "./ButtonBack";
import { Message } from "./Message";
import { Spinner } from "./Spinner";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeocodingError] = useState("");
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode) throw new Error("Click somewhere else.");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    createCity(newCity);
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) return <Message message="Click on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={`${styles.form} ${isLoading && styles.loading}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button className="primary" onClick={handleSubmit}>
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}
