import styles from "./stepsPage.module.css";
import { stepsPageCardData } from "./stepsCard.js";
import HelpPage from "../HelpPage/helpPage.jsx";
// import image1 from "../../assets/steps_page_crad_2.svg";
function StepsPage() {
  return (
    <>
      <div className={styles.steps_page_main_container}>
        <div className={styles.steps_page_header}>
          <h2 className={styles.steps_page_header_text}>
            Get Scholarship in 3 Easy Steps- Simple, Quick, and Seamless!{" "}
          </h2>
        </div>
        <div className={styles.steps_page_box}>
          {stepsPageCardData.map((elem) => (
            <div className={styles.steps_page_box_card} key={elem.id}>
              <img src={elem.url} className={styles.steps_page_box_card_img}/>
              <h3 className={styles.steps_page_box_card_title}>{elem.title}</h3>
              <p className={styles.steps_page_box_card_para}>{elem.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
      <HelpPage />
    </>
  );
}

export default StepsPage;
