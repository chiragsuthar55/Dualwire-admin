import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  // Checkbox,
  // Icon,
  // InputGroup,
  // InputRightElement,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
// import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "Schema/AuthSchema";
import { forgotPassword } from "Services/AuthServices";
import { MdChevronLeft } from "react-icons/md";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  // const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  // const googleText = useColorModeValue("navy.700", "white");
  // const googleHover = useColorModeValue(
  //   { bg: "gray.200" },
  //   { bg: "whiteAlpha.300" }
  // );
  // const googleActive = useColorModeValue(
  //   { bg: "secondaryGray.300" },
  //   { bg: "whiteAlpha.200" }
  // );

  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [email, setEmail] = useState("");
  const [data, setdata] = useState("");

  const { authLoading } = useSelector(({ auth }) => auth);

  const submitHandle = useCallback(
    async (values) => {
      const res = await dispatch(forgotPassword(values));
      if (res) {
        setEmail("");
      }
    },
    [dispatch]
  );

  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: { email },
      validationSchema: forgetPasswordSchema,
      onSubmit: submitHandle,
    });

  return (
    <DefaultAuth>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "16vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Forgot Password
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and we'll send you a otp to reset your password!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <Box mb="24px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                _focus={bgFocus}
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="mail@simmmple.com"
                fontWeight="500"
                size="lg"
                name="email"
                value={values?.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.email && errors?.email && (
                <Text className="form-error" display="flex" color={brandStars}>
                  {errors?.email}
                </Text>
              )}
            </Box>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="42"
              mb="24px"
              type="submit"
              disabled={authLoading}
              onClick={handleSubmit}
            >
              Send reset link {authLoading && <Spinner />}
            </Button>
            <Box
              marginRight={"20px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <NavLink to="/auth/sign-in">
                <Text
                  mb={"24px"}
                  color={textColorBrand}
                  fontSize="sm"
                  fontWeight="500"
                >
                  Remember your password? Login
                </Text>
              </NavLink>
              <NavLink to={-1}>
                <Flex>
                  <Icon
                    as={MdChevronLeft}
                    width="20px"
                    height="20px"
                    color={textColorBrand}
                  />
                  <Text
                    mb={"24px"}
                    color={textColorBrand}
                    fontSize="sm"
                    fontWeight="500"
                  >
                    Back
                  </Text>
                </Flex>
              </NavLink>
            </Box>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ForgotPassword;
