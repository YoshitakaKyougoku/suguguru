import {
  Badge,
  Box,
  CardBody,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import Marker from "../marker";
import ShopMap from "../map";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Shop } from "@/types/hotpepperResponse";
const render = (status: Status) => {
  return <h1>{status}</h1>;
};
type ShopCardBodyProps = {
  shop: Shop;
  shopPosition: google.maps.LatLngLiteral;
  userPosition: google.maps.LatLngLiteral;
};

export default function ShopCardBody(props: ShopCardBodyProps) {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";
  const { shop, shopPosition, userPosition } = props;
  return (
    <CardBody overflow={"hidden"}>
      <Heading>{shop.catch}</Heading>
      <TableContainer>
        <Table variant="simple" bg={"#F8C3C3"}>
          <Tbody>
            <Tr>
              <Td>予算</Td>

              <Td isNumeric>{shop.budget.name}</Td>
            </Tr>
            <Tr>
              <Td>席数</Td>
              <Td isNumeric>{shop.capacity}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Badge bg={"#F8C3C3"}>
        <Link href={shop.urls.pc} target="_blank">
          <Box>HOT PEPPER で見る</Box>
        </Link>
      </Badge>
      <Flex w={"100%"}>
        <Image alt="shop icon" src={shop.photo.pc.l} />
        <Box h={"100%"} w={"100%"}>
          <Wrapper apiKey={mapApiKey} render={render}>
            <ShopMap
              style={{ height: "100%", aspectRatio: "3 / 1" }}
              center={shopPosition}
            >
              <Marker
                userPosition={userPosition}
                position={shopPosition}
                title={shop.name}
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
  );
}
