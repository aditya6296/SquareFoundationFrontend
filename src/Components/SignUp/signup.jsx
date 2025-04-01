import { useEffect, useState } from "react";
import styles from "./signup.module.css";
import useSignUp from "../../hooks/useSignUp";
import useOtp from "../../hooks/useOtp";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners"; // Import spinner
import rightSvg from "../../assets/signup_images/signup_pass_right.svg";
import wrongSvg from "../../assets/signup_images/signup_pass_wrong.svg";
import visibilitySvg from "../../assets/signup_images/visibility_on.svg";
import unVisibleSvg from "../../assets/signup_images/visibility_off.svg";
import rightSignSvg from "/src/assets/signup_images/signup_right.svg";
import signUpFemaleSvg from "/src/assets/signup_images/signup_women_image.svg";

// import SendverifyEmail from "../../hooks/verifyEmail";

function Signup({ setIsSignUpOpen, handleSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

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

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtp, setIsOtp] = useState("");
  const [otpSentEmail, setOtpSentEmail] = useState(""); // for check already sent

  const { registerUser } = useSignUp({ handleSignUpSuccess });
  const { sendOtp, loading } = useOtp({ setIsOtpSent });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    // const password = isPassword;

    const isvalidPassword = Object.values(passwordCriteria).every(Boolean);

    if (!email) {
      toast.error("Please enter a valid email !");
      return;
    }

    if (!isvalidPassword) {
      toast.error("Please enter meet all password requirements !");
      return;
    }

    if (email === otpSentEmail) {
      setIsOtpSent(true); // Show otp inbox if otp already sent
      return;
    }

    setIsOtpSent(false); // new changes

    sendOtp({ email, isResnd: false }).then(() => {
      setOtpSentEmail(email);
      setIsOtpSent(true);
    });

    setEmail(email);

    // Step 1: Register the user
    // registerUser({ email, password: isPassword }).then((registerResponse) => {
    //   console.log(`========== ${registerResponse}`);
    //   if (registerResponse.status === "Sucsess") {
    //     // Registration successful, return sendOtp() promise
    //     return sendOtp({ email })
    //       .then((otpResponse) => {
    //         console.log(otpResponse);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //         // alert(error || "An error occurred. Please try again.");
    //       });
    //   }
    // });

    // verifyEmail({
    //   email,
    //   password,
    // });

    // sendOtp({ email, isResnd: false });
  };

  const handleVerify = () => {
    registerUser({ email, password: isPassword, otp: isOtp });
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      sendOtp({ email, isResnd: true });
      setResendTimer(60);
    }
  };

  const handleOtp = (event) => {
    const newOtp = event.target.value;
    console.log("newOtp", newOtp);
    setIsOtp(newOtp);
  };

  // const handlePassword = (event) => {
  //   const newPassword = event.target.value;
  //   console.log(newPassword);
  //   setIsPassword(newPassword);

  //   const passwordRegex =
  //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   setValidPassword(passwordRegex.test(newPassword));
  //   // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   setUpperPasswordMatch(/[A-Z]/.test(newPassword));
  //   setLowerPasswordMatch(/[a-z]/.test(newPassword));
  //   setNumberPasswordMatch(/\d/.test(newPassword));
  //   setSpecialCharPasswordMatch(/[@$!%*?&]/.test(newPassword));

  //   if (newPassword.lenght != 8) {
  //     console.log("password must have 8 char =>");
  //     return;
  //   }
  // };

  const handleClose = () => {
    setIsSignUpOpen(false);
    setOtpSentEmail(""); // Reset otp state when closing
  };

  return (
    <>
      <div className={styles.signup_page_main_container}>
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
                  src={rightSignSvg}
                  className={styles.signup_page_image_right_svg}
                />
                <p>1 Lakh Student Register</p>
              </div>
              <div className={styles.signup_page_image_title_first_container}>
                {" "}
                <img
                  src={rightSignSvg}
                  className={styles.signup_page_image_right_svg}
                />
                <p>96% Scholarship Approved</p>
              </div>
              <div className={styles.signup_page_image_title_first_container}>
                {" "}
                <img
                  src={rightSignSvg}
                  className={styles.signup_page_image_right_svg}
                />
                <p>70+ No Of Scholarsips</p>
              </div>
            </div>
          </div>
          <div className={styles.signup_page_women_image_container}>
            <img src={signUpFemaleSvg} className={styles.signup_page_image} />
          </div>
        </div>

        <div className={styles.signup_page_form_main_container}>
          <div className={styles.signup_page_from_btn}>
            <button onClick={handleClose}>
              <span className="material-icons" id="rev_prev_btn">
                arrow_back
              </span>
            </button>
          </div>

          <div className={styles.signup_page_from_header_txt}>
            <h3>Continue with your email</h3>
          </div>

          <div className={styles.signup_page_input_container}>
            <form
              className={styles.signup_page_form_container}
              onSubmit={handleSubmit}
            >
              <div className={styles.signup_page_input_email_container}>
                <label>Email Address</label>
                <input
                  disabled={isOtpSent && email === otpSentEmail} // if otp already sent
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className={styles.signup_page_input_email_container}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.passwordContainer}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    disabled={isOtpSent}
                    type={visible ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => {
                      validatePassword(e.target.value);
                      setIsPassword(e.target.value);
                    }}
                    className={styles.passwordInput}
                  />
                  <button
                    type="button"
                    className={styles.visibilityToggle}
                    onClick={() => setVisible(!visible)}
                  >
                    {/* {visible ? (
                      <img src={visibilitySvg} alt="Show" />
                    ) : (
                      <img src={unVisibleSvg} alt="Hide" />
                    )} */}
                    {visible ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div>
                {isOtpSent ? (
                  <div>
                    <p>Enter OTP</p>
                    <input
                      type="string"
                      placeholder="Enter OTP"
                      className={styles.signup_page_input_password_container}
                      onChange={handleOtp}
                    />
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0}
                    >
                      {resendTimer > 0
                        ? `Resend OTP (${resendTimer}s)`
                        : "Resend OTP"}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={styles.signup_page_input_password_match_container}
              >
                <h4>Password must have</h4>

                <>
                  {/* Not working if password match then close */}
                  {criteriaList.map(({ key, label }) => (
                    <div
                      key={key}
                      className={
                        passwordCriteria
                          ? styles.signup_page_input_password_match_svg
                          : styles.signup_page_input_password_checker
                      }
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
              {isOtpSent ? (
                <button
                  className={styles.signup_page_form_btn}
                  type="button"
                  onClick={handleVerify}
                >
                  Verify OTP
                </button>
              ) : (
                <button
                  className={styles.signup_page_form_btn}
                  onClick={() => setResendTimer(60)}
                >
                  Send OTP
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

Signup.propTypes = {
  setIsSignUpOpen: PropTypes.func.isRequired,
  handleSignUpSuccess: PropTypes.func.isRequired,
};

export default Signup;
