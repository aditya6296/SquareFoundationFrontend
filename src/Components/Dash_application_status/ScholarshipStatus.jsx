import styles from "./ScholarshipStatus.module.css";
import { Link, useNavigate } from "react-router";

const ScholarshipStatus = () => {
  const navigate = useNavigate();

  const handledashHome = () => {
    navigate("/dash");
  };

  return (
    <>
      {/* <div className={styles.ScholarshipStatus_parent_container}>
        <div className={styles.dashboard_aside_container}>
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
                className={styles.dashboard_aside_link_home_btn}
                onClick={handledashHome}
              >
                {" "}
                <img
                  src="/src/assets/dashboard_images/home.svg"
                  className={styles.dashboard_aside_link_svg}
                />
                Homepage
              </button>

              <button className={styles.dashboard_aside_link_application_btn}>
                {" "}
                <img
                  src="/src/assets/dashboard_images/application.svg"
                  className={styles.dashboard_aside_link_svg}
                />
                Application
              </button>
            </div>
            <button className={styles.dashboard_aside_link_logout_btn}>
              {" "}
              <img
                src="/src/assets/dashboard_images/logout.svg"
                className={styles.dashboard_aside_link_svg}
              />
              LogOut
            </button>
          </div>
        </div>
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
      </div> */}
    </>
  );
};

export default ScholarshipStatus;
