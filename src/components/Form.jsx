// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import Message from "./Message.jsx";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import BackBtn from "./BackBtn.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const {position} = useURLPosition()
  const [lat, lng] = position


  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [place, setPlace] = useState(null)

  useEffect(() => {
    const getPlace = async () => {
      try {
         setError(false)
        setIsLoading(true)
        const resp = await fetch(`${BASE_URL}/?latitude=${lat}&longitude=${lng}`)
        const res = await resp.json()
        console.log(res)

        if (!res.countryName) throw new Error("That's doesn't seem to be a city. Click somewhere else")

        setCityName(res.city || res.locality || '')
        setCountry(res.countryName)
        setEmoji(convertToEmoji(res.countryCode))
      } catch (err) {
        console.log('err', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    getPlace()
  }, [lat, lng])

  if (error) return <Message message={error} />
  if (isLoading) return <Spinner/>
  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
        <Button type='primary'>Add</Button>
        <BackBtn url={'/app/cities'}/>

      </div>
    </form>
  );
}

export default Form;
