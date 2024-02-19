"use client";

import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

// MarkerProps 型に map を含める
interface MarkerProps extends google.maps.MarkerOptions {
  userPosition: google.maps.LatLngLiteral;
}

const Marker: React.FC<MarkerProps> = (options) => {
  console.log(options.position);
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  const windowContent = (
    <div>
      {options.title}
      <br></br>
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${String(
          options.userPosition.lat
        )}%2C${String(options.userPosition.lng)}&destination=${String(
          options.position?.lat
        )}%2C${String(options.position?.lng)}`}
        target="_blank"
      >
        Goole Map で見る
      </a>
    </div>
  );

  const windowContentString = ReactDOMServer.renderToString(windowContent);
  console.log(windowContentString);
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
      setInfoWindow(new google.maps.InfoWindow());
    }

    // unmount時にマーカーを削除
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      infoWindow?.setContent(windowContentString);
      marker.addListener("click", () => {
        infoWindow?.open({
          anchor: marker,
        });
      });
    }
  }, [marker, options, infoWindow, windowContentString]);

  return null;
};

export default Marker;
