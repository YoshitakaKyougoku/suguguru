"use client";

import React, { useEffect, useState } from "react";

// MarkerProps 型に map を含める
interface MarkerProps extends google.maps.MarkerOptions {}

const Marker: React.FC<MarkerProps> = (options) => {
  // console.log("icon");
  // console.log(icon);
  console.log(options.position);
  // console.log(options.name);
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
      setInfoWindow(new google.maps.InfoWindow());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      // marker.setIcon(icon)
      infoWindow?.setContent(options.title);
      marker.addListener("click", () => {
        infoWindow?.open({
          anchor: marker,
        });
      });
    }
  }, [marker, options]);

  return null;
};

export default Marker;
