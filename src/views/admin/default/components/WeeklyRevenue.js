// Chakra imports
import {
  Box,
  Flex,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getDashboardChartData } from "Services/CommonServices";
import { setRafflesLoading } from "Store/Reducers/CommonSlice";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
// import {
//   barChartDataConsumption,
//   barChartOptionsConsumption,
// } from "variables/charts";
import { useDispatch, useSelector } from "react-redux";

const WeeklyRevenue = memo(() => {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
  const [type] = useState("raffle");

  const { dashboardRafflesChartData } = useSelector(({ common }) => common);

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

  const chartOptions = useMemo(() => {
    return {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
        },
        theme: "dark",
      },
      xaxis: {
        categories: dashboardRafflesChartData?.x || [],
        show: false,
        labels: {
          show: true,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
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
        color: "black",
        labels: {
          show: false,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      },

      grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
          lines: {
            show: false,
            opacity: 0.5,
          },
        },
        row: {
          opacity: 0.5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      },
      legend: {
        show: false,
      },
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "20px",
        },
      },
    };
  }, [dashboardRafflesChartData?.x]);

  const chartData = useMemo(() => {
    return [
      {
        name: "Total Raffles Done",
        data: dashboardRafflesChartData?.y || [],
      },
      {
        name: "Winners",
        data: dashboardRafflesChartData?.z || [],
      },
    ];
  }, [dashboardRafflesChartData?.y, dashboardRafflesChartData?.z]);

  return (
    <Card align="center" direction="column" w="100%">
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="md"
          fontWeight="700"
          lineHeight="100%"
        >
          Number of Raffles Done
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

      <Box h="240px" mt="auto">
        {loading ? (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            minHeight={"165px"}
          >
            <Spinner />
          </Flex>
        ) : (
          <BarChart chartData={chartData} chartOptions={chartOptions} />
        )}
      </Box>
    </Card>
  );
});
export default WeeklyRevenue;

// const barChartOptionsConsumption = {
//   chart: {
//     stacked: true,
//     toolbar: {
//       show: false,
//     },
//   },
//   tooltip: {
//     style: {
//       fontSize: "12px",
//       fontFamily: undefined,
//     },
//     onDatasetHover: {
//       style: {
//         fontSize: "12px",
//         fontFamily: undefined,
//       },
//     },
//     theme: "dark",
//   },
//   xaxis: {
//     categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
//     show: false,
//     labels: {
//       show: true,
//       style: {
//         colors: "#A3AED0",
//         fontSize: "14px",
//         fontWeight: "500",
//       },
//     },
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     show: false,
//     color: "black",
//     labels: {
//       show: false,
//       style: {
//         colors: "#A3AED0",
//         fontSize: "14px",
//         fontWeight: "500",
//       },
//     },
//   },

//   grid: {
//     borderColor: "rgba(163, 174, 208, 0.3)",
//     show: true,
//     yaxis: {
//       lines: {
//         show: false,
//         opacity: 0.5,
//       },
//     },
//     row: {
//       opacity: 0.5,
//     },
//     xaxis: {
//       lines: {
//         show: false,
//       },
//     },
//   },
//   fill: {
//     type: "solid",
//     colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
//   },
//   legend: {
//     show: false,
//   },
//   colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
//   dataLabels: {
//     enabled: false,
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       columnWidth: "20px",
//     },
//   },
// };
