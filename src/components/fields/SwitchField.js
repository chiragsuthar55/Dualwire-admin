// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useCallback } from "react";

export default function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    reversed,
    fontSize,
    ...rest
  } = props;
  let [checked, setChecked] = React.useState(isChecked);

  console.log("checked", checked);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  console.log("onChange", onChange);

  const onChangeStatusOfPlan = useCallback((i) => {
    console.log("i", i);
  }, []);

  return (
    <Box w="100%" fontWeight="500" {...rest}>
      {reversed ? (
        <Flex align="center" borderRadius="16px">
          {isChecked ? (
            <Switch
              isChecked={checked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={() => setChecked(checked === 0 ? 1 : 0)}
            />
          ) : (
            <Switch
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
            />
          )}
          <FormLabel
            ms="15px"
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction="column"
            mb="0px"
            maxW={textWidth ? textWidth : "75%"}
          >
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={fontSize ? fontSize : "md"}
            >
              {desc}
            </Text>
          </FormLabel>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" borderRadius="16px">
          <FormLabel
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction="column"
            maxW={textWidth ? textWidth : "75%"}
          >
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={fontSize ? fontSize : "md"}
            >
              {desc}
            </Text>
          </FormLabel>
          <Switch
            isChecked={isChecked}
            id={id}
            variant="main"
            colorScheme="brandScheme"
            size="md"
            onChange={onChange}
          />

          {/* {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
            />
          )} */}
        </Flex>
      )}
    </Box>
  );
}
