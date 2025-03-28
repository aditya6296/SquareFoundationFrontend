import styles from "./successfully.module.css";
import { Link } from "react-router";
function SuccessFully({ setIsSubmitted }) {
  return (
    <>
      <div className={styles.success_main_container}>
        <button
          className={`material-icons ${styles.clearButton}`}
          onClick={() => setIsSubmitted(false)}
        >
          clear
        </button>
        <div className={styles.success_right_img_container}>
          <img
            src="/src/assets/successfully_img/right_img.svg"
            className={styles.success_right_img}
          />
        </div>
        <div className={styles.success_text_container}>
          <div className={styles.success_text}>
            <h2>Application submitted successfully!</h2>
            <p>Thank you for applying for the Bright Futures Scholarship.</p>
          </div>
          <div className={styles.success_text_go_back_link}>
            <button
              onClick={() => setIsSubmitted(false)}
              className={styles.go_back_btn}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessFully;
