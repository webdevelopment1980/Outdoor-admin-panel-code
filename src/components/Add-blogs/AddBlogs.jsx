import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../Dash/Home.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddBlogs.css";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Stack,
  RadioGroup,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { AdminState } from "../context/context";

function AddBlogs() {
  const [title, setTitle] = useState("");
  const [quillDescription, setQuillDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [active, setActive] = useState("");
  const [seotitle, Setseotitle] = useState("");
  const [seodescription, Setseodescription] = useState("");
  const [urlparams, Seturlparams] = useState("");
  const [categories, setCategories] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(null);
  //   const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const toast = useToast();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/article/category/get`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadBlogData = async (blogData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/blog`, blogData);
      // console.log("Blog uploaded:", response.data);
      toast({
        title: "Updated",
        description: "blog Uploaded Successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading blog:", error);
      toast({
        title: "Updated",
        description: "error updating blog.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
    const clearForm = () => {
      setTitle("");
      setQuillDescription("");
      // setSelectedCategory(null);
      setPhoto(null);
      setActive("");
      Setseotitle("");
      Setseodescription("");
      Seturlparams("");
    };
    clearForm();
  };

  const uploadImage = async () => {
    if (!photo) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmlflkbrx/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded:", response.data);
      const secureUrl = response.data.secure_url;
      uploadBlogData({
        title,
        description: quillDescription,
        // category: selectedCategories,
        photo: secureUrl,
        status: active,
        seotitle,
        seodescription,
        // subcategory: selectedSubcategories,
        engtitle: urlparams,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
    }
  };

  // Define the handleInputChange function to update input fields
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    // Update the corresponding state based on the field
    if (field === "title") {
      setTitle(value);
    } else if (field === "seotitle") {
      Setseotitle(value);
    } else if (field === "seodescription") {
      Setseodescription(value);
    } else if (field === "status") {
      setActive(value);
    } else if (field === "urlparams") {
      Seturlparams(value);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    let updatedSelectedCategories;

    if (e.target.checked) {
      updatedSelectedCategories = [...selectedCategories, selectedCategoryName];
    } else {
      updatedSelectedCategories = selectedCategories.filter(
        (category) => category !== selectedCategoryName
      );
    }

    setSelectedCategories(updatedSelectedCategories);

    // Update available subcategories based on all selected categories
    const selectedSubcategories = categories
      .filter((category) => updatedSelectedCategories.includes(category.name))
      .map((category) => category.subcategory)
      .flat(); // Flatten the array of subcategories

    setAvailableSubcategories(selectedSubcategories);
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategory = e.target.value;
    if (e.target.checked) {
      setSelectedSubcategories([...selectedSubcategories, selectedSubcategory]);
    } else {
      setSelectedSubcategories(
        selectedSubcategories.filter((subcat) => subcat !== selectedSubcategory)
      );
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["image"],
      ["clean"],
    ],
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Upload an Article</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              placeholder="Blog Title"
              className="input-field"
              value={title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>

          <div className="form-group">
            <label className="desc" htmlFor="quillDescription">
              Blog Description
            </label>
            <ReactQuill
              style={{ height: "400px" }}
              className="quill"
              value={quillDescription}
              onChange={setQuillDescription}
              modules={modules}
              id="quillDescription"
            />
          </div>

          {/* <div className="category-container">
            <div className="radio-container" style={{ marginTop: "70px" }}>
              <label>Categories:</label>
              {categories.map((cat) => (
                <div key={cat._id} className="radio-label">
                  <input
                    type="checkbox"
                    id={cat.name}
                    value={cat.name}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={handleCategoryChange}
                    className="checkbox-input"
                  />
                  <label htmlFor={cat.name} className="checkbox-label">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="radio-container">
              <label htmlFor="subcategory">Subcategories:</label>
              {availableSubcategories.map((subcat) => (
                <div key={subcat} className="radio-label">
                  <input
                    type="checkbox"
                    id={subcat}
                    value={subcat}
                    checked={selectedSubcategories.includes(subcat)}
                    onChange={handleSubcategoryChange}
                    className="checkbox-input"
                  />
                  <label htmlFor={subcat} className="checkbox-label">
                    {subcat}
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="form-group" style={{ marginTop: "50px" }}>
            <label htmlFor="seotitle">SEO Title</label>
            <input
              type="text"
              id="seotitle"
              placeholder="SEO Title"
              className="input-field"
              value={seotitle}
              onChange={(e) => handleInputChange(e, "seotitle")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seodescription">SEO Description</label>
            <input
              type="text"
              id="seodescription"
              placeholder="SEO Description"
              className="input-field"
              value={seodescription}
              onChange={(e) => handleInputChange(e, "seodescription")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="urlparams">URL Params</label>
            <input
              type="text"
              id="urlparams"
              placeholder="URL Params"
              className="input-field"
              value={urlparams}
              onChange={(e) => handleInputChange(e, "urlparams")}
            />
          </div>

          <div className="radio-container">
            <label>Status:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="published"
                name="status"
                value="published"
                checked={active === "published"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="published" className="radio-labels">
                Published
              </label>
            </div>

            <div className="radio-group">
              <input
                type="radio"
                id="draft"
                name="status"
                value="draft"
                checked={active === "draft"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="draft" className="radio-labels">
                Draft
              </label>
            </div>

            <div className="radio-group">
              <input
                type="radio"
                id="archived"
                name="status"
                value="archived"
                checked={active === "archived"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="archived" className="radio-labels">
                Archived
              </label>
            </div>
          </div>
        </form>
        <h2>Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handlePhotoChange}
        />
        <button
          onClick={uploadImage}
          style={{
            backgroundColor: "#C02222",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Upload Article
        </button>
      </div>
    </div>
  );
}

export default AddBlogs;
