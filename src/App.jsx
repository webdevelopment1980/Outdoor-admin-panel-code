import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import SidebarWithHeader from "./components/SidebarWithHeader/SidebarWithHeader";
import HomeDashboard from "./components/Dash/Home";
import Article from "./components/UserManagment/UsersTable";
import TabsSalesPerson from "./components/he/TabsSalesPerson";
import AddCategoryAndSubcategoryForm from "./components/makingcharges/addCatSubcatform.js";
import PremiumCharges from "./components/Premium/premium";
import Edit from "./components/editArticle/Edit";
import AddBlogs from "./components/Add-blogs/AddBlogs.jsx";
import ManageBlogs from "./components/manage-blogs/Manage-blogs.jsx";
import EditProduct from "./components/editProducts/Edit.jsx";
import AdminPanelHomePage from "./components/Dash/Homepage.jsx";
import Citystate from "./components/states-city/Data.jsx";
import AddStateCity from "./components/states-city/AddData.jsx";
import UserQuery from "./components/queries/Queries.jsx";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    setTimeout(() => {
      setInitialLoad((prev) => false);
    }, 1000);
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return (
    <>
      {initialLoad ? (
        <>Loading...</>
      ) : (
        <>
          {loggedIn ? (
            <SidebarWithHeader setLoggedIn={setLoggedIn}>
              <Routes>
                {loggedIn ? (
                  <>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/articles" element={<Article />} />
                    <Route path="/category" element={<TabsSalesPerson />} />
                    <Route path="/Backup" element={<PremiumCharges />} />
                    {/* <Route path="/singlearticle" element={<Fullnews />} /> */}
                    <Route path="/editProduct/:id" element={<EditProduct />} />
                    <Route
                      path="/addcategory"
                      element={<AddCategoryAndSubcategoryForm />}
                    />
                    <Route path="/editBlog/:id" element={<Edit />} />
                    <Route path="/Addblogs" element={<AddBlogs />} />
                    <Route path="/ManageBlogs" element={<ManageBlogs />} />
                    <Route path="/HomePage" element={<AdminPanelHomePage />} />
                    <Route path="/City" element={<Citystate />} />
                    <Route path="/AddCity" element={<AddStateCity />} />
                    <Route path="/quries" element={<UserQuery />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="*"
                      element={<Login setLoggedIn={setLoggedIn} />}
                    />{" "}
                  </>
                )}
              </Routes>
            </SidebarWithHeader>
          ) : (
            <Routes>
              <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
