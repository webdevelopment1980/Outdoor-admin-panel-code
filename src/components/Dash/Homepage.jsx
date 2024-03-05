import React from "react";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Icon,
  Link,
  Badge,
} from "@chakra-ui/react";
import { FaUser, FaFileAlt } from "react-icons/fa"; // Import icons

const AdminPanelHomePage = () => {
  // Dummy data (replace with actual data from your application)
  const numberOfProducts = 50;
  const numberOfBlogs = 20;

  return (
    <Box>
      {/* Main Content */}
      <Container maxW="container.xl" mt={8}>
        <Flex>
          {/* Sidebar (You can add navigation links here) */}
          <Box w="250px" mr={8}>
            {/* Add your sidebar content here */}
          </Box>

          {/* Main Content Area */}
          <Box flex="1">
            {/* Display the number of products and blogs with clickable links */}
            <Flex alignItems="center">
              <Link href="/products" textDecoration="none" mr={4}>
                <Box
                  p={4}
                  bg="teal.500"
                  color="white"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: "teal.600" }}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaFileAlt} color="white" mr={2} />
                  <span style={{ fontSize: "lg", fontWeight: "bold" }}>
                    Products
                  </span>
                  <Badge
                    variant="subtle"
                    colorScheme="yellow"
                    fontSize="sm"
                    ml={2}
                  >
                    {numberOfProducts} Items
                  </Badge>
                </Box>
              </Link>

              <Link href="/blogs" textDecoration="none">
                <Box
                  p={4}
                  bg="purple.500"
                  color="white"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: "purple.600" }}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaFileAlt} color="white" mr={2} />
                  <span style={{ fontSize: "lg", fontWeight: "bold" }}>
                    Blogs
                  </span>
                  <Badge
                    variant="subtle"
                    colorScheme="orange"
                    fontSize="sm"
                    ml={2}
                  >
                    {numberOfBlogs} Posts
                  </Badge>
                </Box>
              </Link>
            </Flex>

            {/* Add more content as needed */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AdminPanelHomePage;
