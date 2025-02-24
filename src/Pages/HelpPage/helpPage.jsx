import TestimonialPage from "../TestimonialPage/testimonialPage";
import styles from "./helpPage.module.css";

import helpImg1 from "/src/assets/help_img_1.svg";
import helpImg2 from "/src/assets/help_img_2.svg";
import helpImg3 from "/src/assets/help_img_3.svg";
import helpImg4 from "/src/assets/help_img_4.svg";
import helpImg5 from "/src/assets/help_img_5.svg";
import helpImg6 from "/src/assets/help_img_6.svg";
import helpImg7 from "/src/assets/help_img_7.svg";

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
              <img src={helpImg1} className={styles.help_page_img_1} />
              <img src={helpImg2} className={styles.help_page_img_2} />
            </div>
            <div className={styles.help_page_img_box_2}>
              <img src={helpImg3} className={styles.help_page_img_3} />
              <img src={helpImg4} className={styles.help_page_img_4} />
            </div>
          </div>
          <div className={styles.help_page_text_container}>
            <div className={styles.help_page_text_box}>
              <div className={styles.help_page_first_text_box}>
                <img src={helpImg5} className={styles.help_page_text_box_png} />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>

              <div className={styles.help_page_second_text_box}>
                <img src={helpImg6} className={styles.help_page_text_box_png} />
                <p className={styles.help_page_text_box_para}>
                  <b>Tailored Matches:</b>Access scholarships that perfectly
                  align with your profile,goals,and qualifications.
                </p>
              </div>

              <div className={styles.help_page_third_text_box}>
                <img src={helpImg7} className={styles.help_page_text_box_png} />
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
