import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import styles from "./login.module.css";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners"; // Import spinner
import useOtp from "../../hooks/useOtp";
import { toast } from "react-toastify";
import useForgotPassword from "../../hooks/useForgotPassword";
import rightSvg from "../../assets/signup_images/signup_pass_right.svg";
import wrongSvg from "../../assets/signup_images/signup_pass_wrong.svg";

function Login({
  manageLogin,
  setisLoginOpen,
  setIsSignUpOpen,
  handleSignUpSuccess,
}) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { login, loading } = useLogin({ manageLogin });
  const [newOtp, setNewOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState(false);

  // const [showLoginPop, setShowLoginPop] = useState(false);

  const { sendOtp } = useOtp({ setIsOtpSent });
  const { forgotCreatePassword } = useForgotPassword({ handleSignUpSuccess });

  // Password criteria

  const [passwordCriteria, setPasswordCriteria] = useState({
    validPassword: false,
    upper: false,
    lower: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    const newCriteria = {
      validPassword: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
    setPasswordCriteria(newCriteria);
    console.log("validate password ==> ", newCriteria);
  };

  const criteriaList = [
    { key: "validPassword", label: "At least 8 characters" },
    { key: "upper", label: "At least one uppercase letter" },
    { key: "lower", label: "At least one lowercase letter" },
    { key: "number", label: "At least one number" },
    { key: "specialChar", label: "At least one special character" },
  ];

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
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/check-email`,
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
    if (
      !passwordCriteria.validPassword ||
      !passwordCriteria.upper ||
      !passwordCriteria.lower ||
      !passwordCriteria.number ||
      !passwordCriteria.specialChar
    ) {
      toast.error("Password does not meet the required criteria!");
      return;
    }
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

        <div className={styles.login_page_image_container}>
          <div className={styles.login_page_image_text_container}>
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
          <div className={styles.login_page_women_image_container}>
            <img
              src="/src/assets/signup_images/signup_women_image.svg"
              className={styles.signup_page_image}
            />
          </div>
        </div>

        {isForgotPassword ? (
          <div className={styles.forgotPassMainContainer}>
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
                        type={visible ? "text" : "password"}
                        placeholder="Create new Password"
                        className={`${styles.inputField} ${
                          !passwordCriteria.validPassword && newPassword
                            ? styles.inputError
                            : ""
                        }`}
                        value={newPassword}
                        onChange={(e) => {
                          const password = e.target.value;
                          setNewPassword(password);
                          validatePassword(password);
                        }}
                      />
                      <button
                        type="button"
                        className={styles.visibilityToggle}
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? (
                          <img
                            src="/src/assets/signup_images/visibility_on.svg"
                            alt="Show"
                          />
                        ) : (
                          <img
                            src="/src/assets/signup_images/visibility_off.svg"
                            alt="Hide"
                          />
                        )}
                      </button>
                    </div>

                    <>
                      {criteriaList.map(({ key, label }) => (
                        <div
                          key={key}
                          className={styles.login_page_input_password_match_svg}
                        >
                          {passwordCriteria[key] ? (
                            <img src={rightSvg} alt="Validation icon" />
                          ) : (
                            <img src={wrongSvg} alt="Validation icon" />
                          )}
                          <p>{label}</p>
                        </div>
                      ))}
                    </>
                  </div>
                ) : (
                  ""
                )}
              </>
              {isOtpSent ? (
                <button type="button" onClick={handleCreateNewPassword} className={styles.create_pass_btn}>
                  Create Password
                </button>
              ) : (
                <button type="submit" className={styles.create_pass_btn}>Reset Password</button>
              )}
              {/* <button type="submit">Reset Password</button> */}
              <button type="button" onClick={() => setIsForgotPassword(false)} className={styles.back_login_btn}>
                Back to Login
              </button>
            </form>
          </div>
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
                <div className={styles.emailContainer}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                  />
                </div>

                <div className={styles.passwordContainer}>
                  <label>Password</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type={visible ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className={styles.passwordInput}
                    />
                    <button
                      type="button"
                      className={styles.visibilityToggle}
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <img
                          src="/src/assets/signup_images/visibility_on.svg"
                          alt="Show"
                        />
                      ) : (
                        <img
                          src="/src/assets/signup_images/visibility_off.svg"
                          alt="Hide"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={styles.forgot_password_btn}
                    onClick={() => setIsForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button className={styles.continue_btn}>Countinue</button>
                <div>
                  <p>
                    Don't have an account?
                    <button
                      className={styles.signUp_btn}
                      onClick={handleSignupOpen}
                    >
                      Signup
                    </button>
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
