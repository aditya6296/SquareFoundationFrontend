import { useState } from "react";
import styles from "./dashBoard.module.css";
import { dashData } from "./dashboardData.js";
import { Link } from "react-router-dom";
import ViewDetails from "../ViewDetails/viewDetails.jsx";
import logout from "../../hooks/useLogOut.js";
import useLogOut from "../../hooks/useLogOut.js";

function DashBoard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const {logout} = useLogOut()

  const handleHome = () => {
    setActiveTab("home");
  };

  const handleApplication = () => {
    setActiveTab("application");
  };

  const handleDetail = () => {
    setIsDetailOpen(true);
  };

  // const userLogout = logout;

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Ensure it's executed properly
    } catch (error) {
      console.error("Logout failed:", error);
    }
    console.log("buttom clicked --> ");

    // try {
    //   const response = await fetch("http://localhost:2200/api/v1/auth/logout", {
    //     method: "POST",
    //     credentials: "include",
    //   });

    //   if (response.ok) {
    //     // Redirect to the login page or home page
    //     alert("Logout Success");

    //     // setUserInfo({
    //     //   isAuthenticated:false,
    //     // })
    //     // navigate('/login');
    //   } else {
    //     console.error("Failed to log out.");
    //     alert("Error logging out. Please try again.");
    //   }
    // } catch (err) {
    //   console.error("Error during logout:", err);
    //   alert("An error occurred. Please try again.");
    // }
  };

  return (
    <>
      <div className={styles.dashboard_main_container}>
        <aside className={styles.dashboard_aside_container}>
          <div className={styles.dashboard_aside_header}>
            <Link to="/" className={styles.dashboard_aside_link}>
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
                <img src="/src/assets/line.svg" />
                <span>Foundation</span>
                <img src="/src/assets/line.svg" />
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
                  src="/src/assets/dashboard_images/home.svg"
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
                  src="/src/assets/dashboard_images/application.svg"
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
                src="/src/assets/dashboard_images/logout.svg"
                className={styles.dashboard_aside_link_svg}
              />
              LogOut
            </button>
          </div>
        </aside>

        <div className={styles.dashboard_page_scholarship_list_container}>
          {activeTab === "home" ? (
            <>
              <div className={styles.dashboard_page_scholarship_list_header}>
                <h2 className={styles.dashboard_page_scholarship_list_text}>
                  Scholarship List
                </h2>
              </div>
              {dashData.map((elem) => (
                <div
                  className={styles.dashboard_page_scholarship_list_card}
                  key={elem.id}
                >
                  <div
                    className={styles.dashboard_page_scholarship_list_card_img}
                  >
                    <img
                      src={elem.url}
                      alt="Scholarship"
                      className={
                        styles.dashboard_page_scholarship_list_card_img
                      }
                    />
                  </div>
                  <div
                    className={styles.dashboard_page_scholarship_list_card_text}
                  >
                    <h4
                      className={
                        styles.dashboard_page_scholarship_list_card_title
                      }
                    >
                      {elem.heading}
                    </h4>
                    <p
                      className={
                        styles.dashboard_page_scholarship_list_card_para
                      }
                    >
                      {elem.text}
                    </p>
                    <label
                      className={
                        styles.dashboard_page_scholarship_list_card_date
                      }
                    >
                      Start Date: <strong>{elem.startDate}</strong>
                    </label>
                    <label
                      className={
                        styles.dashboard_page_scholarship_list_card_date
                      }
                    >
                      Deadline: <strong>{elem.endDate}</strong>
                    </label>
                  </div>
                  <div
                    className={styles.dashboard_page_scholarship_list_card_btn}
                  >
                    <button
                      className={
                        styles.dashboard_page_scholarship_list_card_detail_btn
                      }
                      onClick={handleDetail}
                    >
                      View Details
                    </button>
                    <Link
                      to="/form"
                      className={
                        styles.dashboard_page_scholarship_list_card_aaply_btn
                      }
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
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
                      <tr>
                        <td>Bright Futures Scholarship</td>
                        <td>BF20250123</td>
                        <td>March 10, 2025</td>
                        <td className={styles.statusInReview}>In Review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDetailOpen ? (
          <div className={styles.model}>
            <div className={styles.model_2}>
              <ViewDetails setIsDetailOpen={setIsDetailOpen} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DashBoard;
