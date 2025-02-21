import TestimonialPage from "../TestimonialPage/testimonialPage";
import styles from "./helpPage.module.css";

function HelpPage() {
  return (
    <>
      <div className={styles.help_page_main_container}>
        <div className={styles.help_page_header}>
          <h2 className={styles.help_page_header_text}>
            We Help You To Get The Best Scholarship
          </h2>
        </div>
        <div className={styles.help_page_main_box}>
          <div className={styles.help_page_img_box}>
            <div className={styles.help_page_img_box_1}>
              <img
                src="/src/assets/help_img_1.svg"
                className={styles.help_page_img_1}
              />
              <img
                src="/src/assets/help_img_2.svg"
                className={styles.help_page_img_2}
              />
            </div>
            <div className={styles.help_page_img_box_2}>
              <img
                src="/src/assets/help_img_3.svg"
                className={styles.help_page_img_3}
              />
              <img
                src="/src/assets/help_img_4.svg"
                className={styles.help_page_img_4}
              />
            </div>
          </div>
          <div className={styles.help_page_text_container}>
            <div className={styles.help_page_text_box}>
              <div className={styles.help_page_first_text_box}>
                <img
                  src="/src/assets/help_img_5.svg"
                  className={styles.help_page_text_box_png}
                />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>

              <div className={styles.help_page_second_text_box}>
                <img
                  src="/src/assets/help_img_6.svg"
                  className={styles.help_page_text_box_png}
                />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>

              <div className={styles.help_page_third_text_box}>
                <img
                  src="/src/assets/help_img_7.svg"
                  className={styles.help_page_text_box_png}
                />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>

              <div className={styles.help_page_fourth_text_box}>
                <img
                  src="/src/assets/help_img_8.svg"
                  className={styles.help_page_text_box_png}
                />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialPage />
    </>
  );
}

export default HelpPage;
