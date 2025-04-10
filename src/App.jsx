import { BrowserRouter, Link, Route, Routes } from "react-router";

import "./App.css";
import Homepage from "./Components/HomePage/homepage";
import ViewDetails from "./Components/ViewDetails/viewDetails";
import DashBoard from "./Components/DashBoard/dashBoard";
import { useState } from "react";
import ScholarshipForm from "./Components/Scholarship_Form/ScholarshipForm";
import useIsAuthorized from "./hooks/useIsAuthurized";
import DashForm from "./Components/Dash-form/dashForm";
import PrivateRoute from "./hooks/privateRoute";
// import AdminLogin from "./Components/Admin/adminLogin";
// import AdminDashboard from "./Pages/AdminDashboard/adminDashboard";
// import PostScholarship from "./Pages/Admin/PostScholarship/postScholarship";
// import ReviewApplications from "./Pages/Admin/ReviewApplication/reviewApplications";
// import ManageUsers from "./Pages/Admin/ManageUsers/manageUsers";
// import Settings from "./Pages/Admin/Settings/settings";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setisLoginOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    email: "",
  });
  useIsAuthorized({ setUserInfo, setIsLoading });

  const manageLogin = ({ email }) => {
    console.log("user email >>>>>", email);
    setUserInfo({
      isAuthenticated: true,
      email: email,
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                userInfo={userInfo}
                manageLogin={manageLogin}
                isLoginOpen={isLoginOpen}
                setisLoginOpen={setisLoginOpen}
              />
            }
          />
          <Route path="/detail" element={<ViewDetails />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute userInfo={userInfo} isLoading={isLoading}>
                <DashBoard setUserInfo={setUserInfo} />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard/form" element={<ScholarshipForm />} />
          <Route path="/form" element={<DashForm />} />

          <Route
            path="*"
            element={
              <div>
                NOT FOUND <Link to="/">Go to the Home Page</Link>
              </div>
            }
          />
          {/* <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/post-scholarship" element={<PostScholarship />} />
          <Route
            path="/admin/review-applications"
            element={<ReviewApplications />}
          />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/settings" element={<Settings />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
