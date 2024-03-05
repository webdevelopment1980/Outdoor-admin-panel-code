import React, { useEffect, useState } from "react";
import {
  Center,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  IconButton,
  Flex,
  useToast,
  Link,
  HStack, // Import HStack for horizontal alignment
  Text,
  Stack,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink from react-router-dom
import { AdminState } from "../context/context";
const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredArticles = article.filter((product) => {
    const title = (product.address || "").toString(); // Convert to string, handle null or undefined
    const category = (product.category || "").toString(); // Convert to string, handle null or undefined
    const subcategory = (product.city || "").toString(); // Convert to string, handle null or undefined

    const searchString = searchQuery.toLowerCase();

    return (
      title.toLowerCase().includes(searchString) ||
      category.toLowerCase().includes(searchString) ||
      subcategory.toLowerCase().includes(searchString)
    );
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    // Perform sorting logic based on the selected criteria and order
    if (sortOrder === "asc") {
      return a[sortCriteria].localeCompare(b[sortCriteria]);
    } else {
      return b[sortCriteria].localeCompare(a[sortCriteria]);
    }
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          (prev) =>
            error.response.data.message ||
            error.response.data.error ||
            error.message ||
            "Error while fetching users"
        );
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }
  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/products/${articleId}`
      );
      toast({
        title: "Deleted",
        description: "Deleted Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });

      const updateState = await axios.get(`${API_BASE_URL}/api/products`);
      const requested = updateState.data;
      setArticle(requested);

      console.log("Deleted Successfully", articleId);
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "error",
        description: "error deleting blog.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="user-table-container">
      <Box display="flex" alignItems="center">
        <Text>Total Products {sortedArticles.length}</Text>
        <Center flex="1">
          {/* Using flex="1" to allow the Heading to take remaining space */}
          <Heading as="h1" size="lg" mb={4} mt={2}>
            All Products
          </Heading>
        </Center>
        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "4px", marginLeft: "auto" }}
        />
      </Box>
      {error ? (
        <Box className="error-box">{error}</Box>
      ) : (
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th>Illumination</Th>
              <Th>Category</Th>
              <Th>State</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedArticles.map((product) => (
              <Tr key={product._id}>
                <Td>{product.address}</Td>
                <Td>{product.illumination}</Td>
                <Td>{product.category}</Td>
                <Td>{product.state}</Td>
                <Td>
                  {new Date(product.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Td>
                <Td>
                  <HStack>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteArticle(product._id)}
                    />
                    <RouterLink to={`/editProduct/${product._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        backgroundColor={"#0a2351"}
                        color={"white"}
                        size="sm"
                      />
                    </RouterLink>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Text mt="20px">Total Products Added {sortedArticles.length}</Text>
        </Table>
      )}
    </Box>
  );
};

export default UserTable;
