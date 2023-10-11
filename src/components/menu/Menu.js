import React from "react";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
  MdEdit,
  MdPageview,
  MdDelete,
} from "react-icons/md";

export default function CustomMenu({ onDelete, onEdit, data, onView, module }) {
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "rgba(112, 144, 176, 0.08) 0px 0px 15px 0px",
    "unset"
  );
  // const bgShadow = useColorModeValue(
  //   "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
  //   "unset"
  // );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton
        align="center"
        justifyContent="center"
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w="37px"
        // h="37px"
        lineHeight="100%"
        onClick={(e) => {
          console.log("e", e);
          e.preventDefault();
          onOpen1();
        }}
        borderRadius="10px"
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
      </MenuButton>
      <MenuList
        w="150px"
        minW="unset"
        maxW="150px !important"
        border="transparent"
        backdropFilter="blur(63px)"
        bg={bgList}
        boxShadow={"1px 4px 8px 1px rgba(112, 144, 176, 0.08)"}
        // boxShadow={bgShadow}
        borderRadius="20px"
        p="15px"
      >
        {/* {module === "/plans" ? null : (
          <MenuItem
            transition="0.2s linear"
            // color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={() => onView(data?.id)}
          >
            <Flex align="center">
              <Icon as={MdPageview} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                View
              </Text>
            </Flex>
          </MenuItem>
        )} */}
        {module === "/payments" ? null : (
          <MenuItem
            transition="0.2s linear"
            // color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={() => onEdit(data?.id)}
          >
            <Flex align="center">
              <Icon as={MdEdit} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Edit
              </Text>
            </Flex>
          </MenuItem>
        )}
        {module === "/plans" ? null : (
          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            // color={textColor}
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={() => onDelete(data?.id)}
          >
            <Flex align="center">
              <Icon as={MdDelete} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Delete
              </Text>
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
