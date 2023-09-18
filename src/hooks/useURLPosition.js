import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


export const useURLPosition = ()=>{

  let [searchParams, setSearchParams] = useSearchParams();

  let lat = searchParams.get('lat')
  let lng = searchParams.get('lng')

  const [position, setPosition] = useState([lat, lng])

  useEffect(() => {
    setPosition([lat,lng ])
  }, [lat, lng])

  return ({position, setSearchParams})

}

