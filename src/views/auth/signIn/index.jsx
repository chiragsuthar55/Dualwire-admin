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
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
// import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
// import illustration from "assets/img/auth/auth.png";
// import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "Schema/AuthSchema";
import { login } from "Services/AuthServices";
import { setLoginValues } from "Store/Reducers/AuthSlice";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
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
  const [show, setShow] = useState(false);

  const { authLoading, loginValues } = useSelector(({ auth }) => auth);

  const loadData = useCallback(() => {
    const user = Cookies.get("user");
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user, "UserSecrets");
      const decryptedData = JSON.parse(bytes?.toString(CryptoJS.enc.Utf8));
      if (decryptedData) {
        const loginData = {
          email: decryptedData?.email,
          password: decryptedData?.password,
          remember: decryptedData?.remember,
        };
        dispatch(setLoginValues(loginData));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandle = useCallback(
    async (values) => {
      console.log("values", values);
      const res = await dispatch(login(values));
      if (res) {
        navigate("/");
      }
    },
    [dispatch, navigate]
  );

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: loginValues,
    validationSchema: loginSchema,
    onSubmit: submitHandle,
  });

  console.log("values", values);

  const handleClick = () => setShow(!show);

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
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
          {/* <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex> */}
          <FormControl>
            <Box mb={"24px"}>
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
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.email && errors?.email && (
                <Text className="form-error" color={brandStars}>
                  {errors?.email}
                </Text>
              )}
            </Box>
            <Box mb={"24px"}>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  name="password"
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>{" "}
              {touched?.password && errors?.password && (
                <Text className="form-error" color={brandStars}>
                  {errors?.password}
                </Text>
              )}
            </Box>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember"
                  colorScheme="brandScheme"
                  me="10px"
                  name="remember"
                  value={values?.remember || false}
                  isChecked={values?.remember}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormLabel
                  htmlFor="remember"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="42"
              mb="24px"
              type="submit"
              onClick={handleSubmit}
              disabled={authLoading}
            >
              {authLoading ? <Spinner /> : "Sign In"}
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
