import s from './Map.module.css'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet'
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CityProvider.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";

const Map = () => {
  const {cities} = useCities()
  let [searchParams, setSearchParams] = useSearchParams();
  const {getPosition, isLoading: geoLoading, position: geoPosition} = useGeolocation()

  let lat = searchParams.get('lat')
  let lng = searchParams.get('lng')

  const [position, setPosition] = useState([lat || 51.505, lng || -0.09])

  useEffect(() => {
    if (!lat && !lng) return

    lat = searchParams.get('lat')
    lng = searchParams.get('lng')

    setPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (geoPosition.lat) setSearchParams({lat: geoPosition.lat, lng: geoPosition.lng})
  }, [geoPosition])

  if (geoLoading) return <div className={s.mapContainer}><Spinner/></div>
  return (
    <div className={s.mapContainer}>
      <Button type='position' onClick={
        () => getPosition()

      }>Come to your place</Button>
      <MapContainer center={[lat || 51.505, lng || 0]} zoom={13} scrollWheelZoom={true} className={s.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => {
            return (
              <Marker position={[city.position.lat, city.position.lng]} key={city.position.lng}>
                <Popup>
                  {city.cityName}
                </Popup>
              </Marker>
            )
          })
        }
        <ChangePosition pos={position}/>

        <ClickMap/>
      </MapContainer>

    </div>
  );
};

const ChangePosition = ({pos}) => {
  const map = useMap()
  map.setView(pos)
  return null
}

const ClickMap = () => {
  const navigate = useNavigate()
  useMapEvents({
    'click': (e) => navigate(`form?lat=${e.latlng.lat}&lng=${(e.latlng.lng % 360 + 540) % 360 - 180}`)
  })

}

export default Map;
