import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons
import { AdminState } from "../context/context";

const OrdersTable = () => {
  const [categories, setCategories] = useState([]);
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const toast = useToast();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleEditSubcategory = (categoryId, subcategory) => {
    setEditSubcategory(subcategory);
    setEditCategoryId(categoryId);
  };

  const handleUpdateSubcategory = async () => {
    try {
      // Make an HTTP request to update the subcategory
      const response = await axios.put(
        `${API_BASE_URL}/api/category/edit/${editCategoryId}`,
        {
          // categoryId: editCategoryId,
          category: editSubcategory,
        }
      );
      console.log(response.data);
      toast({
        title: "Updated",
        description: "Subcategory Updated Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });

      // // After successfully updating, fetch the updated data from the server
      const updatedDataResponse = await axios.get(
        `${API_BASE_URL}/api/category`
      );
      const updatedData = updatedDataResponse.data;

      // Update your state with the fetched updated data
      setCategories(updatedData);

      console.log("Before state update:", categories);
      // setCategories(updatedCategories);
      console.log("After state update:", categories);

      // Reset the edit subcategory input
      setEditSubcategory("");
      setEditCategoryId("");
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Make an HTTP request to delete the category
      const response = await axios.delete(
        `${API_BASE_URL}/api/category/delete/${categoryId}`
      );
      // After successfully deleting, fetch the updated data from the server
      const updatedDataResponse = await axios.get(
        `${API_BASE_URL}/api/category`
      );
      const updatedData = updatedDataResponse.data;

      // Update your state with the fetched updated data
      setCategories(updatedData);
      toast({
        title: "Deleted",
        description: "Deleted Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });
      console.log("Category Deleted Successfully", categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Box p={6} bg="gray.100" border="1px solid #ccc" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Button
          mt={4}
          backgroundColor={"#C02222"}
          color={"white"}
          size="sm"
          rounded="md"
          style={{ width: "200px" }}
        >
          <Link to="/addcategory">Add new category</Link>
        </Button>
        <Heading as="h3" size="sm" p={2} rounded="md">
          Categories
        </Heading>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Box key={category._id} bg="white" p={2} rounded="md">
              <Text m={5} pr={2} fontWeight="bold">
                {category.category}
                <IconButton
                  icon={<FaTrash />} // Delete icon
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  onClick={() => handleDeleteCategory(category._id)}
                  style={{ display: "flex", float: "right" }}
                />
                <IconButton
                  icon={<FaEdit />}
                  backgroundColor={"#000"}
                  color={"white"}
                  size="sm"
                  ml={2}
                  onClick={() =>
                    handleEditSubcategory(category._id, category.category)
                  }
                  style={{ display: "flex", float: "right" }}
                />
              </Text>
            </Box>
          ))
        ) : (
          <Text bg="white" p={2} rounded="md">
            No categories available
          </Text>
        )}
        {editCategoryId && (
          <Box>
            <Input
              value={editSubcategory}
              onChange={(e) => setEditSubcategory(e.target.value)}
              placeholder="Edit subcategory"
            />
            <Button
              onClick={handleUpdateSubcategory}
              colorScheme="teal"
              size="sm"
            >
              Update Category
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default OrdersTable;
