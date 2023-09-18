// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru"

// registerLocale("ru", ru)
// setDefaultLocale('ru');

import Message from "./Message.jsx";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackBtn from "./BackBtn.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import Spinner from "./Spinner.jsx";
import {convertToEmoji, formatDate} from "../utils.js";
import {useCities} from "../contexts/CityProvider.jsx";
import cn from "classnames";
import {useNavigate} from "react-router-dom";

function Form() {

  const {createCity, isLoading: isPostCityLoading} = useCities()
  const {position} = useURLPosition()
  const [lat, lng] = position

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    // если воьбют урл страницы руками - без квери строки
    if (!lat && !lng) {
      return
    }

    const getPlace = async () => {
      try {
        setError(null)
        setIsLoading(true)
        const resp = await fetch(`${BASE_URL}/?latitude=${lat}&longitude=${lng}`)
        const res = await resp.json()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createCity({cityName, date, notes, emoji, position: {lat, lng}, country})
    navigate('/app')
  }

  if (error) return <Message message={error}/>
  if (isLoading) return <Spinner/>
  if (!lat && !lng) return <Message message='Start by clicking somewhere on the map'/>
  return (
    <form className={cn(styles.form, isPostCityLoading && styles.loading)} onSubmit={handleSubmit}>
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

        <DatePicker selected={date} onChange={(date) => setDate(date)}
                    dateFormat='d MMMM yyyy'/>
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
        <Button type='primary'>{isPostCityLoading ? 'Sending...' : 'Add'}</Button>
        <BackBtn url={'/app/cities'}/>

      </div>
    </form>
  );
}

export default Form;
