import AmbitionPage from "../AmbitionPage/ambitionPage";
import styles from "./ongoingScholar.module.css";

function OngoingScholarPage() {
  return (
    <>
      <div className={styles.scholarpage_main_box}>
        <div className={styles.scholarpage_header_text_container}>
          <div className={styles.scholarpage_header_text_box}>
            <h2 className={styles.scholarpage_header_text_1}>
              Ongoing <br /> Scholarships
            </h2>
          </div>
          <div className={styles.scholarpage_list_text_box}>
            <div className={styles.scholarpage_list_text}>
              <h3>1. Bright Futures Scholarship</h3>
              <span className={styles.scholarpage_date}>
                start: 24/01/2025
              </span>{" "}
              <span className={styles.scholarpage_date}>
                Deadline: 31/01/2025
              </span>
            </div>

            <div className={styles.scholarpage_list_text}>
              {" "}
              <h3>2. NextGen Leaders Grant</h3>
              <span className={styles.scholarpage_date}>
                start: 24/01/2025
              </span>{" "}
              <span className={styles.scholarpage_date}>
                Deadline: 31/01/2025
              </span>
            </div>
            <div className={styles.scholarpage_list_text}>
              {" "}
              <h3>3. Empower Education Scholarship</h3>
              <span className={styles.scholarpage_date}>
                start: 24/01/2025
              </span>{" "}
              <span className={styles.scholarpage_date}>
                Deadline: 31/01/2025
              </span>
            </div>
            <div className={styles.scholarpage_list_text}>
              {" "}
              <h3>4. Global Visionary Award</h3>
              <span className={styles.scholarpage_date}>
                start: 24/01/2025
              </span>{" "}
              <span className={styles.scholarpage_date}>
                Deadline: 31/01/2025
              </span>
            </div>
            <div className={styles.scholarpage_list_text}>
              {" "}
              <h3>5. Achieve Eccelence Followship</h3>
              <span className={styles.scholarpage_date}>
                start: 24/01/2025
              </span>{" "}
              <span className={styles.scholarpage_date}>
                Deadline: 31/01/2025
              </span>
            </div>
          </div>
        </div>
      </div>
      <AmbitionPage />
    </>
  );
}

export default OngoingScholarPage;
