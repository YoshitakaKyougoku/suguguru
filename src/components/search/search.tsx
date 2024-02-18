"use client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { SearchProps } from "@/types/searchProps";

export default function Search(searchProps: SearchProps) {
  const { lat, lng } = searchProps;
  const [sliderValue, setSliderValue] = useState(2);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  return (
    <Box px={4} borderRadius={"md"} w={"100%"} bg={"#4C4C4C"} color={"white"}>
      <Flex justifyContent="space-between">
        <Center p={2} w={"90%"}>
          <Center>
            <Text p={3}>現在地からの距離</Text>
          </Center>
          <Slider
            aria-label="slider-ex-6"
            onChange={(val) => setSliderValue(val)}
            defaultValue={1}
            min={1}
            max={5}
            step={1}
            w={"80%"}
          >
            <SliderMark value={1} {...labelStyles}>
              ~300m
            </SliderMark>
            <SliderMark value={2} {...labelStyles}>
              ~500m
            </SliderMark>
            <SliderMark value={3} {...labelStyles}>
              ~1000m
            </SliderMark>
            <SliderMark value={4} {...labelStyles}>
              ~2000m
            </SliderMark>
            <SliderMark value={5} {...labelStyles}>
              ~3000m
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            ></SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Center>
        <Center>
          <Link
            href={{
              pathname: `/shops/1`,
              query: {
                lat: String(lat),
                lng: String(lng),
                range: sliderValue,
              },
            }}
          >
            <IconButton aria-label="Search shops" icon={<SearchIcon />} />
          </Link>
        </Center>
      </Flex>
    </Box>
  );
}
