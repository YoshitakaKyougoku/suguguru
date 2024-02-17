"use client";
import ShopMap from "@/components/map";
import { useShopsData } from "@/hooks/useShopsData";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
export default function Shop() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "";
  // console.log(id);
  // console.log(Array.isArray(params?.id));
  const { shops, fetchAndSetShops } = useShopsData();
  const searchQuery = useMemo(
    () => ({
      lat: "",
      lng: "",
      range: "",
      id: id,
    }),
    [id]
  );

  useEffect(() => {
    fetchAndSetShops(searchQuery);
  }, [fetchAndSetShops, searchQuery]);
  // console.log(shops);
  const shopPositions = shops.results.shop.map((shop) => ({
    lat: shop.lat,
    lng: shop.lng,
  })) as google.maps.LatLngLiteral[];
  if (!shops.results.shop[0]) {
    return <div>店舗データを取得中&hellip;</div>;
  }
  return (
    <Box>
      <Link href="/">HOME</Link>
      <Center w={"100vw"} h={"100vh"}>
        <Box w={"80%"} h={"100%"} bg={"#F8C3C3"} p={2}>
          <Card h={"100%"} w={"100%"}>
            <CardHeader bg={"#F1F1F1"}>
              <Center>
                <Image alt="shop logo" src={shops.results.shop[0].logo_image} />

                <Heading>{shops.results.shop[0].name}</Heading>
              </Center>
              <Stack>
                <Flex alignItems="center">
                  <Box border={"1px"} p={1}>
                    ジャンル
                  </Box>
                  <Box>
                    {shops.results.shop[0].genre.name}:
                    {shops.results.shop[0].genre.catch}
                  </Box>
                </Flex>
                <Flex alignItems="center">
                  <Box border={"1px"} p={1}>
                    アクセス
                  </Box>
                  <Box>{shops.results.shop[0].access}</Box>
                </Flex>
                <Flex alignItems="center">
                  <Box border={"1px"} p={1}>
                    住所
                  </Box>
                  <Box>{shops.results.shop[0].address}</Box>
                </Flex>
                <Flex alignItems="center">
                  <Box border={"1px"} p={1}>
                    営業時間
                  </Box>
                  <Box>{shops.results.shop[0].open}</Box>
                </Flex>
              </Stack>
            </CardHeader>
            <CardBody overflow={"hidden"}>
              {shops.results.shop[0].catch}
              <Image alt="shop icon" src={shops.results.shop[0].photo.pc.l} />
              <Box h={"100%"}>
                <Wrapper
                  apiKey={"AIzaSyAUsgbJtYrh3G_hgHRfBndftkJqSQSEvNc"}
                  render={render}
                >
                  <ShopMap
                    style={{ height: "100%", aspectRatio: "1 / 1" }}
                    center={shopPositions[0]}
                  ></ShopMap>
                </Wrapper>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </Box>
  );
}
