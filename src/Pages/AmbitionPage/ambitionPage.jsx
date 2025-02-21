import StepsPage from "../StepsPage/stepsPage.jsx";
import styles from "./ambitionPage.module.css";
import { ambitonPageCardData } from "./ambitionCard.js";

function AmbitionPage() {
  return (
    <>
      <div className={styles.ambition_main_container}>
        <div className={styles.ambition_header}>
          <h2 className={styles.ambition_header_text}>
            Support for every ambition!{" "}
          </h2>
        </div>
        <div className={styles.ambition_box}>
          {ambitonPageCardData.map((elem) => (
            <div
              id={styles[elem.class]}
              className={styles.ambition_box_1}
              key={elem.id}
            >
              <img src={elem.url} className={styles.ambition_box_1_img} />
              <p>{elem.title}</p>
            </div>
          ))}
        </div>
      </div>
      <StepsPage />
    </>
  );
}

export default AmbitionPage;
