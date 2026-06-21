import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapAnimator({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;
    map.flyTo(center, zoom, {
      duration: 1.2,
    });
  }, [center, zoom, map]);

  return null;
}
