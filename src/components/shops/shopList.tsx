import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Link from "next/link";
import ShopMap from "../map";
import Marker from "../marker";
import { HotpepperResponse } from "@/types/hotpepperResponse";
type ShopListProps = {
  shops: HotpepperResponse;
  userPosition: google.maps.LatLngLiteral;
  shopPositions: google.maps.LatLngLiteral[];
};
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
export default function ShopList(props: ShopListProps) {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";
  const { shops, shopPositions, userPosition } = props;
  return (
    <Center w={"100%"}>
      <Box w={"80%"}>
        {shops.results.shop.map((shop, index) => (
          <Box w={"100%"} h={"100%"} p={2} m={2} bg={"#F8C3C3"} key={index}>
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
                    <Badge mx={1} colorScheme="green">
                      {shop.genre.name}
                    </Badge>
                  </Heading>
                  <Stack></Stack>
                  <Text py="2">{shop.access}</Text>
                  <Text py="2">{shop.open}</Text>
                </CardBody>
              </Stack>
              <CardFooter>
                <Box h={"100%"}>
                  <Wrapper apiKey={mapApiKey} render={render}>
                    <ShopMap
                      style={{ height: "100%", aspectRatio: "3 / 2" }}
                      center={shopPositions[index]}
                    >
                      <Marker
                        userPosition={userPosition}
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
  );
}
