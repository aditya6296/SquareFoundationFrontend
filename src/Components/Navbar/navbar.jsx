import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import Signup from "../SignUp/signup";
import Login from "../LoginPage/login";
import footerHeaderlineImg from "/src/assets/line.svg";

function Navbar({ userInfo, manageLogin }) {
  const { isAuthenticated, email } = userInfo;
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setisLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
  };

  const handleLoginOpen = () => {
    setisLoginOpen(true);
    // navigate("/login");
  };

  const handleSignUpSuccess = () => {
    setIsSignUpOpen(false); // Close the signup popup
    setisLoginOpen(true); // Open the login popup
  };

  return (
    <>
      {/* <nav className={styles.navbar}> */}
      <div className={styles.nav_container}>
        <div className={styles.nav_header}>
          {" "}
          <h1 className={styles.nav_header_name}>
            SQU{" "}
            <svg
              className={styles.nav_header_logo}
              width="32"
              height="30"
              viewBox="0 0 44 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M1 26.9747L21.962 1L42.924 29.2532L19.6835 37L1 26.9747Z"
                fill="white"
              />{" "}
              <path
                d="M21.962 1L1 26.9747L19.6835 37M21.962 1L42.924 29.2532L19.6835 37M21.962 1L19.6835 37"
                stroke="black"
                strokeWidth="0.911392"
              />{" "}
            </svg>
            RE
          </h1>
          <div className={styles.nav_header_down_logo}>
            <img src={footerHeaderlineImg} />
            <span>FOUNDATION</span>
            <img src={footerHeaderlineImg} />
          </div>
        </div>
        <div></div>
        {isAuthenticated ? (
          <div>
            <label className={styles.nav_header_user}>Hello! {email}</label>
            <Link to="/dash">Go to DashBoard</Link>
          </div>
        ) : (
          <div className={styles.nav_signup_container}>
            <button className={styles.nav_login} onClick={handleLoginOpen}>
              Login
            </button>
            <button className={styles.nav_signup} onClick={handleSignUpOpen}>
              Sign Up
            </button>
          </div>
        )}
      </div>
      {/* </nav> */}

      {isSignUpOpen ? (
        <div className={styles.model}>
          <div className={styles.model_2}>
            <Signup
              setIsSignUpOpen={setIsSignUpOpen}
              handleSignUpSuccess={handleSignUpSuccess}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {isLoginOpen ? (
        <div className={styles.model_3}>
          <div className={styles.model_4}>
            <Login
              setisLoginOpen={setisLoginOpen}
              manageLogin={manageLogin}
              setIsSignUpOpen={setIsSignUpOpen}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

Navbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
  manageLogin: PropTypes.func.isRequired,
};

export default Navbar;
