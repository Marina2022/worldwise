import {createContext, useContext, useEffect, useReducer, useState} from "react";

const CityContext = createContext(null)

const CityProvider = ({children}) => {

  const BASE_URL = 'http://localhost:8000'

  const initialState = {
    cities: [],
    isLoading: false,
    isDeleteLoading: false,
    currentCity: {},
    error: ''
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'cities/loaded':
        return {...state, cities: action.payload, isLoading: false}
      case 'city/loaded':
        return {...state, currentCity: action.payload, isLoading: false}
      case 'rejected':
        console.log(action.payload)
        return {...state, isLoading: false, error: action.payload}
      case 'loading':
        return {...state, isLoading: true}
      case 'deleteLoading':
        return {...state, isDeleteLoading: true}
      case 'city/deleted':
        return {...state, isDeleteLoading: false}
      case 'city/created':
        return {...state, isLoading: false, currentCity: action.payload}

      case 'deleteRejected':
        console.log(action.payload)
        return {...state, isDeleteLoading: false, error: action.payload}
    }
  }

  const [{cities, isLoading, isDeleteLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

  const getCities = async () => {
    try {
      dispatch({type: 'loading'})
      const resp = await fetch(`${BASE_URL}/cities`)
      const res = await resp.json()
      dispatch({type: 'cities/loaded', payload: res})
    } catch (err) {
      dispatch({type: 'rejected', payload: err})
    }
  }

  useEffect(() => {
    getCities()
  }, [])

  const getCurrentCity = (id) => {
    if (Number(id) === Number(currentCity.id)) return
    console.log('я все равно иду', 'id = ', id, 'currentCity.id =',  currentCity.id)
    const getCity = async () => {
      try {
        dispatch({type: 'loading'})
        const resp = await fetch(`${BASE_URL}/cities/${id}`)
        const res = await resp.json()
        dispatch({type: 'city/loaded', payload: res})
      } catch (err) {
        dispatch({type: 'rejected', payload: err})
      }
    }
    getCity()
  }

  const createCity = async (newCity) => {
    try {
      dispatch({type: 'loading'})
      const resp = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await resp.json()
      dispatch({type: 'city/created', payload: res})
      getCities()
    } catch (err) {
      dispatch({type: 'rejected', payload: err})
    }
  }

  const deleteCity = async (id) => {
    try {
      dispatch({type: 'deleteLoading'})
      const resp = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      // const res = resp.json()
      getCities()
      dispatch({type: 'city/deleted'})
    } catch (err) {
      dispatch({type: 'deleteRejected', payload: err})
    }
  }


  return (
    <CityContext.Provider
      value={{cities, isLoading, currentCity, getCurrentCity, createCity, deleteCity, isDeleteLoading}}>
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
