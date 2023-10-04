/* eslint-disable */
import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
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
    // state: { pageIndex, pageSize },
    // gotoPage,
  } = tableInstance;
  initialState.pageSize = 10;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  let activeColor = useColorModeValue("green.500", "white");
  let inactiveColor = useColorModeValue("red.500", "secondaryGray.600");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

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

  return loading ? (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" />
    </Flex>
  ) : (
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
            {/* <Box>
              <FormControl color={iconColor}>
                <Select
                  color={iconColor}
                  id="user_type"
                  w="unset"
                  display="flex"
                  alignItems="center"
                >
                  <option value={"pdf"}>Export PDF</option>
                  <option value={"excel"}>Export Excel</option>
                </Select>
              </FormControl>
            </Box> */}
            {editable && (
              <Button onClick={() => navigate(path || "/")}>
                <Icon as={MdAddTask} color={iconColor} w="24px" h="24px" />
                &nbsp; Add New {name}
              </Button>
            )}
          </Flex>
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="20px"
          >
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe="10px"
                      key={index}
                      borderColor={borderColor}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {column.render("Header")}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (
                        cell.column.Header === "NAME" ||
                        cell.column.Header === "FIRST NAME" ||
                        cell.column.Header === "LAST NAME" ||
                        cell.column.Header === "EMAIL" ||
                        cell.column.Header === "DESCRIPTION" ||
                        cell.column.Header === "CURRENCY" ||
                        cell.column.Header === "PRICE MONTHLY" ||
                        cell.column.Header === "TRANSACTION ID" ||
                        cell.column.Header === "RECIPIENT" ||
                        cell.column.Header === "DATE & TIME" ||
                        cell.column.Header === "JOINED DATE" ||
                        cell.column.Header === "PRICE YEARLY" ||
                        cell.column.Header === "JOINED DATE" ||
                        cell.column.Header === "PLAN"
                      ) {
                        data = (
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        );
                        //                 // }
                        //                 // else if (cell.column.Header === "TECH") {
                        //                 // data = (
                        //                 //   <Flex align="center">
                        //                 //     {cell.value.map((item, key) => {
                        //                 //       if (item === "apple") {
                        //                 //         return (
                        //                 //           <AppleLogo
                        //                 //             key={key}
                        //                 //             color={iconColor}
                        //                 //             me="16px"
                        //                 //             h="18px"
                        //                 //             w="15px"
                        //                 //           />
                        //                 //         );
                        //                 //       } else if (item === "android") {
                        //                 //         return (
                        //                 //           <AndroidLogo
                        //                 //             key={key}
                        //                 //             color={iconColor}
                        //                 //             me="16px"
                        //                 //             h="18px"
                        //                 //             w="16px"
                        //                 //           />
                        //                 //         );
                        //                 //       } else if (item === "windows") {
                        //                 //         return (
                        //                 //           <WindowsLogo
                        //                 //             key={key}
                        //                 //             color={iconColor}
                        //                 //             h="18px"
                        //                 //             w="19px"
                        //                 //           />
                        //                 //         );
                        //                 //       }
                        //                 //     })}
                        //                 //   </Flex>
                        //                 // );
                        //                 // }
                        //                 // else if (cell.column.Header === "DATE") {
                        //                 //   data = (
                        //                 //     <Text color={textColor} fontSize="sm" fontWeight="700">
                        //                 //       {cell.value}
                        //                 //     </Text>
                        //                 //   );

                        //                 // } else if (cell.column.Header === "PROGRESS") {
                        //                 //   data = (
                        //                 //     <Flex align="center">
                        //                 //       <Text
                        //                 //         me="10px"
                        //                 //         color={textColor}
                        //                 //         fontSize="sm"
                        //                 //         fontWeight="700"
                        //                 //       >
                        //                 //         {cell.value}%
                        //                 //       </Text>
                        //                 //       <Progress
                        //                 //         variant="table"
                        //                 //         colorScheme="brandScheme"
                        //                 //         h="8px"
                        //                 //         w="63px"
                        //                 //         value={cell.value}
                        //                 //       />
                        //                 //     </Flex>
                        //                 //   );
                      } else if (cell.column.Header === "STATUS") {
                        data = (
                          <Flex align="center">
                            {typeof cell.value === "number" ? (
                              <>
                                <Icon
                                  w="20px"
                                  h="20px"
                                  me="5px"
                                  color={
                                    cell.value === 1
                                      ? "green.500"
                                      : cell.value === 2
                                      ? "red.500"
                                      : cell.value === 3
                                      ? "orange.500"
                                      : null
                                  }
                                  as={
                                    cell.value === 1
                                      ? MdCheckCircle
                                      : cell.value === 2
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
                                    name === "Payments" ? "Success" : "Active"
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
                            onChange={() =>
                              onChangeStatusOfPlan(
                                row?.id,
                                !cell.value,
                                row.original.id
                              )
                            }
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
                          paddingBottom={"10px"}
                          paddingTop={"10px"}
                          w={cell.column.Header === "ACTION" ? "100px" : "auto"}
                          borderColor="transparent"
                        >
                          {data}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
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
        // pageLength={page?.length}
        dataLength={dataLength}
        // dataLength={data?.length}
        selectedItemsLength={selectedFlatRows?.length}
      />
    </Card>
  );
}
