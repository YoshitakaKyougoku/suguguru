"use client";
import ShopMap from "@/components/map";
import Marker from "@/components/marker";
import ShopCardBody from "@/components/shop/shopCardBody";
import ShopCardHeader from "@/components/shop/shopCardHeader";
import { useShopsData } from "@/hooks/useShopsData";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
export default function Shop() {
  const searchParams = useSearchParams();
  const lat = searchParams?.get("lat") || "";
  const lng = searchParams?.get("lng") || "";
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "";
  const { shops, fetchAndSetShops } = useShopsData();
  const searchQuery = useMemo(
    () => ({
      lat: "",
      lng: "",
      range: "",
      id: id,
      start: "",
    }),
    [id]
  );
  const userPosition = {
    lat: Number(lat),
    lng: Number(lng),
  };
  useEffect(() => {
    fetchAndSetShops(searchQuery);
  }, [fetchAndSetShops, searchQuery]);

  const shop = shops.results.shop[0];
  const shopPositions = shops.results.shop.map((shop) => ({
    lat: shop.lat,
    lng: shop.lng,
  })) as google.maps.LatLngLiteral[];
  if (!shops.results.shop[0]) {
    return (
      <Center>
        店舗データを取得中&hellip;
        <Spinner />
      </Center>
    );
  }
  return (
    <Box>
      <Center w={"100vw"} h={"100vh"}>
        <Box w={"80%"} h={"100%"} bg={"#F8C3C3"} p={2}>
          <Card h={"100%"} w={"100%"}>
            <ShopCardHeader shop={shop} />

            <ShopCardBody
              shop={shop}
              shopPosition={shopPositions[0]}
              userPosition={userPosition}
            />
          </Card>
        </Box>
      </Center>
    </Box>
  );
}
