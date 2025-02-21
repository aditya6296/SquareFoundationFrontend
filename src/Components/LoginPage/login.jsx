import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import styles from "./login.module.css";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners"; // Import spinner
import useOtp from "../../hooks/useOtp";
import { toast } from "react-toastify";
import useForgotPassword from "../../hooks/useForgotPassword";

function Login({ manageLogin, setisLoginOpen, setIsSignUpOpen }) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { login, loading } = useLogin({ manageLogin });
  const [newOtp, setNewOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [showLoginPop, setShowLoginPop] = useState(false);

  // const openLoginPopup = () => showLoginPop(true);

  const { sendOtp } = useOtp({ setIsOtpSent });
  const { forgotCreatePassword } = useForgotPassword();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    login({ email, password });
  };

  const handleClose = () => {
    setisLoginOpen(false);
  };

  const handleSignupOpen = () => {
    setisLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const forgotPassEmail = e.target[0].value;
    console.log("forgotPassEmail", forgotPassEmail);
    // sendOtp({ email: forgotPassEmail, isResnd: false });
    // setIsOtpSent(true);
    // alert("Hi forgot");

    const response = await fetch(
      "http://localhost:2200/api/v1/auth/check-email",
      {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPassEmail }),
      }
    );
    const data = await response.json();
    console.log("chck email data ---->", data);

    if (data.exists) {
      sendOtp({ email: forgotPassEmail, isResnd: false });
      setIsOtpSent(true);
    } else {
      toast.error("This email is not registered. Please sign up.");
    }
  };

  const handleCreateNewPassword = () => {
    forgotCreatePassword({
      email: isEmail, // error
      otp: newOtp,
      password: newPassword,
    });
  };

  // const handleResetPaaaword = () => {
  //   sendOtp({ isEmail, isResnd: false });
  //   setIsOtpSent(true);
  // };

  return (
    <>
      <div className={styles.login_main_container}>
        {loading && (
          <div className={styles.loading_overlay}>
            <FadeLoader size={50} color="white" />
          </div>
        )}

        <div className={styles.signup_page_image_container}>
          <div className={styles.signup_page_image_text_container}>
            <h4>Square Foundation</h4>
            <div className={styles.signup_page_image_title_container}>
              <div className={styles.signup_page_image_title_first_container}>
                {" "}
                <img
                  src="/src/assets/signup_images/signup_right.svg"
                  className={styles.signup_page_image_right_svg}
                />
                <p>1 Lakh Student Register</p>
              </div>
              <div className={styles.signup_page_image_title_first_container}>
                {" "}
                <img
                  src="/src/assets/signup_images/signup_right.svg"
                  className={styles.signup_page_image_right_svg}
                />
                <p>96% Scholarship Approved</p>
              </div>
              <div className={styles.signup_page_image_title_first_container}>
                {" "}
                <img
                  src="/src/assets/signup_images/signup_right.svg"
                  className={styles.signup_page_image_right_svg}
                />
                <p>70+ No Of Scholarsips</p>
              </div>
            </div>
          </div>
          <div className={styles.signup_page_women_image_container}>
            <img
              src="/src/assets/signup_images/signup_women_image.svg"
              className={styles.signup_page_image}
            />
          </div>
        </div>

        {isForgotPassword ? (
          <>
            <div className={styles.login_from_header_txt}>
              <h3>Forgot Password</h3>
              <p>Enter your email to reset your password</p>
            </div>
            <form
              onSubmit={handleForgotPassword}
              className={styles.form_container}
            >
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={isEmail}
                  onChange={(e) => setIsEmail(e.target.value)}
                  required
                />
              </div>
              <>
                {isOtpSent ? (
                  <div>
                    <div>
                      <label>Enter Otp</label>
                      <input
                        type="string"
                        placeholder="Enter Your OTP"
                        onChange={(e) => setNewOtp(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Enter New Password</label>
                      <input
                        type="string"
                        placeholder="Create new Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
              {isOtpSent ? (
                <button type="button" onClick={handleCreateNewPassword}>
                  Create Password
                </button>
              ) : (
                <button type="submit">Reset Password</button>
              )}
              {/* <button type="submit">Reset Password</button> */}
              <button type="button" onClick={() => setIsForgotPassword(false)}>
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <div className={styles.login_page_main_container}>
            <div className={styles.login_page_form_container}>
              <div className={styles.signup_page_from_btn}>
                <button onClick={handleClose}>
                  <span className="material-icons" id="rev_prev_btn">
                    arrow_back
                  </span>
                </button>
              </div>
              <div className={styles.login_from_header_txt}>
                <h3>Login with your email</h3>
              </div>
              <form onSubmit={handleLogin} className={styles.form_container}>
                <div>
                  {" "}
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className={styles.forgot_password_btn}
                    onClick={() => setIsForgotPassword(true)}
                  >
                    Forgot Password
                  </button>
                </div>
                <button>Countinue</button>
                <div>
                  <p>
                    Don't have an account?{" "}
                    <button onClick={handleSignupOpen}>Signup</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Login.propTypes = {
  manageLogin: PropTypes.func.isRequired,
  setisLoginOpen: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setIsSignUpOpen: PropTypes.func.isRequired,
};

export default Login;
