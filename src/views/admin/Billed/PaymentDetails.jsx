import {
  Box,
  Flex,
  FormControl,
  Grid,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import { ClockIcon } from "components/icons/Icons";
import {
  MdCancel,
  MdCheckCircle,
  MdMonetizationOn,
  MdMoney,
  MdOutlineError,
  MdOutlinePayments,
  MdSubscriptions,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const { authLoading, currentUser, passwordValues } = useSelector(
    ({ auth }) => auth
  );

  const value = "Approved";
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card mb={{ base: "0px", lg: "20px" }} align="center">
          <Flex justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Transaction details
            </Text>
          </Flex>

          <FormControl>
            <Grid
              mb="20px"
              templateColumns={{
                base: "1fr",
                lg: "repeat(2, 1fr)",
                "2xl": "1fr 1fr 1fr",
              }}
              templateRows={{
                base: "1fr",
                lg: "repeat(2, 1fr)",
                "2xl": "1fr",
              }}
              gap={{ base: "20px", xl: "20px" }}
            >
              <Box>
                <Flex>
                  <Icon
                    as={MdMoney}
                    color={brandStars}
                    w={6}
                    h={8}
                    marginRight={"5px"}
                  />
                  <Text
                    color={textColor}
                    textAlign={"start"}
                    fontWeight="700"
                    paddingTop={"5px"}
                  >
                    Transaction ID
                  </Text>
                </Flex>
                <Text color={textColor} textAlign={"start"} lineHeight="100%">
                  Ahisudhfs4546
                </Text>
              </Box>
              <Box>
                <Flex>
                  <Icon
                    as={ClockIcon}
                    color={brandStars}
                    w={6}
                    h={10}
                    marginRight={"5px"}
                  />{" "}
                  <Text
                    color={textColor}
                    textAlign={"start"}
                    mb={"5px"}
                    fontWeight="700"
                    paddingTop={"10px"}
                  >
                    Date & Time
                  </Text>
                </Flex>
                <Text color={textColor} textAlign={"start"} lineHeight="100%">
                  27/9/23 08:23 AM
                </Text>
              </Box>
              <Box>
                <Flex>
                  <Icon
                    as={MdMonetizationOn}
                    color={brandStars}
                    w={6}
                    h={10}
                    marginRight={"5px"}
                  />
                  <Text
                    color={textColor}
                    textAlign={"start"}
                    mb={"5px"}
                    fontWeight="700"
                    paddingTop={"10px"}
                  >
                    Payment Method
                  </Text>
                </Flex>
                <Text color={textColor} textAlign={"start"} lineHeight="100%">
                  Cash
                </Text>
              </Box>
              <Box>
                <Flex>
                  <Icon
                    as={MdSubscriptions}
                    color={brandStars}
                    w={6}
                    h={10}
                    marginRight={"5px"}
                  />
                  <Text
                    color={textColor}
                    textAlign={"start"}
                    fontWeight="700"
                    paddingTop={"10px"}
                  >
                    Plan
                  </Text>
                </Flex>
                <Text color={textColor} textAlign={"start"} lineHeight="100%">
                  Creator
                </Text>
              </Box>
              <Box>
                <Flex>
                  <Icon
                    as={MdOutlinePayments}
                    color={brandStars}
                    w={6}
                    h={10}
                    marginRight={"5px"}
                  />
                  <Text
                    color={textColor}
                    textAlign={"start"}
                    fontWeight="700"
                    paddingTop={"10px"}
                  >
                    Status
                  </Text>
                </Flex>
                <Text
                  color={textColor}
                  textAlign={"start"}
                  lineHeight="100%"
                  display={"flex"}
                  alignItems={"center"}
                >
                  Approved{" "}
                  <Icon
                    lineHeight={"100%"}
                    w="24px"
                    h="24px"
                    me="5px"
                    color={
                      value === "Approved"
                        ? "green.500"
                        : value === "Disable"
                        ? "red.500"
                        : value === "Error"
                        ? "orange.500"
                        : null
                    }
                    as={
                      value === "Approved"
                        ? MdCheckCircle
                        : value === "Disable"
                        ? MdCancel
                        : value === "Error"
                        ? MdOutlineError
                        : null
                    }
                  />{" "}
                </Text>
              </Box>
            </Grid>
          </FormControl>
        </Card>
      </Box>
    </>
  );
};

export default PaymentDetails;
