import { BrowserRouter, Link, Route, Routes } from "react-router";

import "./App.css";
import Homepage from "./Components/HomePage/homepage";
import Login from "./Components/LoginPage/login";
import Signup from "./Components/SignUp/signup";
import ViewDetails from "./Components/ViewDetails/viewDetails";
import DashBoard from "./Components/DashBoard/dashBoard";
import SuccessFully from "./Components/SuccessPopUp/successFully";
import { useState } from "react";
// import ScholarshipStatus from "./Components/Dash_application_status/ScholarshipStatus";
import ScholarshipForm from "./Components/Scholarship_Form/ScholarshipForm";
import useIsAuthorized from "./hooks/useIsAuthurized";

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    email: "",
  });
  useIsAuthorized({ setUserInfo });

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
            element={<Homepage userInfo={userInfo} manageLogin={manageLogin} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detail" element={<ViewDetails />} />
          <Route path="/dash" element={<DashBoard />} />
          <Route path="/form" element={<ScholarshipForm />} />
          <Route path="/success" element={<SuccessFully />} />
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
