import { useEffect, useState } from "react";
import styles from "./testimonialPage.module.css";
import { testmonialCardData } from "./testmonialData.js";
import FaqPage from "../FaqPage/faqPage.jsx";
import { motion } from "framer-motion";

function TestimonialPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [direction, setDirection] = useState(1);

  const handlePrevClick = () => {
    setDirection(-1);
    setShowCard(true);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setShowCard(false);
      }
    }, 300);
  };

  const handleNextClick = () => {
    setDirection(1);
    setShowCard(true);
    setTimeout(() => {
      if (currentIndex < testmonialCardData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowCard(false);
      }
    }, 300);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentIndex < testmonialCardData.length - 1) {
  //       setCurrentIndex(currentIndex + 1);
  //     } else {
  //       setCurrentIndex(0);
  //     }
  //   });
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className={styles.testimonial_page_main_container}>
        <div className={styles.testimonial_page_header_container}>
          <div>
            <h2 className={styles.testimonial_page_header_text}>
              Testimonials
            </h2>
          </div>
          <div className={styles.testimonial_page_header_btn}>
            <button
              className={styles.testimonial_page_header_back_btn}
              onClick={handlePrevClick}
            >
              <span className="material-icons" id="rev_next_btn">
                arrow_backward
              </span>
            </button>
            <button
              className={styles.testimonial_page_header_forward_btn}
              onClick={handleNextClick}
            >
              <span className="material-icons" id="rev_prev_btn">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
        {/* <div className={styles.testimonial_page_show_container}>
          <div
            className={styles.testimonial_page_card_container}
          
          >
            <div className={styles.testimonial_page_first_card_container}>
              <img
                src={testmonialCardData[currentIndex].url}
                className={styles.testimonial_page_first_card_img}
              />
            </div>
            <div className={styles.testimonial_page_second_card_container}>
              <img
                src={testmonialCardData[currentIndex].src}
                className={styles.testimonial_page_second_card_img}
              />
            </div>
          </div>
        </div> */}

        <div className={styles.testimonial_page_card_container}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={styles.testimonial_page_first_card_container}
          >
            <div className={styles.testimonial_page_first_card_container}>
              <div className={styles.testimonial_page_first_card_text_box}>
                <p>{testmonialCardData[currentIndex].text}</p>
              </div>
              <div className={styles.testimonial_page_first_card_image_box}>
                <img src={testmonialCardData[currentIndex].url} />
                <h3>{testmonialCardData[currentIndex].name}</h3>
              </div>
            </div>
          </motion.div>
          <div className={styles.testimonial_page_second_card_container}>
            <motion.div
              key={`second-${currentIndex}`}
              initial={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={styles.testimonial_page_second_card_container}
            >
              <div className={styles.testimonial_page_second_card_text_box}>
                <p>{testmonialCardData[currentIndex].text}</p>
              </div>
              <div className={styles.testimonial_page_second_card_image_box}>
                <img src={testmonialCardData[currentIndex].src} />
                <h3>{testmonialCardData[currentIndex].title}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <FaqPage />
    </>
  );
}

export default TestimonialPage;
