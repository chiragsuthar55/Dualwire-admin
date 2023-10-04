import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
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
import DefaultAuth from "layouts/auth/Default";
// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { setResetPasswordValues } from "Store/Reducers/AuthSlice";
import { resetPasswordSchema } from "Schema/AuthSchema";
import { resetPassword } from "Services/AuthServices";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = useState(false);

  const { authLoading, resetPasswordValues } = useSelector(({ auth }) => auth);

  const submitHandle = useCallback(
    async (values) => {
      const res = await dispatch(resetPassword(values));
      if (res) {
        dispatch(
          setResetPasswordValues({ confirmPassword: "", newPassword: "" })
        );
      }
    },
    [dispatch]
  );

  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: resetPasswordValues,
      validationSchema: resetPasswordSchema,
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
            Reset Password
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            This password should be different from the previous password.
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
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                New Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  name="newPassword"
                  value={values?.newPassword || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
              {touched?.newPassword && errors?.newPassword && (
                <Text className="form-error" display="flex" color={brandStars}>
                  {errors?.newPassword}
                </Text>
              )}
            </Box>
            <Box mb="24px">
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirm Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  name="confirmPassword"
                  value={values?.confirmPassword || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
              {touched?.confirmPassword && errors?.confirmPassword && (
                <Text className="form-error" display="flex" color={brandStars}>
                  {errors?.confirmPassword}
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
              Reset Password
            </Button>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="42"
              mb="24px"
              disabled={authLoading}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ResetPassword;
