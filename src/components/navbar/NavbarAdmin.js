// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import { useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
// import routes from "routes";

export default function AdminNavbar(props) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { secondary, message, brandText } = props;

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  // let mainText = useColorModeValue("white", "navy.700");
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  // let secondaryText = useColorModeValue("white", "gray.700");
  let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  const brandColor = useColorModeValue("brand.500", "white");

  const changeNavbar = useCallback(() => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  const getUpdatedBreadCrumb = useMemo(() => {
    const segments = pathname.split("/"); // Remove empty segments

    return (
      <Breadcrumb>
        {segments.map((segment, i) => {
          const name = segment.split("-").join(" ");

          const path = `${segments.slice(0, i + 1).join("/")}`;
          const newPath = i === 0 ? "/" + path : path;

          return (
            <BreadcrumbItem key={i} color={secondaryText} fontSize="sm">
              <BreadcrumbLink href={newPath} color={secondaryText}>
                {i === 0 ? (
                  <>
                    <Flex>
                      <Icon
                        as={MdHome}
                        width="20px"
                        height="20px"
                        color="inherit"
                        marginRight={"5px"}
                      />
                      Home
                    </Flex>
                  </>
                ) : (
                  name.charAt(0).toUpperCase() + name.slice(1)
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    );
  }, [pathname, secondaryText]);

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      // bg={brandColor}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      // backdropFilter={"auto"}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", lg: "20px", xl: "20px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
        "2xl": "calc(100vw - 365px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          {getUpdatedBreadCrumb}
          {/* Here we create navbar brand, based on route name */}
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="34px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
