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
import { createPlan } from "Services/PlanService";
import { updateStatusOfPlan } from "Services/PlanService";
import { updatePlan } from "Services/PlanService";
import { getPlans } from "Services/PlanService";
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
        prices: values?.id
          ? values?.prices?.map((x) => ({ ...x, price_id: x?.id }))
          : values?.prices,
        metadata: values?.metadata,
      };
      let res;
      console.log("payload", payload);
      if (values?.id) {
        payload.plan_id = values?.id;
        await dispatch(updatePlan(payload));
      } else res = await dispatch(createPlan(payload)); // or create new plan with same api
      console.log("res", res);
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
                  value={
                    values?.prices?.find((x) => x.duration === "month")
                      ?.price || 0
                  }
                  onChange={(e) => {
                    const i = values?.prices?.findIndex(
                      (x) => x?.duration === "month"
                    );
                    let list = [
                      ...JSON.parse(JSON.stringify(values?.prices || {})),
                    ];
                    if (i >= 0) {
                      const val = Number(e.target.value) || 0;
                      list[i].price = val;
                      setValues((prev) => ({
                        ...prev,
                        prices: list,
                      }));
                      setFieldValue("monthly", val);
                    }
                  }}
                  onBlur={handleBlur}
                />{" "}
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
                  value={
                    values?.prices?.find((x) => x.duration === "year")?.price ||
                    0
                  }
                  onChange={(e) => {
                    const i = values?.prices?.findIndex(
                      (x) => x?.duration === "year"
                    );
                    let list = [
                      ...JSON.parse(JSON.stringify(values?.prices || {})),
                    ];
                    if (i >= 0) {
                      const val = Number(e.target.value) || 0;
                      list[i].price = val;
                      setValues((prev) => ({
                        ...prev,
                        prices: list,
                      }));
                      setFieldValue("yearly", val);
                    }
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
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
                    fontWeight="bold"
                    color={textColor}
                    fontSize="md"
                    textAlign="start"
                  >
                    Multi-Network Giveaways
                  </Text>
                </Flex>
              </Box>
            </Grid>
          </Card>
          {/* <Card>
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
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    Limits<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Box px="11px">
                    <Flex mb="10px">
                      <Checkbox me="16px" colorScheme="brandScheme" />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Landing Page Design
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        me="16px"
                        defaultChecked
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Dashboard Builder
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        defaultChecked
                        me="16px"
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Mobile App Design
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox me="16px" colorScheme="brandScheme" />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Illustrations
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        defaultChecked
                        me="16px"
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
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
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    Filters & Functions<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Box px="11px">
                    <Flex mb="10px">
                      <Checkbox me="16px" colorScheme="brandScheme" />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Video Animation
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        _focus={bgFocus}
                        me="16px"
                        defaultChecked
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Block List
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        defaultChecked
                        me="16px"
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Custom Countdown
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox me="16px" colorScheme="brandScheme" />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Bonus & Chances Extra
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        defaultChecked
                        me="16px"
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Min. of Mentions
                      </Text>
                    </Flex>
                    <Flex mb="10px">
                      <Checkbox
                        defaultChecked
                        me="16px"
                        colorScheme="brandScheme"
                      />
                      <Text
                        fontWeight="bold"
                        color={textColor}
                        fontSize="md"
                        textAlign="start"
                      >
                        Upload from File
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Grid>
              <Flex justify="space-between" mb="20px" align="center">
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
                    <Checkbox me="16px" colorScheme="brandScheme" />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Capture Leads
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      me="16px"
                      defaultChecked
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Advanced Customization
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Remove Ads
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox me="16px" colorScheme="brandScheme" />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Form Custom Fields
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Prizes Quantities & Probabilities
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Analitycs
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Fraud Detection (IP / Browsers)
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
                      textAlign="start"
                    >
                      Winning Emails
                    </Text>
                  </Flex>
                  <Flex mb="10px">
                    <Checkbox
                      defaultChecked
                      me="16px"
                      colorScheme="brandScheme"
                    />
                    <Text
                      fontWeight="bold"
                      color={textColor}
                      fontSize="md"
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
                  />
                </Box>
              </Grid>
            </Card> */}

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
