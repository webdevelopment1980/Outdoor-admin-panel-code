import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import { Center } from "@chakra-ui/react";

function HomeDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [active, setActive] = useState("");
  const [seotitle, Setseotitle] = useState("");
  const [seodescription, Setseodescription] = useState("");

  const handleInputChange = (e, field) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "description") setDescription(e.target.value);
    if (field === "category") setCategory(e.target.value);
    if (field === "status") setActive(e.target.value);
    if (field === "seotitle") Setseotitle(e.target.value);
    if (field === "seodescription") Setseodescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadBlogData = async (blogData) => {
    try {
      const response = await axios.post(
        "https://news-so1v.onrender.com/api/article",
        blogData
      );
      console.log("Blog uploaded:", response.data);
      clearForm();
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
    console.log(blogData);
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPhoto(null);
    setActive("");
    Setseotitle("");
    Setseodescription("");
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
        description,
        category,
        photo: secureUrl,
        status: active,
        seotitle,
        seodescription,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
    }
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    uploadBlogData({
      title,
      description,
      category,
    });
  };

  return (
    <div className="form-container">
      <h2>Upload a Article</h2>
      <form>
        <input
          type="text"
          placeholder="Blog Title"
          className="input-field"
          value={title}
          onChange={(e) => handleInputChange(e, "title")}
        />
        <textarea
          placeholder="Blog Description"
          className="input-field"
          value={description}
          onChange={(e) => handleInputChange(e, "description")}
        />
        <input
          type="text"
          placeholder="Blog Category"
          className="input-field"
          value={category}
          list="categories"
          onChange={(e) => handleInputChange(e, "category")}
        />
        <datalist id="categories">
          <option value="चुनाव 2023" />
          <option value="वायरल न्यूज़" />
          <option value="एजुकेश" />
          {/* Add more suggested categories here */}
        </datalist>
        <input
          type="text"
          placeholder="Blog Status"
          className="input-field"
          value={active}
          onChange={(e) => handleInputChange(e, "status")}
        />
        <input
          type="text"
          placeholder="SEO title"
          className="input-field"
          value={seotitle}
          onChange={(e) => handleInputChange(e, "seotitle")}
        />
        <input
          type="text"
          placeholder="SEO Description"
          className="input-field"
          value={seodescription}
          onChange={(e) => handleInputChange(e, "seodescription")}
        />
      </form>

      <h2>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        className="file-input"
        onChange={handlePhotoChange}
      />
      <button onClick={uploadImage} className="button">
        Upload Article
      </button>
    </div>
  );
}

export default HomeDashboard;
