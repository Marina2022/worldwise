import s from './CityItem.module.css'
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CityProvider.jsx";
import cn from 'classnames'
import {formatDate} from "../utils.js";


const CityItem = ({city}) => {
  const {currentCity, deleteCity} = useCities()

  const handleDelete = async (id)=>{
    await deleteCity(id)
  }

  const {emoji, cityName, date} = city
  return (
    <li className={cn({[s['cityItem--active']] : currentCity.id === city.id})}>
      <Link className={cn(s.cityItem, {[s['cityItem--active']]: currentCity.id === city.id})}
            to={`${city.id}?lng=${city.position.lng}&lat=${city.position.lat}`}
      >
        <span className={s.emoji}>{emoji}</span>
        <h3 className={s.name}>{cityName}</h3>
        <time className={s.date}>{
          formatDate(date)
        }</time>
        <button className={s.deleteBtn} onClick={(e)=> {
          e.preventDefault()
          handleDelete(city.id)
        }}>&times;</button>
      </Link>
    </li>
  )
    ;
};

export default CityItem;
