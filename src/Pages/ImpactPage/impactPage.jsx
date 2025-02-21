import OngoingScholarPage from "../OngoingScholarPage/ongoingScholarPage";
import styles from "./impactPage.module.css";

function ImpactPage() {
  return (
    <>
      <div className={styles.impact_page_main_container}>
        <div className={styles.impact_page_text_box}>
          <div className={styles.impact_page_first_text_box}>
            <h1 className={styles.impact_page_first_text_box_1}>Our Impact</h1>
          </div>
          <div className={styles.impact_page_second_text_box}>
            <div className={styles.impact_page_second_text_box_1}>
              <h1>1,00,000+</h1>
              <p className={styles.impact_page_text_box_para}>
                Students Registered
              </p>
            </div>
            <div className={styles.impact_page_second_text_box_2}>
              <h1>96%</h1>
              <p className={styles.impact_page_text_box_para}>
                Scholarships Approved
              </p>
            </div>
            <div className={styles.impact_page_second_text_box_3}>
              <h1>70+</h1>
              <p className={styles.impact_page_text_box_para}>
                No. of Square Scholarships
              </p>
            </div>
          </div>
        </div>
      </div>
      <OngoingScholarPage />
    </>
  );
}

export default ImpactPage;
