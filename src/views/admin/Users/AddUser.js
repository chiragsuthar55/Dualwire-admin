import { userSchema } from "Schema/UserSchema";
import { getSingleUser } from "Services/UsersServices";
import { setSingleUser } from "Store/Reducers/UsersSlice";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { updateUser } from "Services/UsersServices";
import { createUser } from "Services/UsersServices";

const AddUser = () => {
  let { u_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const textColorSecondary = "gray.400";

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const { usersLoading, singleUser } = useSelector(({ users }) => users);

  const loadData = useCallback(async () => {
    if (u_id) await dispatch(getSingleUser(u_id)); // need to change this
  }, [dispatch, u_id]);

  useEffect(() => {
    loadData();
    return () =>
      dispatch(
        setSingleUser({
          first_name: "",
          last_name: "",
          language: "en",
          email: "",
          password: "",
          status: 0,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandle = useCallback(
    async (values) => {
      let res;
      if (values?.id) {
        res = await dispatch(updateUser(values, u_id));
      } else res = await dispatch(createUser(values)); // or create new plan with same api
      if (res) {
        navigate("/users");
        dispatch(
          setSingleUser({
            first_name: "",
            last_name: "",
            language: "en",
            email: "",
            password: "",
            status: 0,
          })
        );
      }
    },
    [dispatch, navigate, u_id]
  );

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: singleUser,
    validationSchema: userSchema,
    onSubmit: submitHandle,
  });

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          direction="column"
          w="100%"
          px="0px"
          overflowX={{ sm: "hidden", lg: "hidden" }}
        >
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              {u_id ? "Edit" : "Add New"} User
            </Text>
            <Switch
              isChecked={values?.status === 1}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              name="status"
              onChange={(e) => {
                setFieldValue("status", e.target.checked ? 1 : 0);
              }}
            />
          </Flex>
          <Card
            direction="column"
            w="100%"
            px="20px"
            overflowX={{ sm: "hidden", lg: "hidden" }}
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
                  First Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="First Name"
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
              <Box mb="24px">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
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
                  placeholder="Last Name"
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
                  placeholder="admin@gmail.com"
                  fontWeight="500"
                  size="lg"
                  name="email"
                  value={values?.email || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
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
              <Box mb="24px">
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Language<Text color={brandStars}>*</Text>
                </FormLabel>
                <FormControl color={iconColor}>
                  <Select
                    color={iconColor}
                    id="user_type"
                    w="unset"
                    display="flex"
                    alignItems="center"
                    name="language"
                    value={values?.language || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"en"}>English</option>
                    <option value={"es"}>Spanish</option>
                    <option value={"fr"}>French</option>
                    <option value={"pt"}>Portuguese</option>
                  </Select>
                </FormControl>
                {touched?.language && errors?.language && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.language}
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
                    value={values?.password || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

                {touched?.password && errors?.password && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.password}
                  </Text>
                )}
              </Box>
            </FormControl>
          </Card>

          <Box display={"flex"} justifyContent={"end"} p={"20px"}>
            <Box w={"100px"} marginRight={"20px"}>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="42"
                mb="24px"
                disabled={usersLoading}
                onClick={() => navigate(-1)}
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
                disabled={usersLoading}
                onClick={handleSubmit}
              >
                {u_id ? "Update" : "Create"} {usersLoading && <Spinner />}
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default AddUser;
