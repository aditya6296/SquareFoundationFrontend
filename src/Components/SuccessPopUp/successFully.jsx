import styles from "./successfully.module.css";
import successImg from "/src/assets/successfully_img/right_img.svg";
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
          <img src={successImg} className={styles.success_right_img} />
        </div>
        <div className={styles.success_text_container}>
          <div className={styles.success_text}>
            <h2>Application submitted successfully!</h2>
            <p>Thank you for applying for the Scholarship.</p>
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
