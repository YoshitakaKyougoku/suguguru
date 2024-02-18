import { Box, Container, Flex, Link } from "@chakra-ui/react";
import Search from "@/components/search/search";
import NextLink from "next/link";
import { SearchProps } from "@/types/searchProps";

export default function ShopsHeader(searchProps: SearchProps) {
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
        </Flex>
      </Container>
    </Box>
  );
}
