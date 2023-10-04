import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "Services/AuthServices";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "Schema/AuthSchema";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const [email, setEmail] = useState("");

  const { authLoading } = useSelector(({ auth }) => auth);

  const submitHandle = useCallback(
    async (values) => {
      const res = await dispatch(forgetPassword(values));
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
            {/* <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel> */}
            {/* <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup> */}

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
              Send reset link
            </Button>
            <Box
              marginRight={"20px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
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
            </Box>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ForgotPassword;
