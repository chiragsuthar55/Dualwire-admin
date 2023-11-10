// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getDashboardChartData } from "Services/CommonServices";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
// Assets
import { useDispatch, useSelector } from "react-redux";
// import {
//   lineChartDataTotalSpent,
//   lineChartOptionsTotalSpent,
// } from "variables/charts";

export default function TotalSpent() {
  // Chakra Color Mode

  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(1);
  const [type] = useState("earn"); // earn means money spent by user

  const { dashboardSpentChartData } = useSelector(({ common }) => common);

  const loadData = useCallback(
    async (duration, type) => {
      const res = await dispatch(getDashboardChartData(duration, type));
      if (res) setLoading(false);
    },
    [dispatch]
  );
  useEffect(() => {
    setLoading(true);
    loadData(duration, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, type]);

  const totalSpent = useMemo(() => {
    return [
      {
        name: "No. of client billed",
        data: dashboardSpentChartData?.y || [],
      },
      // {
      //   name: "Profit",
      //   data: [30, 40, 24, 46, 20, 46],
      // },
    ];
  }, [dashboardSpentChartData?.y]);

  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: dashboardSpentChartData?.x || [],
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
    >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Total Revenue
        </Text>
        <Select
          _focus={bgFocus}
          _hover={bgHover}
          color={iconColor}
          fontSize="sm"
          // variant="subtle"
          width="unset"
          fontWeight="700"
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          value={duration || ""}
        >
          <option value={1}>Weekly</option>
          <option value={2}>Monthly</option>
          <option value={3}>Yearly</option>
        </Select>
      </Flex>
      {/* <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Button
            bg={boxBg}
            fontSize="sm"
            fontWeight="500"
            color={textColorSecondary}
            borderRadius="7px"
          >
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me="4px"
            />
            Today
          </Button>
          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
          >
            <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
          </Button>
        </Flex>
      </Flex> */}
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" me="20px" mt="28px">
          <Text
            color={textColor}
            fontSize="34px"
            textAlign="start"
            fontWeight="700"
            lineHeight="100%"
          >
            ${dashboardSpentChartData?.totalBilled || 0}
          </Text>
          <Flex align="center" mb="20px">
            <Text
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
              mt="4px"
              me="12px"
            >
              {dashboardSpentChartData?.bar_chart?.earn?.length === 0
                ? "No data"
                : "Total Billed"}
            </Text>
            {/* <Flex align="center">
              <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
              <Text color="green.500" fontSize="sm" fontWeight="700">
                +2.45%
              </Text>
            </Flex> */}
          </Flex>

          {/* <Flex align="center">
            <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
            <Text color="green.500" fontSize="md" fontWeight="700">
              On track
            </Text>
          </Flex> */}
        </Flex>
        <Box minH="260px" minW="75%" mt="auto">
          {loading ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              minHeight={"165px"}
            >
              <Spinner />
            </Flex>
          ) : (
            <LineChart chartData={totalSpent} chartOptions={lineChartOptions} />
          )}
        </Box>
      </Flex>
    </Card>
  );
}
