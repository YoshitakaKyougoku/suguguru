"use client";
import {
  Box,
  Image,
  Center,
  Text,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import Search from "@/components/search/search";
import { useShopsData } from "@/hooks/useShopsData";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useEffect } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Marker from "@/components/marker";
import ShopMap from "@/components/map";
import Link from "next/link";
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
export default function Home() {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";
  const { coords, error } = useGeolocation();
  const { shops, fetchAndSetShops } = useShopsData();
  useEffect(() => {
    // coordsが有効で、エラーがない場合のみfetchAndSetPostsを実行する
    if (coords && !error) {
      fetchAndSetShops({
        lat: String(coords.latitude) || "",
        lng: String(coords.longitude) || "",
        range: "2",
        id: "",
        start: "1",
      });
    }
  }, [coords, error, fetchAndSetShops]);
  if (error) {
    return <div>{error}</div>;
  }
  if (!coords) {
    return (
      <Center>
        位置データを取得中&hellip;
        <Spinner />
      </Center>
    );
  }
  if (!shops.results.shop[0]) {
    return (
      <Center>
        店舗データを取得中&hellip;
        <Spinner />
      </Center>
    );
  }
  const userPosition = {
    lat: coords?.latitude,
    lng: coords?.longitude,
  } as google.maps.LatLngLiteral;
  console.log(shops.results);
  const shopPositions = shops.results.shop.map((shop) => ({
    lat: shop.lat,
    lng: shop.lng,
  })) as google.maps.LatLngLiteral[];
  return (
    <Box w={"100vw"} h={"100vh"} bg={"#F8C3C3"} p={"3"} overflow={"hidden"}>
      <Center p={3}>
        <Text as="b" fontSize="2xl">
          すぐグル{" "}
        </Text>
        <Box>
          <a href="http://webservice.recruit.co.jp/">
            <Image
              src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
              alt="ホットペッパーグルメ Webサービス"
              width="135"
              height="17"
              border="0"
              title="ホットペッパーグルメ Webサービス"
            />
          </a>
        </Box>
      </Center>
      <Box mx={10}>
        <Search lat={coords?.latitude} lng={coords?.longitude} />
      </Box>
      <Center w={"100%"}>
        <Box w={"80%"}>
          <Center p={2} bg={"white"} m={2} borderRadius={"md"}>
            <Text>このあたりのおすすめTOP3</Text>
          </Center>

          <Stack>
            {shops.results.shop.slice(0, 3).map((shop, index) => (
              <Box p={1} key={shop.id}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={shop.photo.pc.s}
                    alt={shop.id}
                  ></Image>
                  <Flex>
                    <CardBody>
                      <Link
                        href={{
                          pathname: `/shop/${shop.id}`,
                          query: {
                            lat: String(userPosition.lat),
                            lng: String(userPosition.lng),
                          },
                        }}
                      >
                        {shop.name}
                      </Link>
                    </CardBody>
                    <CardFooter>{shop.catch}</CardFooter>
                  </Flex>
                </Card>
              </Box>
              // shop.idをkeyとして使用
            ))}
          </Stack>
        </Box>
      </Center>
      <Box mx={"auto"}>
        <Center w={"100%"}>
          <Box w={"80%"}>
            <Wrapper apiKey={mapApiKey} render={render}>
              <ShopMap
                style={{ width: "100%", aspectRatio: "3 / 1" }}
                center={shopPositions[0]}
              >
                {/* <Marker position={userPosition} icon={'.././favicon.ico'}/> */}
                {shops.results.shop.slice(0, 3).map((shop, index) => (
                  <Marker
                    key={index}
                    position={shopPositions[index]}
                    title={shop.name}
                    userPosition={userPosition}
                  />
                ))}
              </ShopMap>
            </Wrapper>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}
