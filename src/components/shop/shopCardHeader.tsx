import {
  Badge,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { Shop } from "@/types/hotpepperResponse";
type ShopCardHeaderProps = {
  shop: Shop;
};

export default function ShopCardHeader(props: ShopCardHeaderProps) {
  const shop = props.shop;
  return (
    <CardHeader bg={"#F1F1F1"}>
      <Flex>
        <Center mx={3} p={1} borderRadius={"md"} bg={"white"} w={20} h={10}>
          <Link href="/">HOME</Link>
        </Center>
        <Center w={"100%"} justifyContent={"center"}>
          <Flex>
            <Image alt="shop logo" src={shop.logo_image} />
            <Heading>{shop.name}</Heading>
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
                  {shop.genre.name}
                </Badge>
                <Badge mx={1} colorScheme="green">
                  {shop.genre.catch}
                </Badge>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Badge mx={1} variant="outline" colorScheme="red">
                  アクセス
                </Badge>
              </Td>
              <Td>
                <Badge mx={1} colorScheme="red">
                  {shop.access}
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
                <Badge mx={1}>{shop.address}</Badge>
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
                <Badge mx={1}>{shop.open}</Badge>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </CardHeader>
  );
}
