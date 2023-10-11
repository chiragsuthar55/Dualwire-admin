/* eslint-disable */
import {
  Box,
  Button,
  Flex,
  Icon,
  // Select,
  Skeleton,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { getPaymentStatus } from "Helper/Common";
import TablePagination from "components/TablePagination";
// Custom components
import Card from "components/card/Card";
import CustomMenu from "components/menu/Menu";
import React, { useCallback, useMemo } from "react";
import {
  MdAddTask,
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { setPlans } from "Store/Reducers/PlanSlice";
import { useDispatch } from "react-redux";
import { updateStatusOfPlan } from "Services/PlanService";
import { chartColor } from "views/admin/default/components/PieCard";
import { FaFilePdf } from "react-icons/fa";
import { onViewReportPdf } from "Helper/Common";

export default function DevelopmentTable({
  loading,
  editable,
  columnsData,
  tableData,
  name,
  path,
  dataLength,
  pageIndex,
  pageLength,
  gotoPage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageSize },
  } = tableInstance;
  initialState.pageSize = 10;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  let activeColor = useColorModeValue("green.500", "white");
  let inactiveColor = useColorModeValue("red.500", "secondaryGray.600");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const onEdit = useCallback(
    (id) => {
      if (!id) return;
      if (pathname === "/plans") navigate(`/plans/${id}`);
      else if (pathname === "/users") navigate(`/users/${id}`);
    },
    [pathname]
  );

  const onDelete = useCallback((id) => {}, []);

  const onView = useCallback(
    (id) => {
      if (!id) return;
      if (pathname === "/plans") navigate(`/plans/${id}`);
    },
    [pathname]
  );

  const onChangeStatusOfPlan = useCallback(
    async (i, val, id) => {
      let list = [...JSON.parse(JSON.stringify(tableData))];
      const v = val ? 1 : 0;
      const res = await dispatch(updateStatusOfPlan(id, v));
      if (res) {
        list[Number(i)].status = v;
        dispatch(setPlans(list));
      }
    },
    [tableData]
  );

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "hidden", lg: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: "calc(100vh - 220px)",
          overflowX: "auto",
        }}
      >
        <Box>
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              {name}
            </Text>

            <Flex>
              {editable && (
                <Button
                  onClick={() => navigate(path || "/")}
                  me={"10px"}
                  borderRadius={"10px"}
                >
                  <Icon as={MdAddTask} color={iconColor} w="24px" h="24px" />
                  &nbsp; Add New {name}
                </Button>
              )}
              {/* <Select
                _focus={bgFocus}
                _hover={bgHover}
                color={iconColor}
                id="user_type"
                w="unset"
                display="flex"
                alignItems="center"
                defaultValue="Weekly"
                me={"10px"}
              >
                <option value={1}>Active</option>
                <option value={0}>InActive</option>
              </Select> */}
              <Box>
                <Button
                  paddingLeft={"5px"}
                  paddingRight={"5px"}
                  onClick={() => onViewReportPdf(data, name)}
                  borderRadius={"10px"}
                  // marginRight={"5px"}
                >
                  <Icon as={FaFilePdf} color={iconColor} w="20px" h="20px" />
                </Button>
                {/* <Button
                  paddingLeft={"5px"}
                  paddingRight={"5px"}
                  // onClick={() => onViewReportExcel(path || "/")}
                  borderRadius={"10px"}
                >
                  <Icon as={FaFileExcel} color={iconColor} w="20px" h="20px" />
                </Button> */}
              </Box>
            </Flex>
          </Flex>
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="20px"
          >
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <>
                  {loading ? (
                    <Skeleton height="30px" />
                  ) : (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <Th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          pe="10px"
                          key={index}
                          borderColor={borderColor}
                        >
                          <Flex
                            color={iconColor}
                            fontWeight={800}
                            justify="space-between"
                            align="center"
                            fontSize={{ sm: "10px", lg: "12px" }}
                            // color="gray.400"
                          >
                            {column.render("Header")}
                          </Flex>
                        </Th>
                      ))}
                    </Tr>
                  )}
                </>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {loading ? (
                <Box>
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                  <Skeleton
                    height="30px"
                    marginBottom={"20px"}
                    marginTop={"20px"}
                  />
                </Box>
              ) : (
                page.map((row, j) => {
                  prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      key={j}
                      _hover={bgHover}
                      cursor={
                        name === "Plans" || name === "Users" ? "pointer" : false
                      }
                    >
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (
                          cell.column.Header === "NAME" ||
                          cell.column.Header === "USERNAME" ||
                          cell.column.Header === "LOGOUT TIME" ||
                          cell.column.Header === "LOGIN TIME" ||
                          cell.column.Header === "IP ADDRESS" ||
                          cell.column.Header === "COUNTRY" ||
                          cell.column.Header === "SUBSCRIPTION ID" ||
                          cell.column.Header === "RECIPIENT" ||
                          cell.column.Header === "AVG TIME SPENDED" ||
                          cell.column.Header === "FIRST NAME" ||
                          cell.column.Header === "LAST NAME" ||
                          cell.column.Header === "EMAIL" ||
                          cell.column.Header === "AMOUNT" ||
                          cell.column.Header === "PLAN INTERVAL" ||
                          cell.column.Header === "CUSTOMER EMAIL" ||
                          cell.column.Header === "PLAN PERIOD END" ||
                          cell.column.Header === "PLAN PERIOD START" ||
                          cell.column.Header === "DESCRIPTION" ||
                          cell.column.Header === "CURRENCY" ||
                          cell.column.Header === "PRICE MONTHLY" ||
                          cell.column.Header === "USER STATUS" ||
                          cell.column.Header === "TRANSACTION ID" ||
                          cell.column.Header === "RECIPIENT" ||
                          cell.column.Header === "DATE & TIME" ||
                          cell.column.Header === "JOINED DATE" ||
                          cell.column.Header === "COMMENTS" ||
                          cell.column.Header === "TITLE" ||
                          cell.column.Header === "WINNER" ||
                          cell.column.Header === "CHANNEL TITLE" ||
                          cell.column.Header === "PRICE YEARLY" ||
                          cell.column.Header === "JOINED DATE" ||
                          cell.column.Header === "PLAN"
                        ) {
                          data = (
                            <Text
                              color={textColor}
                              // color={
                              //   cell.column.Header === "NAME"
                              //     ? chartColor[j]
                              //     : textColor
                              // }
                              fontSize="sm"
                              fontWeight="700"
                              onClick={() => onEdit(tableData?.[row?.id]?.id)}
                            >
                              {cell.value}
                            </Text>
                          );
                        } else if (cell.column.Header === "STATUS") {
                          data = (
                            <Flex
                              align="center"
                              onClick={() => onEdit(tableData?.[row?.id]?.id)}
                            >
                              {typeof cell.value === "number" ? (
                                <>
                                  <Icon
                                    w="20px"
                                    h="20px"
                                    me="5px"
                                    color={
                                      cell.value === 1
                                        ? "green.500"
                                        : cell.value === 2 || cell.value === 0
                                        ? "red.500"
                                        : cell.value === 3
                                        ? "orange.500"
                                        : null
                                    }
                                    as={
                                      cell.value === 1
                                        ? MdCheckCircle
                                        : cell.value === 2 || cell.value === 0
                                        ? MdCancel
                                        : cell.value === 3
                                        ? MdOutlineError
                                        : null
                                    }
                                  />
                                  <Text
                                    color={textColor}
                                    fontSize="sm"
                                    fontWeight="700"
                                  >
                                    {getPaymentStatus(
                                      cell.value,
                                      name === "Subscriptions"
                                        ? "Success"
                                        : "Active"
                                    )}
                                  </Text>
                                </>
                              ) : cell.value ? (
                                <Icon
                                  as={MdCheckCircle}
                                  width="20px"
                                  height="20px"
                                  color={activeColor}
                                />
                              ) : (
                                <Icon
                                  as={MdCancel}
                                  width="20px"
                                  height="20px"
                                  color={inactiveColor}
                                />
                              )}
                            </Flex>
                          );
                        } else if (cell.column.Header === "PLAN STATUS") {
                          data = (
                            <Switch
                              isChecked={cell.value}
                              variant="main"
                              colorScheme="brandScheme"
                              size="md"
                              onChange={(e) => {
                                e.preventDefault();
                                onChangeStatusOfPlan(
                                  row?.id,
                                  !cell.value,
                                  row.original.id
                                );
                              }}
                            />
                          );
                        } else if (cell.column.Header === "ACTION") {
                          data = (
                            <Flex align="center">
                              <CustomMenu
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onView={onView}
                                data={tableData[row.id]}
                                module={pathname}
                              />
                            </Flex>
                          );
                        }
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={index}
                            fontSize={{ sm: "14px" }}
                            minW={{
                              sm: "150px",
                              md: "200px",
                              lg: "auto",
                            }}
                            paddingBottom={{
                              sm: "10px",
                              md: "14px",
                              lg: "16px",
                            }}
                            paddingTop={{
                              sm: "10px",
                              md: "14px",
                              lg: "16px",
                            }}
                            w={
                              cell.column.Header === "ACTION" ? "100px" : "auto"
                            }
                            borderColor={borderColor}
                            // borderColor="transparent"
                          >
                            {data}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </Box>
      </div>
      <TablePagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageLength={pageLength}
        dataLength={dataLength}
        selectedItemsLength={selectedFlatRows?.length}
      />
    </Card>
  );
}
