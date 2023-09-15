import s from './CityItem.module.css'
import logo from "./Logo.jsx";
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CityProvider.jsx";
import cn from 'classnames'

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({city}) => {
  const {currentCity} = useCities()

  const {emoji, cityName, date} = city
  return (
    <li className={currentCity.id === city.id ? s['cityItem--active'] : ''}>
      <Link className={cn(s.cityItem, {[s['cityItem--active']]: currentCity.id === city.id})}
            to={`${city.id}?lng=${city.position.lng}&lat=${city.position.lat}`}>
        <span className={s.emoji}>{emoji}</span>
        <h3 className={s.name}>{cityName}</h3>
        <time className={s.date}>{
          formatDate(date)
        }</time>
        <button className={s.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
    ;
};

export default CityItem;
