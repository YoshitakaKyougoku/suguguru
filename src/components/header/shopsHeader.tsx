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
          <Link as={NextLink} href="/">
            HOME
          </Link>
          <Search lat={searchProps.lat} lng={searchProps.lng} />
        </Flex>
      </Container>
    </Box>
  );
}
