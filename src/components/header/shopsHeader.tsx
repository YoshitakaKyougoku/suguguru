import { Box, Container, Flex, Link, Image, Center } from "@chakra-ui/react";
import Search from "@/components/search/search";
import NextLink from "next/link";
import { SearchProps } from "@/types/searchProps";

interface HeaderProps extends SearchProps {
  page: number;
  resultsAvailable: number;
}

export default function ShopsHeader(headerProps: HeaderProps) {
  const { lat, lng, page, resultsAvailable } = headerProps;
  return (
    <Box px={1} bgColor="#F8C3C3">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="1"
          justifyContent="space-between"
          alignItems="center"
        >
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
            <Center mx={3} p={1} borderRadius={"md"} bg={"white"}>
              <Link as={NextLink} href="/">
                HOME
              </Link>
            </Center>
          </Box>
          <Search lat={lat} lng={lng} />
          <Box w={100}>
            {resultsAvailable} 件中
            {1 + (page - 1) * 10}〜
            {resultsAvailable < page * 10 ? resultsAvailable : page * 10}
            件表示
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
