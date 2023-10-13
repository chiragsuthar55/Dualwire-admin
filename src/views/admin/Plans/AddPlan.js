import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { planSchema } from "Schema/PlanSchema";
import { createPlan, updatePlan, getPlans } from "Services/PlanService";
import { updateStatusOfPlan } from "Services/PlanService";
import { setSinglePlan } from "Store/Reducers/PlanSlice";
import Card from "components/card/Card";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AddPlan = () => {
  let { plan_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const { planLoading, singlePlan } = useSelector(({ plan }) => plan);

  const loadData = useCallback(async () => {
    if (plan_id) await dispatch(getPlans(plan_id)); // need to change this
  }, [dispatch, plan_id]);

  useEffect(() => {
    loadData();
    return () => dispatch(setSinglePlan({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandle = useCallback(
    async (values) => {
      const payload = {
        name: values?.name,
        description: values?.description,
        prices: [
          {
            price: Number(values?.monthly),
            duration: "month",
          },
          {
            price: Number(values?.yearly),
            duration: "year",
          },
        ],
        metadata: values?.metadata,
      };
      let res;
      if (values?.id) {
        payload.plan_id = values?.id;
        await dispatch(updatePlan(payload));
      } else res = await dispatch(createPlan(payload)); // or create new plan with same api
    },
    [dispatch]
  );

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: singlePlan,
    validationSchema: planSchema,
    onSubmit: submitHandle,
  });

  const onChangeStatusOfPlan = useCallback(
    async (val) => {
      const res = await dispatch(updateStatusOfPlan(values?.id, val));
      if (!res) {
        setFieldValue("status", values?.status === 1 ? 0 : 1);
      }
    },
    [dispatch, setFieldValue, values?.id, values?.status]
  );

  console.log("values", values);
  console.log("errors", errors);
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
              {plan_id ? "Edit" : "Add New"} Plan
            </Text>
            <Switch
              isChecked={values?.status === 1 || false}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              name="status"
              onChange={(e) => {
                setFieldValue("status", e.target.checked ? 1 : 0);
                onChangeStatusOfPlan(e.target.checked ? 1 : 0);
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
                  Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Plan name"
                  fontWeight="500"
                  size="lg"
                  name="name"
                  value={values?.name || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.name && errors?.name && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.name}
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
                  Description<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Up to 5000 comments"
                  fontWeight="500"
                  size="lg"
                  name="description"
                  value={values?.description || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched?.description && errors?.description && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.description}
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
                  Monthly Price<Text color={brandStars}>*</Text> &nbsp;
                  &nbsp;(Price in USD)
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="number"
                  placeholder="19"
                  fontWeight="500"
                  size="lg"
                  name="monthly"
                  value={values?.monthly}
                  onChange={(e) => {
                    setFieldValue("monthly", e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled={!!values?.id}
                />
                {touched?.monthly && errors?.monthly && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.monthly}
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
                  Yearly Price<Text color={brandStars}>*</Text> &nbsp;
                  &nbsp;(Price in USD)
                </FormLabel>
                <Input
                  _focus={bgFocus}
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="number"
                  placeholder="99"
                  fontWeight="500"
                  size="lg"
                  name="yearly"
                  value={values?.yearly}
                  onChange={(e) => {
                    setFieldValue("yearly", e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled={!!values?.id}
                />
                {touched?.yearly && errors?.yearly && (
                  <Text
                    className="form-error"
                    display="flex"
                    color={brandStars}
                  >
                    {errors?.yearly}
                  </Text>
                )}
              </Box>
            </FormControl>
          </Card>
          <Card>
            <Flex justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="20px"
                fontWeight="700"
                lineHeight="100%"
              >
                Social Media
              </Text>
            </Flex>
            <Grid
              mb="20px"
              gridTemplateColumns={{
                xl: "repeat(2, 1fr)",
                "2xl": "1fr 0.46fr",
              }}
              gap={{ base: "20px", xl: "30px" }}
              display={{ base: "block", xl: "grid" }}
            >
              <Box px="11px">
                <Flex mb="10px">
                  <Checkbox
                    me="16px"
                    colorScheme="brandScheme"
                    name="metadata.Instagram Giveaways"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Instagram Giveaways": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={
                      values?.metadata?.["Instagram Giveaways"] || false
                    }
                  />
                  <Text
                    color={textColor}
                    fontSize="sm"
                    fontWeight="500"
                    textAlign="start"
                  >
                    Instagram Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    me="16px"
                    colorScheme="brandScheme"
                    name="metadata.Facebook Giveaways"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Facebook Giveaways": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={
                      values?.metadata?.["Facebook Giveaways"] || false
                    }
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    Facebook Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    me="16px"
                    colorScheme="brandScheme"
                    name="metadata.Twitter Giveaways"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Twitter Giveaways": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={values?.metadata?.["Twitter Giveaways"] || false}
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    Twitter Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    me="16px"
                    colorScheme="brandScheme"
                    name="metadata.List Giveaway"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "List Giveaway": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={values?.metadata?.["List Giveaway"] || false}
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    List Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    name="metadata.Youtube Giveaways"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Youtube Giveaways": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={values?.metadata?.["Youtube Giveaways"] || false}
                    me="16px"
                    colorScheme="brandScheme"
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    Youtube Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    name="metadata.Tiktok Giveaways"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Tiktok Giveaways": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={values?.metadata?.["Tiktok Giveaways"] || false}
                    me="16px"
                    colorScheme="brandScheme"
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    Tiktok Giveaway
                  </Text>
                </Flex>
                <Flex mb="10px">
                  <Checkbox
                    name="metadata.Multi-Network Giveaway"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          "Multi-Network Giveaway": e.target.checked,
                        },
                      }))
                    }
                    onBlur={handleBlur}
                    isChecked={
                      values?.metadata?.["Multi-Network Giveaway"] || false
                    }
                    me="16px"
                    colorScheme="brandScheme"
                  />
                  <Text
                    fontWeight="500"
                    color={textColor}
                    fontSize="sm"
                    textAlign="start"
                  >
                    Multi-Network Giveaways
                  </Text>
                </Flex>
              </Box>
            </Grid>
          </Card>
          <Card>
            <Grid
              mb="20px"
              gridTemplateColumns={{
                xl: "repeat(2, 1fr)",
                "2xl": "1fr 0.46fr",
              }}
              gap={{ base: "20px", xl: "30px" }}
              display={{ base: "block", xl: "grid" }}
            >
              <Box>
                <FormLabel
                  ms="4px"
                  fontSize="20px"
                  fontWeight="700"
                  color={textColor}
                  display="flex"
                >
                  SelectPRO features
                </FormLabel>
                <Box px="11px">
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          metadata: {
                            ...prev.metadata,
                            "Bonus entries": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.metadata?.["Bonus entries"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Bonus entries
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          metadata: {
                            ...prev.metadata,
                            "Block accounts": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.metadata?.["Block accounts"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Block accounts
                    </Text>
                  </Flex>
                </Box>
              </Box>
              <Box>
                <FormLabel
                  ms="4px"
                  fontSize="20px"
                  fontWeight="700"
                  color={textColor}
                  display="flex"
                >
                  LiveStreaming Package
                </FormLabel>
                <Box px="11px">
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          metadata: {
                            ...prev.metadata,
                            Branding: e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.metadata?.["Branding"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Branding
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      _focus={bgFocus}
                      me="16px"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          metadata: {
                            ...prev.metadata,
                            "Countdown Clock": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.metadata?.["Countdown Clock"] || false}
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Countdown Clock
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Grid>
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
                disabled={planLoading}
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
                disabled={planLoading}
                onClick={handleSubmit}
              >
                {plan_id ? "Update" : "Create"} {planLoading && <Spinner />}
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default AddPlan;
