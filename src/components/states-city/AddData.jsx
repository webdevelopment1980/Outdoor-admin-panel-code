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

function AddStateCity() {
    const [category, setCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [status, setStatus] = useState("active"); // Default status
    const toast = useToast();
    const { user, setUserAgain, API_BASE_URL } = AdminState();
    const handleAddCategoryAndSubcategory = async () => {
        try {
            console.log(category);
            console.log(subcategories);
            // console.log(status);
            if (category === "" || subcategories.length === 0) {
                console.error(
                    "Both category and at least one subcategory are required."
                );
                return;
            }

            // Send a POST request to add the category and subcategories
            await axios.post(`${API_BASE_URL}/api/statescity`, {
                state: category,
                city: subcategories,
            });
            toast({
                title: "Updated",
                description: "Category and Subcategory added Successfully.",
                status: "success",
                position: "top",
                duration: 4000,
            });
            setCategory("");
            setSubcategories([]);
        } catch (error) {
            console.error("Error adding category and subcategories:", error);
        }
    };

    return (
        <form>
            <FormControl id="category">
                <FormLabel>Enter State</FormLabel>
                <Input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </FormControl>

            <FormControl id="subcategories">
                <FormLabel>Enter City</FormLabel>
                <Input
                    type="text"
                    value={subcategories.join(",")}
                    onChange={(e) => setSubcategories(e.target.value.split(","))}
                />
            </FormControl>
            <Button
                onClick={handleAddCategoryAndSubcategory}
                marginTop={"20px"}
                style={{
                    backgroundColor: "#0a2351",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "3px",
                    cursor: "pointer",
                }}
            >
                Add State & City
            </Button>
        </form>
    );
}

export default AddStateCity;
