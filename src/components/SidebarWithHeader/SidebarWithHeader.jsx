import React from "react";
import news from "../../assets/news-report.png";
import {
  AvatarBadge,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown } from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { MdOutlineManageSearch, MdOutlineCreate } from "react-icons/md";
import { AdminState } from "../context/context";

const LinkItems = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Manage Products", icon: MdOutlineManageSearch, link: "/articles" },
  { name: "Manage category", icon: MdOutlineCreate, link: "/category" },
  { name: "Add Blogs", icon: RiArticleLine, link: "/Addblogs" },
  { name: "Manage Blogs", icon: FaEdit, link: "/ManageBlogs" },
  { name: "City & State", icon: MdOutlineCreate, link: "/City" },
  { name: "User Queries", icon: FaEdit, link: "/quries" },
];

export default function SidebarWithHeader({ children, setLoggedIn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "black")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav setLoggedIn={setLoggedIn} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigateTo = useNavigate();

  return (
    <Box
      color={useColorModeValue("white", "white")}
      transition="3s ease"
      bg={"black"}
      borderRight="1px"
      borderRightColor={"white"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* <Flex h="5" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image
            src="https://imgpile.com/images/9BZJiw.png"
            alt="Logo"
            height="30px"
          />{" "}
          Jewellery Bliss
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex> */}
      <Flex
        h="5"
        alignItems="center"
        mx="8"
        mb="15px"
        mt="30px"
        justifyContent="space-between"
      >
        <HStack spacing="2">
          {" "}
          {/* Use HStack to display elements horizontally */}
          {/* <Link to="/"> */}
          <Image src={news} alt="Logo" height="50px" />
          {/* <Text fontSize="13px" fontWeight="bold" mr="2px">
            NEWS WEBSITE
          </Text> */}
          {/* </Link> */}
        </HStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem
          fontSize={"15px"}
          key={link.name}
          linkTo={link.link}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, linkTo, children, ...rest }) => {
  return (
    <Link
      as={RouteLink}
      to={linkTo}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        // _hover={{
        //   bg: "cyan.400",
        //   color: "white",
        // }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, setLoggedIn, ...rest }) => {
  const { user, token } = AdminState();
  const navigateTo = useNavigate();
  console.log(user);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"black"}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        JewellBliss
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack color={"white"}>
                <Avatar>
                  <AvatarBadge boxSize="1.0em" bg="green.500" />
                </Avatar>
                {/* <Avatar size={"sm"} src={news} /> */}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color={"white"}>
                    {user.name}
                  </Text>
                  <Text fontSize="xs" color="white">
                    {user.role || user.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider /> */}
              <MenuItem>
                <Button
                  onClick={() => {
                    localStorage.clear();
                    setLoggedIn((prev) => !prev);
                    navigateTo("/auth");
                  }}
                >
                  SignOut
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
