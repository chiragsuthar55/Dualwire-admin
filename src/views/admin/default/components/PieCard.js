// Chakra imports
import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { getDashboardChartData } from "Services/CommonServices";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
// import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const chartColor = ["#6AD2FF", "#5333E3"];

export default function Conversion({ data }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(1);
  const [type] = useState("user");

  const { dashboardUserChartData } = useSelector(({ common }) => common);

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

  const pieChartOptions = useMemo(() => {
    return {
      labels: dashboardUserChartData?.pie_chart?.labels || [],
      colors: ["#6AD2FF", "#5333E3"],
      chart: {
        width: "50px",
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      hover: { mode: null },
      plotOptions: {
        donut: {
          expandOnClick: false,
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
      fill: {
        colors: ["#6AD2FF", "#5333E3"],
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    };
  }, [dashboardUserChartData?.pie_chart?.labels]);

  return (
    <Card p="20px" align="center" direction="column" w="100%">
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Account Type Statistics
        </Text>
        <Select
          fontSize="sm"
          variant="subtle"
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
      {loading ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          minHeight={"165px"}
        >
          <Spinner />
        </Flex>
      ) : (
        <PieChart
          h="100%"
          w="100%"
          chartData={dashboardUserChartData?.pie_chart?.data || []}
          chartOptions={pieChartOptions}
        />
      )}
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        {dashboardUserChartData?.pie_chart?.data?.map((x, i) => {
          return (
            <React.Fragment key={i}>
              <Flex direction="column" py="5px">
                <Flex align="center">
                  <Box
                    h="8px"
                    w="8px"
                    bg="brand.500"
                    borderRadius="50%"
                    me="4px"
                  />
                  <Text
                    fontSize="xs"
                    color="secondaryGray.600"
                    fontWeight="700"
                    mb="5px"
                  >
                    {dashboardUserChartData?.pie_chart?.labels?.[i]}
                  </Text>
                </Flex>
                <Text fontSize="lg" color={textColor} fontWeight="700">
                  {x}
                </Text>
              </Flex>
              {dashboardUserChartData?.pie_chart?.data?.length !== i + 1 ? (
                <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
              ) : null}
            </React.Fragment>
          );
        })}
      </Card>
    </Card>
  );
}
