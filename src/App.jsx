import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./components/Dashboard";
import ListAnnoucenment from "./views/ListAnnoucenment";
import AddAnnoucenment from "./views/AddAnnoucenment";
import ListingGallery from "./views/ListingGallery";
import AddGallery from "./views/AddGallery";
import ListingPage from "./views/ListingPage";
import CreatePage from "./views/CreatePage";
import ListingArticle from "./views/ListingArticle";
import AddArticle from "./views/AddArticle";
import AddCategory from "./views/AddCategory";
import ListingCategory from "./views/ListingCategory";
import AddTopic from "./views/AddTopic";
import ListingTopic from "./views/ListingTopic";
import AddDepartment from "./views/AddDepartment"
import ListingDepartment from "./views/ListingDepartment"
import AddCourse from "./views/AddCourse";
import ListingCourse from "./views/ListingCourse";
import AddCurriculum from "./views/AddCurriculum";
import ListingCurriculum from "./views/ListingCurriculum";

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          {/* Dashboard route */}
          <Route path="/" element={<Dashboard />} />

          {/* Announcements route */}
          <Route path="/announcements" element={<ListAnnoucenment />} />
          <Route path="/addannouncements" element={<AddAnnoucenment />} />


          {/* Gallery route */}
          <Route path="/gallery" element={<ListingGallery />} />
          <Route path="/addgallery" element={<AddGallery />} />


          {/* Page route */}
          <Route path="/Listingpage" element={<ListingPage />} />
          <Route path="/addpage" element={<CreatePage />} />


          {/* Article route */}
          <Route path="/Listingarticle" element={<ListingArticle />} />
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/articles/edit/:id" element={<AddArticle />} />

          {/* Category route */}
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/listingcategory" element={<ListingCategory />} />
          <Route path="/categories/edit/:id" element={<AddCategory />} />


          {/* Topic route */}
          <Route path="/addtopic" element={<AddTopic />} />
          <Route path="/listingtopic" element={<ListingTopic />} />
          <Route path="/topics/edit/:id" element={<AddTopic />} />




          {/* Department route */}
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/listingdepartment" element={<ListingDepartment />} />
          <Route path="/departments/edit/:id" element={<AddDepartment />} />

          {/* Courses route */}
          <Route path="/addcourses" element={<AddCourse />} />
          <Route path="/listingcourses" element={<ListingCourse />} />
          <Route path="/courses/edit/:id" element={<AddCourse />} />


          {/* curriculum route */}
          <Route path="/addcurriculum" element={<AddCurriculum />} />
          <Route path="/listingcurriculum" element={<ListingCurriculum />} />




        </Routes>
      </RootLayout>
    </Router>
  );
}
