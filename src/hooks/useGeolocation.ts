import { useEffect, useState } from "react";
type Coords = {
    latitude: number | null;
    longitude: number | null;
  };
export const useGeolocation = () => {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (!navigator.geolocation) {
        setError('Geolocationがサポートされていません');
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError('Geolocationが有効になっていません');
        }
      );
    }, []);
    return { coords, error };
}