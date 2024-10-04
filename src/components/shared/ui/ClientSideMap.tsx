'use client';

import Image from 'next/image';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const cities = [
  {
    id: 1,
    position: { lat: 40.7128, lng: -74.006 },
    countryCode: 'US',
    cityName: 'New York',
  },
  {
    id: 2,
    position: { lat: 52.52, lng: 13.405 },
    countryCode: 'DE',
    cityName: 'Berlin',
  },
  {
    id: 3,
    position: { lat: 35.6895, lng: 139.6917 },
    countryCode: 'JP',
    cityName: 'Tokyo',
  },
];

const position: L.LatLngExpression = [41.0082, 28.9784];

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const flagemojiToPNG = (flag: string) => {
  if (typeof flag !== 'string' || flag.length === 0) {
    return null;
  }

  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0) || 0)
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return (
    <Image
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={flag}
      width={24}
      height={18}
    />
  );
};

function ClientSideMap() {
  return (
    <MapContainer
      className="h-full rounded-lg"
      center={position}
      zoom={1}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {cities.map((city) => (
        <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
          <Popup>
            <div className="pr-4 pt-1">
              <span className="flex gap-1">
                {flagemojiToPNG(convertToEmoji(city.countryCode))}
                <span className="text-nowrap">{city.cityName}</span>
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ClientSideMap;
