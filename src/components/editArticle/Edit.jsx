import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import "./edit.css"; // Import your edit component-specific styles
import { useToast } from "@chakra-ui/react";
import { AdminState } from "../context/context";

function EditArticle() {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [status, setStatus] = useState("published");
  const [seotitle, setSeotitle] = useState("");
  const [seodescription, setSeodescription] = useState("");
  const [engtitle, setEngtitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { id } = useParams();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blog/${id}`);
        const articleData = response.data;

        setTitle(articleData.title);
        setDescription(articleData.description);
        setPhoto(articleData.photo);
        // setCategory(articleData.category);
        // setSubcategory(articleData.subcategory);
        setStatus(articleData.status);
        setSeotitle(articleData.seotitle);
        setSeodescription(articleData.seodescription);
        setEngtitle(articleData.engtitle);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [id]);

  const handleSaveChanges = async (Data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/blog/${id}`, Data);
      toast({
        title: "Updated",
        description: "blog updated Successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating article:", error);
      toast({
        title: "Updated",
        description: "error updating blog.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE_URL}/api/article/category/get`)
  //     .then((response) => {
  //       setCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //     });
  // }, []);

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
    //  remove nested array and make it a sinngle array
    //  const nestedArray = [1, 2, [3, 4], [5, 6, [7, 8]]];
    // const flatArray = nestedArray.flat(Infinity);
    // console.log(flatArray) //[1,2,3,4,5,6,7,8]

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
      handleSaveChanges({
        title,
        description,
        photo: secureUrl,
        // category: selectedCategories,
        // subcategory: selectedSubcategories,
        status,
        seotitle,
        seodescription,
        engtitle,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
      toast({
        title: "Updated",
        description: "error updating Image Cloudinary.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="desc" htmlFor="quillDescription">
              Blog Description
            </label>
            <ReactQuill
              style={{ height: "400px", marginBottom: "50px" }}
              className="quill"
              value={description}
              onChange={setDescription}
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

          <div className="form-group">
            <label htmlFor="seotitle">SEO Title</label>
            <input
              type="text"
              id="seotitle"
              placeholder="SEO Title"
              className="input-field"
              value={seotitle}
              onChange={(e) => setSeotitle(e.target.value)}
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
              onChange={(e) => setSeodescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="urlparams">URL Params</label>
            <input
              type="text"
              id="urlparams"
              placeholder="URL Params"
              className="input-field"
              value={engtitle}
              onChange={(e) => setEngtitle(e.target.value)}
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
                checked={status === "published"}
                onChange={() => setStatus("published")}
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
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
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
                checked={status === "archived"}
                onChange={() => setStatus("archived")}
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
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="button" onClick={uploadImage} className="button">
          Save edited Changes
        </button>
      </div>
    </div>
  );
}

export default EditArticle;
