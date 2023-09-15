import s from './CityList.module.css'
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCities} from "../contexts/CityProvider.jsx";

const CityList = () => {
  const {cities, isLoading} = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message={'Add your first city by clicking on the map'} />

  return (
     <ul className={s.cityList}>
       {
         cities.map((city) =>
           <CityItem city={city} key={city.id} />
         )
       }
     </ul>
  );
};

export default CityList;
