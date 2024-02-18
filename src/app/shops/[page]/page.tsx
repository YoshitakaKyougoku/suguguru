"use client";
import ShopsHeader from "@/components/header/shopsHeader";
import { useShopsData } from "@/hooks/useShopsData";
import { Center, Spinner } from "@chakra-ui/react";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import PageNation from "@/components/shops/pageNation";
import ShopList from "@/components/shops/shopList";

export default function Shops() {
  const searchParams = useSearchParams();
  const params = useParams();
  const page = Number(params?.page[0]);
  const lat = searchParams?.get("lat") || "";
  const lng = searchParams?.get("lng") || "";
  const range = searchParams?.get("range") || "";
  const { shops, fetchAndSetShops } = useShopsData();
  const searchQuery = useMemo(
    () => ({
      lat: lat || "",
      lng: lng || "",
      range: range || "",
      id: "",
      start: String(1 + (page - 1) * 10),
    }),
    [lat, lng, range, page]
  );

  useEffect(() => {
    fetchAndSetShops(searchQuery);
  }, [fetchAndSetShops, searchQuery]);
  const resultsAvailable = shops.results.results_available;
  const userPosition = {
    lat: Number(lat),
    lng: Number(lng),
  } as google.maps.LatLngLiteral;
  const shopPositions = shops.results.shop.map((shop) => ({
    lat: shop.lat,
    lng: shop.lng,
  })) as google.maps.LatLngLiteral[];
  if (!shops.results.shop[0]) {
    return (
      <Center>
        店舗データを取得中
        <Spinner />
      </Center>
    );
  }
  return (
    <>
      <ShopsHeader
        lat={Number(lat)}
        lng={Number(lng)}
        page={page}
        resultsAvailable={resultsAvailable}
      />

      <PageNation
        page={page}
        resultsAvailable={resultsAvailable}
        lat={lat}
        lng={lng}
        range={range}
      />
      <ShopList
        shops={shops}
        shopPositions={shopPositions}
        userPosition={userPosition}
      />

      <PageNation
        page={page}
        resultsAvailable={resultsAvailable}
        lat={lat}
        lng={lng}
        range={range}
      />
    </>
  );
}
