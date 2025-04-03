import { useState } from "react";
import styles from "./dashBoard.module.css";
import { Link } from "react-router-dom";
import ViewDetails from "../ViewDetails/viewDetails.jsx";
import useLogOut from "../../hooks/useLogOut.js";
import DashForm from "../Dash-form/dashForm.jsx";
import useScholarship from "../../hooks/useScholarship.js";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import useApplyNow from "../../hooks/useApplyNow.js";
import logoImg from "/src/assets/line.svg";
import homeIcon from "/src/assets/dashboard_images/home.svg";
import applicationIcon from "/src/assets/dashboard_images/application.svg";
import logoutIcon from "/src/assets/dashboard_images/logout.svg";
import scholarshipLogo from "/src/assets/dashboard_images/cardimg.svg";
import SuccessFully from "../SuccessPopUp/successFully.jsx";

// import useCheckForm from "../../hooks/useCheckForm.js";
// import { dashData } from "./dashboardData.js";
// import logout from "../../hooks/useLogOut.js";

function DashBoard({ setUserInfo }) {
  const [activeTab, setActiveTab] = useState("home");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applyData, setApplyData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scholarshipData, isLoading } = useScholarship();
  const {
    applyNow,
    isFormOpen,
    selectedScholarshipId,
    setIsFormOpen,
    checkResultData,
  } = useApplyNow();
  // console.log("checkResultData to dashboard : ", checkResultData);
  const { logout } = useLogOut(setUserInfo);

  const handleHome = () => {
    setActiveTab("home");
  };

  const handleApplication = async () => {
    setActiveTab("application");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/application-status`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const appliedData = await response.json();
      console.log("Application Status Result :", appliedData.AppliedData);
      setApplyData(appliedData.AppliedData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDetail = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Ensure it's executed properly
    } catch (error) {
      console.error("Logout failed:", error);
    }
    console.log("buttom clicked --> ");
  };

  // const handleCheckUserInfo = () => {
  // const { checkUserForm } = useCheckForm();
  // };

  const handleApplyNow = async (scholarshipId) => {
    try {
      await applyNow(scholarshipId);
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error applying:", error);
      toast.error("Failed to apply. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.dashboard_main_container}>
        <aside className={styles.dashboard_aside_container}>
          <div className={styles.dashboard_aside_header}>
            <Link
              to="/"
              className={styles.dashboard_aside_link}
              style={{ textDecoration: "none" }}
            >
              <h1 className={styles.dashboard_aside_header_name}>
                SQU{" "}
                <svg
                  className={styles.dashboard_aside_header_logo}
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
              <div className={styles.dashboard_aside_header_down_logo}>
                <img src={logoImg} />
                <span>Foundation</span>
                <img src={logoImg} />
              </div>
            </Link>
          </div>
          <div className={styles.dashboard_aside_link_box}>
            <div className={styles.dashboard_aside_link}>
              <button
                className={`${styles.dashboard_aside_link_home_btn} ${
                  activeTab == "home" ? styles.active : ""
                }`}
                onClick={handleHome}
              >
                {" "}
                <img
                  src={homeIcon}
                  className={styles.dashboard_aside_link_svg}
                />
                Homepage
              </button>

              <button
                className={`${styles.dashboard_aside_link_application_btn} ${
                  activeTab === "application" ? styles.active : ""
                }`}
                onClick={handleApplication}
              >
                <img
                  src={applicationIcon}
                  className={styles.dashboard_aside_link_svg}
                />
                Application
              </button>
            </div>
            <button
              className={styles.dashboard_aside_link_logout_btn}
              onClick={handleLogout}
            >
              <img
                src={logoutIcon}
                className={styles.dashboard_aside_link_svg}
              />
              LogOut
            </button>
          </div>
        </aside>

        <div className={styles.dashboard_page_scholarship_list_container}>
          {activeTab === "home" ? (
            <>
              <div>
                <h2 className={styles.dashboard_page_scholarship_list_text}>
                  Scholarship List
                </h2>
              </div>
              <div
                className={styles.dashboard_page_scholarship_list_header}
              ></div>

              <div className={styles.main_card}>
                {isLoading ? (
                  <div className={styles.loading_overlay}>
                    <FadeLoader size={50} color="white" />
                  </div> // Show loading
                ) : scholarshipData === null || scholarshipData.length === 0 ? (
                  <p>No data available !</p> // Show message if no data is available
                ) : (
                  scholarshipData.map((elem) => (
                    <div
                      className={styles.dashboard_page_scholarship_list_card}
                      key={elem.id}
                    >
                      {/* <p>ID: {elem.scholarshipId}</p> */}
                      <div
                        className={
                          styles.dashboard_page_scholarship_list_card_img
                        }
                      >
                        <img
                          src={elem.url || scholarshipLogo} // Default image if URL is missing
                          alt="Scholarship"
                          className={
                            styles.dashboard_page_scholarship_list_card_img
                          }
                        />
                      </div>
                      <div
                        className={
                          styles.dashboard_page_scholarship_list_card_text
                        }
                      >
                        <h4
                          className={
                            styles.dashboard_page_scholarship_list_card_title
                          }
                        >
                          {elem.title}
                        </h4>
                        <p
                          className={
                            styles.dashboard_page_scholarship_list_card_para
                          }
                        >
                          {elem.description}
                        </p>
                        <label
                          className={
                            styles.dashboard_page_scholarship_list_card_date
                          }
                        >
                          Start Date:{" "}
                          <strong>{elem.startDate.split("T")[0]}</strong>
                        </label>
                        <label
                          className={
                            styles.dashboard_page_scholarship_list_card_date
                          }
                        >
                          Deadline:{" "}
                          <strong>{elem.endDate.split("T")[0]}</strong>
                        </label>
                      </div>
                      <div
                        className={
                          styles.dashboard_page_scholarship_list_card_btn
                        }
                      >
                        <button
                          className={
                            styles.dashboard_page_scholarship_list_card_detail_btn
                          }
                          onClick={() => handleDetail(elem)} // You can replace handleDetail with a function for viewing details
                        >
                          View Details
                        </button>

                        <button
                          to="/form"
                          className={
                            styles.dashboard_page_scholarship_list_card_apply_btn
                          }
                          // onClick={() => setIsFormOpen(true)} // You can open the form when clicked
                          onClick={() => handleApplyNow(elem.scholarshipId)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                    // </div>
                  ))
                )}
              </div>
            </>
          ) : (
            // Application Status
            <div className={styles.ScholarshipStatus_parent_container}>
              <div className={styles.container}>
                <h2 className={styles.title}>Scholarship Status</h2>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Scholarship Name</th>
                        <th>Application ID</th>
                        <th>Submitted On</th>
                        <th>Current Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applyData.map((elem, index) => (
                        <tr key={index}>
                          <td>
                            {elem.application[0].scholarshipTitle || "N/A"}
                          </td>
                          <td>{elem.application[0].applicationId || "N/A"}</td>
                          <td>{elem.createdAt.split("T")[0] || "N/A"}</td>
                          <td className={styles.statusInReview}>In Review</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDetailOpen ? (
          <div className={styles.view_model}>
            <div className={styles.model_2}>
              <ViewDetails
                setIsDetailOpen={setIsDetailOpen}
                scholarshipData={selectedScholarship}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {isFormOpen && !isSubmitted && (
          <div className={styles.form_model}>
            <div className={styles.form_card_model}>
              <DashForm
                setIsFormOpen={setIsFormOpen}
                isFormOpen={isFormOpen}
                setIsSubmitted={setIsSubmitted}
                scholarshipId={selectedScholarshipId}
                checkResultData={checkResultData}
              />
            </div>
          </div>
        )}
        {/* {isSubmitted && (
          <div className={styles.form_model}>
            <div className={styles.form_card_model}>
              <DashForm
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </div>
          </div>
        )} */}
        {isSubmitted && (
          <div className={styles.submit_model}>
            <div className={styles.submit_card_model}>
              <SuccessFully setIsSubmitted={setIsSubmitted} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashBoard;
