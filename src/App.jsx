import { BrowserRouter, Link, Route, Routes } from "react-router";

import "./App.css";
import Homepage from "./Components/HomePage/homepage";
import Login from "./Components/LoginPage/login";
import Signup from "./Components/SignUp/signup";
import ViewDetails from "./Components/ViewDetails/viewDetails";
import DashBoard from "./Components/DashBoard/dashBoard";
import SuccessFully from "./Components/SuccessPopUp/successFully";
import { useState } from "react";
import ScholarshipForm from "./Components/Scholarship_Form/ScholarshipForm";
import useIsAuthorized from "./hooks/useIsAuthurized";
import DashForm from "./Components/Dash-form/dashForm";
import PrivateRoute from "./hooks/privateRoute";
// import ScholarshipStatus from "./Components/Dash_application_status/ScholarshipStatus";

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
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login manageLogin={manageLogin} />} /> */}
          {/* <Route path="/dash/status" element={<ScholarshipStatus />} /> */}
          <Route
            path="*"
            element={
              <div>
                NOT FOUND <Link to="/">Go to the Home Page</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
