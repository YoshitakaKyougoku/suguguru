"use client";
import ShopMap from "@/components/map";
import Marker from "@/components/marker";
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
            <CardHeader bg={"#F1F1F1"}>
              <Flex>
                <Center
                  mx={3}
                  p={1}
                  borderRadius={"md"}
                  bg={"white"}
                  w={20}
                  h={10}
                >
                  <Link href="/">HOME</Link>
                </Center>
                <Center w={"100%"} justifyContent={"center"}>
                  <Flex>
                    <Image
                      alt="shop logo"
                      src={shops.results.shop[0].logo_image}
                    />
                    <Heading>{shops.results.shop[0].name}</Heading>
                  </Flex>
                </Center>
              </Flex>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>
                        <Badge mx={1} variant="outline" colorScheme="green">
                          ジャンル
                        </Badge>
                      </Td>
                      <Td>
                        <Badge mx={1} colorScheme="green">
                          {shops.results.shop[0].genre.name}
                        </Badge>
                        <Badge mx={1} colorScheme="green">
                          {shops.results.shop[0].genre.catch}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Badge mx={1} variant="outline" colorScheme="pink">
                          アクセス
                        </Badge>
                      </Td>
                      <Td>
                        <Badge mx={1} colorScheme="pink">
                          {shops.results.shop[0].access}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Badge mx={1} variant="outline">
                          住所
                        </Badge>
                      </Td>
                      <Td>
                        <Badge mx={1}>{shops.results.shop[0].address}</Badge>
                      </Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>
                        <Badge mx={1} variant="outline">
                          営業時間
                        </Badge>
                      </Th>
                      <Th>
                        <Badge mx={1}>{shops.results.shop[0].open}</Badge>
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </CardHeader>
            <CardBody overflow={"hidden"}>
              {shops.results.shop[0].catch}
              <Box bg={"#F8C3C3"}>
                <Box>予算</Box>
                {shops.results.shop[0].budget.name}
              </Box>
              <Box bg={"#F8C3C3"}>
                <Box>席数</Box>
                {shops.results.shop[0].capacity}
              </Box>
              <Box bg={"#F8C3C3"}>
                <Link href={shops.results.shop[0].urls.pc} target="_blank">
                  <Box>HOT PEPPER で見る</Box>
                </Link>
              </Box>
              <Flex w={"100%"}>
                <Image alt="shop icon" src={shops.results.shop[0].photo.pc.l} />
                <Box h={"100%"} w={"100%"}>
                  <Wrapper
                    apiKey={"AIzaSyAUsgbJtYrh3G_hgHRfBndftkJqSQSEvNc"}
                    render={render}
                  >
                    <ShopMap
                      style={{ height: "100%", aspectRatio: "3 / 1" }}
                      center={shopPositions[0]}
                    >
                      <Marker
                        userPosition={userPosition}
                        position={shopPositions[0]}
                        title={shops.results.shop[0].name}
                      />
                    </ShopMap>
                  </Wrapper>
                </Box>
              </Flex>
              Powered by{" "}
              <a href="http://webservice.recruit.co.jp/" target="_blank">
                ホットペッパーグルメ Webサービス
              </a>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </Box>
  );
}
