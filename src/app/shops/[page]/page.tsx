"use client";
import ShopsHeader from "@/components/header/shopsHeader";
import { useShopsData } from "@/hooks/useShopsData";
import { Center, Spinner } from "@chakra-ui/react";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
export default function Shops() {
  const searchParams = useSearchParams();
  const params = useParams();
  const page = Number(params?.page[0]);
  const lat = searchParams?.get("lat") ?? undefined;
  const lng = searchParams?.get("lng") ?? undefined;
  const range = searchParams?.get("range") ?? undefined;
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
      <Center w={"100%"}>
        <Box w={"80%"}>
          {shops.results.shop.map((shop, index) => (
            <Box w={"100%"} h={"40%"} p={2} m={2} bg={"#F8C3C3"} key={index}>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={shop.photo.pc.l}
                  alt="shop image"
                />

                <Stack w={"50%"}>
                  <CardBody>
                    <Heading size="md">
                      <Link href={`/shop/${shop.id}`}>{shop.name}</Link>
                    </Heading>
                    <Stack></Stack>
                    <Text py="2">{shop.access}</Text>
                    <Text py="2">{shop.open}</Text>
                  </CardBody>
                </Stack>
                <CardFooter>
                  <Box h={"100%"}>
                    <Wrapper
                      apiKey={"AIzaSyAUsgbJtYrh3G_hgHRfBndftkJqSQSEvNc"}
                      render={render}
                    >
                      <ShopMap
                        style={{ height: "100%", aspectRatio: "1 / 1" }}
                        center={shopPositions[index]}
                      >
                        <Marker
                          position={shopPositions[index]}
                          title={shop.name}
                        />
                      </ShopMap>
                    </Wrapper>
                  </Box>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Box>
      </Center>
    </>
  );
}
