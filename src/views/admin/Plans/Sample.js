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
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { planSchema } from "Schema/PlanSchema";
import { createPlan } from "Services/PlanService";
import { updateStatusOfPlan } from "Services/PlanService";
import { updatePlan } from "Services/PlanService";
import { getPlans } from "Services/PlanService";
import { setSinglePlan } from "Store/Reducers/PlanSlice";
import Card from "components/card/Card";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
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
        prices: values?.id
          ? values?.prices?.map((x) => ({ ...x, price_id: x?.id }))
          : values?.prices,
        metadata: values?.metadata,
      };
      let res;
      console.log("payload", payload);
      // if (values?.id) {
      //   payload.plan_id = values?.id;
      //   await dispatch(updatePlan(payload));
      // } else res = await dispatch(createPlan(payload)); // or create new plan with same api
      // console.log("res", res);
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
              isChecked={values?.status === 1}
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
                    const val = Number(e.target.value) || "";
                    setFieldValue("monthly", val);
                  }}
                  onBlur={handleBlur}
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
                  &nbsp;(Price in {singlePlan?.currency})
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
                  // value={
                  //   values?.prices?.find((x) => x.duration === "year")?.price ||
                  //   0
                  // }
                  // onChange={(e) => {
                  //   const i = values?.prices?.findIndex(
                  //     (x) => x?.duration === "year"
                  //   );
                  //   let list = [
                  //     ...JSON.parse(JSON.stringify(values?.prices || {})),
                  //   ];
                  //   if (i >= 0) {
                  //     const val = Number(e.target.value) || 0;
                  //     list[i].price = val;
                  //     setValues((prev) => ({
                  //       ...prev,
                  //       prices: list,
                  //     }));
                  //     setFieldValue("yearly", val);
                  //   }
                  // }}
                  value={values?.yearly}
                  onChange={(e) => {
                    const val = Number(e.target.value) || "";
                    setFieldValue("yearly", val);
                  }}
                  onBlur={handleBlur}
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
                  Limits<Text color={brandStars}>*</Text>
                </FormLabel>
                <Box px="11px">
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          limits: {
                            ...prev.limits,
                            "Landing Page Design": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.limits?.["Landing Page Design"] || false
                      }
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Landing Page Design
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          limits: {
                            ...prev.limits,
                            "Dashboard Builder": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.limits?.["Dashboard Builder"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Dashboard Builder
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          limits: {
                            ...prev.limits,
                            "Mobile App Design": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.limits?.["Mobile App Design"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Mobile App Design
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          limits: {
                            ...prev.limits,
                            Illustrations: e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.limits?.["Illustrations"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Illustrations
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          limits: {
                            ...prev.limits,
                            "Promotional LP": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.limits?.["Promotional LP"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Promotional LP
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
                  Filters & Functions<Text color={brandStars}>*</Text>
                </FormLabel>
                <Box px="11px">
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Video Animation": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.filter?.["Video Animation"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Video Animation
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      _focus={bgFocus}
                      me="16px"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Block List": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.filter?.["Block List"] || false}
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Block List
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Custom Countdown": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.filter?.["Custom Countdown"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Custom Countdown
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Bonus & Chances Extra": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.filter?.["Bonus & Chances Extra"] || false
                      }
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Bonus & Chances Extra
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Min. of Mentions": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.filter?.["Min. of Mentions"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Min. of Mentions
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            "Upload from File": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.filter?.["Upload from File"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Upload from File
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Grid>
            {/* <Flex justify="space-between" mb="20px" align="center">
                <Text
                  color={textColor}
                  fontSize="20px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  Spin the Wheel (Campaings & Promotions)
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
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Capture Leads": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.spinWheel?.["Capture Leads"] || false}
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Capture Leads
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Advanced Customization": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.spinWheel?.["Advanced Customization"] || false
                      }
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Advanced Customization
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Remove Ads": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.spinWheel?.["Remove Ads"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Remove Ads
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      colorScheme="brandScheme"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Form Custom Fields": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.spinWheel?.["Form Custom Fields"] || false
                      }
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Form Custom Fields
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Prizes Quantities & Probabilities": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.spinWheel?.[
                          "Prizes Quantities & Probabilities"
                        ] || false
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
                      Prizes Quantities & Probabilities
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            Analitycs: e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.spinWheel?.["Analitycs"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Analitycs
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Fraud Detection (IP / Browsers)": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.spinWheel?.["Fraud Detection (IP / Browsers)"] ||
                        false
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
                      Fraud Detection (IP / Browsers)
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Winning Emails": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={values?.spinWheel?.["Winning Emails"] || false}
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="500"
                      color={textColor}
                      fontSize="sm"
                      textAlign="start"
                    >
                      Winning Emails
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          spinWheel: {
                            ...prev.spinWheel,
                            "Remove AppSorteos Watermark": e.target.checked,
                          },
                        }))
                      }
                      onBlur={handleBlur}
                      isChecked={
                        values?.spinWheel?.["Remove AppSorteos Watermark"] ||
                        false
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
                      Remove AppSorteos Watermark
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                  >
                    Active Campaings<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="number"
                    placeholder="10"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                    name="activeCampaings"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        activeCampaings: e.target.checked,
                      }))
                    }
                    onBlur={handleBlur}
                    value={values?.activeCampaings || ""}
                  />
                  <FormLabel
                    display="flex"
                    justifyContent={"space-between"}
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                  >
                    <Box display={"flex"}>
                      Montly Pageviews<Text color={brandStars}>*</Text>
                    </Box>
                    <Box>
                      <Tooltip
                        label={
                          "Montly Pageviews per each campaing. Pageviews (or impressions) are counted every time the promotion is displayed in a user's browser."
                        }
                        placement="bottom"
                      >
                        <span>
                          <Icon
                            ms="auto"
                            as={MdInfoOutline}
                            color="secondaryGray.600"
                            w="24px"
                            h="24px"
                          />
                        </span>
                      </Tooltip>
                    </Box>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="number"
                    placeholder="10"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                    name="monthlyPageViews"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        monthlyPageViews: e.target.checked,
                      }))
                    }
                    onBlur={handleBlur}
                    value={values?.monthlyPageViews || ""}
                  />
                </Box>
              </Grid> */}
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

// planslice
// -------------------------------
// limits: {
//   "Landing Page Design": false,
//   "Dashboard Builder": false,
//   "Mobile App Design": false,
//   Illustrations: false,
//   "Promotional LP": false,
// },
// filter: {
//   "Video Animation": false,
//   "Block List": false,
//   "Custom Countdown": false,
//   "Min. of Mentions": false,
//   "Upload from File": false,
// },
// spinWheel: {
//   "Capture Leads": false,
//   "Advanced Customization": false,
//   "Remove Ads": false,
//   "Form Custom Fields": false,
//   "Prizes Quantities & Probabilities": false,
//   Analitycs: false,
//   "Fraud Detection (IP / Browsers)": false,
//   "Winning Emails": false,
//   "Remove AppSorteos Watermark": false,
// },
// activeCampaings: 0,
// monthlyPageViews: 0,
