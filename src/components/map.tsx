"use client";
import React, { useEffect, useRef, useState } from "react";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
};

const ShopMap: React.FC<MapProps> = ({ children, style, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      // オプションをスプレッド構文で展開する
      setMap(
        new google.maps.Map(ref.current, {
          ...options,
          center: options.center,
          zoom: options.zoom ?? 16, // ズーム値が提供されない場合はデフォルト値を使用
        })
      );
    }
  }, [ref, map, options]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // 子コンポーネントにpropsを渡す
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default ShopMap;
