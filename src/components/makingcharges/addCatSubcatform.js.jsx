import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";

function AddCategoryAndSubcategoryForm() {
  const [category, setCategory] = useState("");
  const toast = useToast();
  const { user, setUserAgain, API_BASE_URL } = AdminState();
  const handleAddCategoryAndSubcategory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/category`, {
        category,
      });
      toast({
        title: "Updated",
        description: "Category and Subcategory added Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });
      setCategory("");
    } catch (error) {
      console.error("Error adding category and subcategories:", error);
    }
  };

  return (
    <form>
      <FormControl id="category">
        <FormLabel>Category</FormLabel>
        <Input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormControl>

      <Button
        onClick={handleAddCategoryAndSubcategory}
        marginTop={"20px"}
        style={{
          backgroundColor: "#C02222",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Add Category
      </Button>
    </form>
  );
}

export default AddCategoryAndSubcategoryForm;
