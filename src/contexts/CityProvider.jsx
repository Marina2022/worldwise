import {createContext, useContext, useEffect, useState} from "react";

const CityContext = createContext(null)

const CityProvider = ({children}) => {

  const BASE_URL = 'http://localhost:8000'

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true)
        const resp = await fetch(`${BASE_URL}/cities`)
        const res = await resp.json()
        setCities(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getCities()
  }, [])

  const getCurrentCity = (id) => {
    const getCity = async () => {
      try {
        setIsLoading(true)
        const resp = await fetch(`${BASE_URL}/cities/${id}`)
        const res = await resp.json()
        setCurrentCity(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getCity()
  }


  return (
    <CityContext.Provider value={{cities, isLoading, currentCity, getCurrentCity}}>
      {children}
    </CityContext.Provider>
  );
};

const useCities = () => {
  const citiesContext = useContext(CityContext)
  if (citiesContext === undefined) throw new Error('CityContext is used out of CityProvider')
  return citiesContext
}

export {CityProvider, useCities};
