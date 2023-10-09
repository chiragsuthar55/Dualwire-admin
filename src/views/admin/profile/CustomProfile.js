import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { changePasswordSchema } from "Schema/AuthSchema";
import { currentUserSchema } from "Schema/AuthSchema";
import { changePassword } from "Services/AuthServices";
import { updateProfile } from "Services/AuthServices";
import { uploadFile } from "Services/CommonServices";
import { setCurrentUser } from "Store/Reducers/AuthSlice";
import avatar from "assets/img/avatars/avatar4.png";
import Card from "components/card/Card";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CustomProfile = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const textColorSecondary = "gray.400";

  const textColorBrand = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  // const textHover = useColorModeValue(
  //   { color: "secondaryGray.900", bg: "unset" },
  //   { color: "secondaryGray.500", bg: "unset" }
  // );
  // const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  // const iconColor = useColorModeValue("brand.500", "white");
  // const bgList = useColorModeValue("white", "whiteAlpha.100");
  // const bgShadow = useColorModeValue(
  //   "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
  //   "unset"
  // );
  // const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // const bgHover = useColorModeValue(
  //   { bg: "secondaryGray.400" },
  //   { bg: "whiteAlpha.50" }
  // );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const { authLoading, currentUser, passwordValues } = useSelector(
    ({ auth }) => auth
  );

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (file) {
        const res = await dispatch(uploadFile(file));
        if (res) {
          let user = { ...currentUser };
          user.profile_image = res;
          dispatch(setCurrentUser(user));
        }
      }
    },
    [currentUser, dispatch]
  );

  const handleButtonClick = useCallback(() => {
    document.getElementById("upload-img").click();
  }, []);

  const submitHandle = useCallback(
    async (values) => {
      const res = await dispatch(updateProfile(values));
      if (res) {
      }
    },
    [dispatch]
  );

  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: currentUser,
      validationSchema: currentUserSchema,
      onSubmit: submitHandle,
    });

  const changePasswordSubmit = useCallback(
    async (values) => {
      const payload = {
        current_password: values?.currentPassword,
        new_password: values?.newPassword,
      };
      const res = await dispatch(changePassword(payload));
      if (res) {
      }
    },
    [dispatch]
  );

  const passwordFormik = useFormik({
    enableReinitialize: true,
    initialValues: passwordValues,
    validationSchema: changePasswordSchema,
    onSubmit: changePasswordSubmit,
  });

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
              Profile
            </Text>
          </Flex>
          <Box
            mb={{ base: "20px", "2xl": "20px" }}
            position="relative"
            width={"150px"}
            height={"150px"}
          >
            <Image
              src={values?.profile_image || avatar}
              w={{ base: "100%", "3xl": "100%" }}
              h={{ base: "100%", "3xl": "100%" }}
              borderRadius="20px"
            />
            <Button
              position="absolute"
              bg="white"
              _hover={{ bg: "whiteAlpha.900" }}
              _active={{ bg: "white" }}
              _focus={{ bg: "white" }}
              p="0px !important"
              top="14px"
              right="14px"
              borderRadius="50%"
              minW="30px"
              h="30px"
              onClick={handleButtonClick}
            >
              <Icon
                transition="0.2s linear"
                w="18px"
                h="18px"
                as={MdEdit}
                color="brand.500"
              />
            </Button>
            <input
              type="file"
              id="upload-img"
              style={{ visibility: "hidden", width: "0px" }}
              onChange={handleFileChange}
            />
          </Box>

          <FormControl>
            <Grid
              mb="20px"
              templateColumns={{
                base: "1fr",
                lg: "repeat(2, 1fr)",
                "2xl": "1.34fr 1.62fr 1fr",
              }}
              templateRows={{
                base: "1fr",
                lg: "repeat(2, 1fr)",
                "2xl": "1fr",
              }}
              gap={{ base: "20px", xl: "20px" }}
            >
              <Box mb={"24px"}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  First Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Admin"
                  fontWeight="500"
                  size="lg"
                  name="first_name"
                  value={values?.first_name || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.first_name && errors?.first_name && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.first_name}
                  </Text>
                )}
              </Box>
              <Box mb={"24px"}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Last Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Admin"
                  fontWeight="500"
                  size="lg"
                  name="last_name"
                  value={values?.last_name || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.last_name && errors?.last_name && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.last_name}
                  </Text>
                )}
              </Box>
              {/* <Box>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Birthday<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="date"
                  placeholder="25/2/23"
                  fontWeight="500"
                  size="lg"
                  name="first_name"
                  value={values?.first_name || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.last_name && errors?.last_name && (
                  <Text className="form-error" color={brandStars}>
                    {errors?.last_name}
                  </Text>
                )}
              </Box> */}
              <Box>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>{" "}
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
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.email}
                  </Text>
                )}
              </Box>
              {/* <Box>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Phone Number<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="number"
                  placeholder="6546465464"
                  fontWeight="500"
                  size="lg"
                />
              </Box>
              <Box>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Address<Text color={brandStars}>*</Text>
                </FormLabel>
                <Textarea
                  _focus={bgFocus}
                  borderRadius={"16px"}
                  border={"1px solid #E0E5F2"}
                  isRequired={true}
                  variant="auth"
                  background={"transparent"}
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="number"
                  placeholder="23 Arthur Street, Wyanga, New South Wales, Australia"
                  fontWeight="500"
                  size="lg"
                />
              </Box> */}
            </Grid>
            <Box display={"flex"} justifyContent={"end"} p={"20px"}>
              <Box w={"100px"} marginRight={"20px"}>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="42"
                  mb="24px"
                  disabled={authLoading}
                >
                  Cancel
                </Button>
              </Box>
              <Box w={"100px"}>
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
                  {authLoading ? <Spinner /> : "Update"}
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Card>
        <Card mb={{ base: "0px", lg: "20px" }} align="center">
          <Flex justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Change Password
            </Text>
          </Flex>

          <FormControl>
            <Grid
              mb="20px"
              templateColumns={{
                base: "1fr",
                lg: "repeat(2, 1fr)",
                "2xl": "1.34fr 1.62fr 1fr",
              }}
              gap={{ base: "20px", xl: "20px" }}
            >
              <Box mb={"24px"}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Current Password<Text color={brandStars}>*</Text>
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
                    name="currentPassword"
                    value={passwordFormik?.values?.currentPassword || ""}
                    onChange={passwordFormik?.handleChange}
                    onBlur={passwordFormik?.handleBlur}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={() => setShow(!show)}
                    />
                  </InputRightElement>
                </InputGroup>
                {passwordFormik?.touched?.currentPassword &&
                  passwordFormik?.errors?.currentPassword && (
                    <Text
                      className="form-error"
                      display="flex"
                      color={brandStars}
                    >
                      {passwordFormik?.errors?.currentPassword}
                    </Text>
                  )}
              </Box>
              <Box mb={"24px"}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  New Password<Text color={brandStars}>*</Text>
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
                    name="newPassword"
                    value={passwordFormik?.values?.newPassword || ""}
                    onChange={passwordFormik?.handleChange}
                    onBlur={passwordFormik?.handleBlur}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={() => setShow(!show)}
                    />
                  </InputRightElement>
                </InputGroup>

                {passwordFormik?.touched?.newPassword &&
                  passwordFormik?.errors?.newPassword && (
                    <Text
                      className="form-error"
                      display="flex"
                      color={brandStars}
                    >
                      {passwordFormik?.errors?.newPassword}
                    </Text>
                  )}
              </Box>
            </Grid>

            <Box display={"flex"} justifyContent={"end"} p={"20px"}>
              <Box marginRight={"20px"} display={"flex"} alignItems={"center"}>
                <NavLink to="/auth/forgot-password">
                  <Text
                    mb={"24px"}
                    color={textColorBrand}
                    fontSize="sm"
                    w="124px"
                    fontWeight="500"
                  >
                    Forgot password?
                  </Text>
                </NavLink>
              </Box>
              <Box w={"100px"} marginRight={"20px"}>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="42"
                  mb="24px"
                  disabled={authLoading}
                >
                  Cancel
                </Button>
              </Box>
              <Box w={"150px"}>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="42"
                  mb="24px"
                  type="submit"
                  onClick={passwordFormik?.handleSubmit}
                  disabled={authLoading}
                >
                  {authLoading ? <Spinner /> : "Change Password"}
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </>
  );
};

export default CustomProfile;
