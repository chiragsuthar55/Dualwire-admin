import {
  Box,
  Button,
  Flex,
  FormControl,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function TablePagination({
  pageIndex,
  pageSize,
  setPageSize,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageLength,
  dataLength,
  gotoPage,
  selectedItemsLength,
  renderProps,
}) {
  // const [perPageItem, setPerPageItem] = useState(10);

  // const handleChangePageSize = (value) => {
  //   setPageSize(Number(value) === 0 ? 1000000 : Number(value));
  //   setPerPageItem(Number(value) === 0 ? "0" : Number(value));
  // };

  // Function to generate a dynamic range of page numbers
  const generatePageRange = () => {
    const totalPages = Math.ceil(dataLength / pageSize);
    const displayRange = 3; // Number of page buttons to display
    const middlePage = Math.floor(displayRange / 2);
    let start = Math.max(0, pageIndex - middlePage);
    let end = Math.min(start + displayRange - 1, totalPages - 1);

    // Adjust the start if we are nearing the end of the pages
    if (end - start < displayRange - 1) {
      start = Math.max(0, end - displayRange + 1);
    }

    const pageRange = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    return { start, end, pageRange };
  };

  const { start, end, pageRange } = generatePageRange();
  const iconColor = useColorModeValue("brand.500", "white");

  return (
    <>
      <Box
        display={"flex"}
        padding={"0px 20px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box alignItems={"center"} display="flex">
          {/* <FormControl color={iconColor}>
            <Select
              color={iconColor}
              id="user_type"
              w="unset"
              display="flex"
              alignItems="center"
              value={perPageItem || ""}
              onChange={(e) => {
                handleChangePageSize(Number(e?.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={"0"}>All</option>
            </Select>
          </FormControl> */}
        </Box>
        {renderProps}
        <Flex alignItems={"center"}>
          <Box marginRight={"10px"}>
            <Text>Items per page</Text>
            {selectedItemsLength > 0 && (
              <Box>Selected Items : {selectedItemsLength}</Box>
            )}
          </Box>
          <Text marginRight={"20px"}>
            {/* {pageIndex * pageSize + 1} - {pageIndex * pageSize + pageLength} of{" "}
            {dataLength} */}
            {Math.min(pageIndex * pageSize + 1, dataLength)} -{" "}
            {Math.min((pageIndex + 1) * pageSize, dataLength)} of {dataLength}
          </Text>
          <Button
            height={"35px"}
            width={"35px"}
            padding={"5px"}
            type="button"
            onClick={() => {
              // previousPage();
              // if (pageIndex === 0) return;
              gotoPage(start === pageIndex ? pageIndex : pageIndex - 1);
              //   setPageDataInQuery(pageIndex - 1);
            }}
            disabled={start === pageIndex}
          >
            <MdChevronLeft />
          </Button>

          {start > 0 && (
            <>
              <Button
                color={start === pageIndex ? iconColor : "black"}
                onClick={() => {
                  gotoPage(0);
                  //   setPerPageItem(0);
                }}
              >
                1
              </Button>
              {start > 1 && <span>...</span>}
            </>
          )}

          {pageRange?.map((pageNumber, i) => {
            return (
              <Button
                color={pageNumber === pageIndex ? iconColor : "black"}
                onClick={() => gotoPage(pageNumber)}
                // onClick={() => gotoPage(pageNumber + 1)}
                key={i}
              >
                {pageNumber + 1}
              </Button>
            );
          })}

          {end < dataLength / pageSize - 1 && (
            <>
              {end < dataLength / pageSize - 2 && <span>...</span>}
              <Button
                className={end === pageIndex ? iconColor : "black"}
                onClick={() => gotoPage(Math.ceil(dataLength / pageSize) - 1)}
                // onClick={() => gotoPage(Math.ceil(dataLength / pageSize) - 1)}
              >
                {Math.ceil(dataLength / pageSize)}
              </Button>
            </>
          )}
          <Button
            height={"35px"}
            width={"35px"}
            padding={"5px"}
            type="button"
            onClick={() => {
              // nextPage();
              //   setPageDataInQuery(pageIndex + 1);
              gotoPage(end === pageIndex ? pageIndex : pageIndex + 1);
            }}
            disabled={end === pageIndex}
          >
            <MdChevronRight />
          </Button>
        </Flex>
      </Box>
    </>
  );
}
