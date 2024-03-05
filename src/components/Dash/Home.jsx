import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Dash/Home.css";
import "./Home.css";
import {
  useToast,
  Box,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { AdminState } from "../context/context";

function HomeDashboard() {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState();
  const [sqft, setSqft] = useState();
  const [address, setaddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [seotitle, Setseotitle] = useState("");
  const [seodescription, Setseodescription] = useState("");
  const [urlparams, Seturlparams] = useState("");
  const [illumination, setillumination] = useState("");
  const [subcategory, Setsubcategory] = useState("");
  const [description, setdescription] = useState("");
  const [urlcategory, seturlcategory] = useState("");
  const [title, setTitle] = useState("");
  const [endvalue, setendvalue] = useState("");
  const toast = useToast();
  const { user, setUserAgain, API_BASE_URL } = AdminState();
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(stateDistricts[state] || []);
  };
  const handleDistrictChange = (event) => {
    const selectedDistrictValue = event.target.value;
    setSelectedDistrict(selectedDistrictValue);
  };

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
  // states and district array
  const states = [
    "Select State",
    "Andra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadar and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Pondicherry",
  ];

  const stateDistricts = {
    "Andra Pradesh": ["Anantapur", "Chittoor", "East Godavari" /* ... */],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley" /* ... */],
    Assam: ["Baksa", "Barpeta", "Biswanath" /* ... */],
    Bihar: ["Araria", "Arwal", "Aurangabad" /* ... */],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],

    Goa: ["North Goa", "South Goa"],

    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],

    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],

    "Himachal Pradesh": [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],

    "Jammu and Kashmir": [
      "Jammu",
      "Samba",
      "Kathua",
      "Udhampur",
      "Rajouri",
      "Poonch",
      "Anantnag",
      "Kulgam",
      "Pulwama",
      "Shopian",
      "Srinagar",
      "Budgam",
      "Ganderbal",
    ],

    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],

    Karnataka: [
      "Bagalkot",
      "Ballari",
      "Belagavi",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",
      "Uttara Kannada",
      "Vijayapura",
      "Yadgir",
    ],

    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],

    "Madhya Pradesh": [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],

    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],

    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],

    Mizoram: [
      "Aizawl",
      "Champhai",
      "Hnahthial",
      "Khawzawl",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],

    Nagaland: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],

    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundargarh",
    ],

    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sangrur",
      "Shaheed Bhagat Singh Nagar",
      "Sri Muktsar Sahib",
      "Tarn Taran",
    ],

    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],

    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],

    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kancheepuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],

    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhupalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal Malkajgiri",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal Rural",
      "Warangal Urban",
      "Yadadri Bhuvanagiri",
    ],

    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Ayodhya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddh Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kushinagar",
      "Lakhimpur Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Prayagraj",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shrawasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],

    "West Bengal": [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Bardhaman",
      "Paschim Medinipur",
      "Purba Bardhaman",
      "Purba Medinipur",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur",
    ],

    "Andaman and Nicobar Islands": [
      "Nicobar",
      "North and Middle Andaman",
      "South Andaman",
    ],

    Chandigarh: ["Chandigarh"],

    "Dadar and Nagar Haveli": ["Dadra and Nagar Haveli"],

    "Daman and Diu": ["Daman", "Diu"],

    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],

    Lakshadweep: ["Lakshadweep"],

    Pondicherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  };
  const Illumination = [
    "Select illumination",
    "LED",
    "Back Lit",
    "Non Lit",
    "Front Lit",
  ];
  const Subcategory = [
    "Select Subcategory",
    "DIGITAL",
    "UNIPOLE",
    "BILLBOARD",
    "DIGITAL BILLBOARD",
    "OOH",
  ];
  const urlcategorydata = [
    "Select URL category",
    "outdoor-advertising-agency",
    "metro-advertising-agency",
    "airport-branding-advertising-agency",
    "inflight-branding-advertising-agency",
    "mall-branding-advertising-agency",
    "transit-media-advertising-agency",
  ];
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const uploadBlogData = async (blogData) => {
    console.log("Blog uploaded:", blogData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        blogData
      );
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
      // setSelectedCategories("");
      setPhoto(null);
      Setseotitle("");
      Setseodescription("");
      Seturlparams("");
      setSqft();
      setdescription("");
      setillumination("");
      setPrice("");
      setSqft("");
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
        address,
        title,
        category: selectedCategories,
        image: secureUrl,
        seotitle,
        heightwidth: seodescription,
        state: selectedState,
        price,
        city: selectedDistrict,
        seodesc: urlparams,
        illumination,
        desc: description,
        totalsqft: sqft,
        subcat: subcategory,
        url: endvalue,
        urlcat: urlcategory,
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
    } else if (field === "urlparams") {
      Seturlparams(value);
    } else if (field === "price") {
      setPrice(value);
    } else if (field === "sqft") {
      setSqft(value);
    } else if (field === "illumination") {
      setillumination(value);
    } else if (field === "description") {
      setdescription(value);
    } else if (field === "subcategory") {
      Setsubcategory(value);
    } else if (field === "address") {
      setaddress(value);
    } else if (field === "endvalue") {
      setendvalue(value);
    } else if (field === "urlcategory") {
      seturlcategory(value);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    setSelectedCategories(selectedCategoryName);

    // Update available subcategories based on all selected categories
    // const selectedSubcategories = categories
    //   .filter((category) => updatedSelectedCategories.includes(category.name))
    //   .map((category) => category.subcategory)
    //   .flat(); // Flatten the array of subcategories

    // setAvailableSubcategories(selectedSubcategories);
  };

  // const handleSubcategoryChange = (e) => {
  //   const selectedSubcategory = e.target.value;
  //   if (e.target.checked) {
  //     setSelectedSubcategories([...selectedSubcategories, selectedSubcategory]);
  //   } else {
  //     setSelectedSubcategories(
  //       selectedSubcategories.filter((subcat) => subcat !== selectedSubcategory)
  //     );
  //   }
  // };
  return (
    <Box
      width="100%"
      margin="0 auto"
      padding="20px"
      backgroundColor="#f8f8f8"
      border="1px solid #ddd"
      borderRadius="5px"
    >
      <Box className="form-content">
        <Text fontSize="2xl" mb="20px" textAlign="center" fontWeight="700">
          Upload a Product
        </Text>
        <form>
          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Category:
            </label>
            <select
              value={selectedCategories}
              onChange={handleCategoryChange}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </Flex>
          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Subcategory:
            </label>
            <select
              value={subcategory}
              onChange={(e) => handleInputChange(e, "subcategory")}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              {Subcategory.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Flex>
          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              URL Category:
            </label>
            <select
              value={urlcategory}
              onChange={(e) => handleInputChange(e, "urlcategory")}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              {urlcategorydata.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Flex>
          <Input
            type="text"
            id="title"
            placeholder="Enter Address"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={address}
            onChange={(e) => handleInputChange(e, "address")}
          />
          <Input
            type="text"
            id="title"
            placeholder="Enter Title"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={title}
            onChange={(e) => handleInputChange(e, "title")}
          />
          <Input
            type="number"
            id="title"
            placeholder="Enter Price"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={price}
            onChange={(e) => handleInputChange(e, "price")}
          />
          <Input
            type="number"
            id="title"
            placeholder="Enter Square Feet"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={sqft}
            onChange={(e) => handleInputChange(e, "sqft")}
          />

          <Input
            type="text"
            id="seodescription"
            placeholder="Enter Width x Height"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={seodescription}
            onChange={(e) => handleInputChange(e, "seodescription")}
          />
          <Textarea
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => handleInputChange(e, "description")}
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            size="lg"
            resize="vertical"
            minHeight="100px"
            maxLength={200}
          />
          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Illumination:
            </label>
            <select
              value={illumination}
              onChange={(e) => handleInputChange(e, "illumination")}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              {Illumination.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Flex>
          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              State:
            </label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Flex>

          <Flex mb="4" alignItems="center">
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              City:
            </label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              style={{
                padding: "8px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">select City </option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </Flex>
          <Input
            type="text"
            id="title"
            placeholder="Enter Seo Title"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={seotitle}
            onChange={(e) => handleInputChange(e, "seotitle")}
          />
          <Input
            type="text"
            id="title"
            placeholder="Enter Seo Description"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={urlparams}
            onChange={(e) => handleInputChange(e, "urlparams")}
          />
          <Input
            type="text"
            id="title"
            placeholder="Enter URL"
            width="100%"
            padding="10px"
            margin="10px 0"
            border="1px solid #ccc"
            borderRadius="3px"
            value={endvalue}
            onChange={(e) => handleInputChange(e, "endvalue")}
          />
        </form>

        <Text fontSize="2xl" textAlign="center">
          Upload Image
        </Text>
        <Input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handlePhotoChange}
          size="lg"
        />

        <Button
          onClick={uploadImage}
          backgroundColor="#C02222"
          color="#fff"
          border="none"
          padding="10px 20px"
          borderRadius="3px"
          cursor="pointer"
        >
          Upload Article
        </Button>
      </Box>
    </Box>
  );
}

export default HomeDashboard;
