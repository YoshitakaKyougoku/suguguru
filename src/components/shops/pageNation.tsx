import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Center, Flex } from "@chakra-ui/react";
import Link from "next/link";
type PageNationProps = {
  page: number;
  resultsAvailable: number;
  lat: string;
  lng: string;
  range: string;
};
export default function PageNation(props: PageNationProps) {
  const { page, resultsAvailable, lat, lng, range } = props;
  return (
    <Center w={"100%"}>
      <Flex alignItems={"center"} w={"30%"} justifyContent={"space-around"}>
        {page > 1 ? (
          <Box>
            <Link
              href={{
                pathname: `/shops/${page - 1}`,
                query: {
                  lat: lat,
                  lng: lng,
                  range: range,
                },
              }}
            >
              <ChevronLeftIcon />
            </Link>
          </Box>
        ) : (
          <span style={{ opacity: 0.5 }}>
            <ChevronLeftIcon />
          </span> // クリック不可のスタイル
        )}
        <div>{page}</div>
        {Number(page) * 10 < resultsAvailable ? (
          <Flex alignItems={"center"}>
            <Link
              href={{
                pathname: `/shops/${page + 1}`,
                query: {
                  lat: lat,
                  lng: lng,
                  range: range,
                },
              }}
            >
              <ChevronRightIcon />
            </Link>
          </Flex>
        ) : (
          <span style={{ opacity: 0.5 }}>
            <ChevronRightIcon />
          </span>
        )}
      </Flex>
    </Center>
  );
}
