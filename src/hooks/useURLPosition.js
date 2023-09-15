import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


export const useURLPosition = ()=>{

  let [searchParams, setSearchParams] = useSearchParams();

  let lat = searchParams.get('lat') || 51.505
  let lng = searchParams.get('lng') || -0.09

  const [position, setPosition] = useState([lat, lng])

  useEffect(() => {
    lat = searchParams.get('lat')
    lng = searchParams.get('lng')

    setPosition([lat,lng ])
  }, [lat, lng])

  return ({position, setSearchParams})

}

