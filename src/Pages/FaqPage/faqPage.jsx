import { useState } from "react";
import styles from "./faq.module.css";
import { faqData } from "./faqData.js";
import Footer from "../../Components/Footer/footer.jsx";
import arrow_up from "../../assets/faq_images/arrow_up.svg";
import arrow_down from "../../assets/faq_images/arrow_down.svg";

function FaqPage() {
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className={styles.faq_main_container}>
        <div className={styles.faq_header_text}>
          <h1 className={styles.header_text}>
            Frequently <br /> Asked Questions
          </h1>
        </div>

        <div className={styles.faq_para_text_container}>
          {faqData.map((elem) => (
            <div key={elem.id} className={styles.faq_item}>
              {/* Clickable Question */}
              <div
                className={styles.faq_para_text_question}
                onClick={() => handleClick(elem.id)}
              >
                {elem.question}
                {openId == elem.id ? (
                  <div className={styles.faq_arrow}>
                    <img src={arrow_up} />
                  </div>
                ) : (
                  <div className={styles.faq_arrow}>
                    <img src={arrow_down} />
                  </div>
                )}
              </div>

              {/* Answer - Visible only when open */}
              {openId === elem.id && (
                <p
                  className={`${styles.faq_para_text_answer} ${styles.showAnswer}`}
                >
                  {elem.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FaqPage;
