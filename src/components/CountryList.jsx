import s from './CountryList.module.css'
import CountryItem from "./CountryItem.jsx";
import Spinner from "./Spinner.jsx";
import {useCities} from "../contexts/CityProvider.jsx";

const CountryList = () => {
  const {cities, isLoading} = useCities()

  // const countries = []
  // cities.forEach((city) => {
  //   const found = !!countries.find((country) => country.country === city.country)
  //   if (!found)
  //     countries.push({country: city.country, emoji: city.emoji, id: city.id})
  // })

  const countries = cities.reduce((acc, curr)=>
    {
      if (!acc.find((item)=>item.country === curr.country))
        return [...acc, {country: curr.country, emoji: curr.emoji, id: curr.id}]
      return acc

    }
    ,[])

  if (isLoading) return <Spinner/>
  return (
    <ul className={s.countryList}>
      {
        countries.map((country) =>
          <CountryItem country={country} key={country.id}/>
        )
      }
    </ul>
  );
};

export default CountryList;
