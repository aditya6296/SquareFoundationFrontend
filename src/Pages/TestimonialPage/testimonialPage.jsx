// import { useEffect, useState } from "react";
// import styles from "./testimonialPage.module.css";
// import { testmonialCardData } from "./testmonialData.js";
// import FaqPage from "../FaqPage/faqPage.jsx";

// function TestimonialPage() {
//   // const [currentIndex, setCurrentIndex] = useState(0);
//   // const [showCard, setShowCard] = useState(false);
//   // const [direction, setDirection] = useState(1);

//   // const handlePrevClick = () => {
//   //   setDirection(-1);
//   //   setShowCard(true);
//   //   setTimeout(() => {
//   //     if (currentIndex > 0) {
//   //       setCurrentIndex(currentIndex - 1);
//   //       setShowCard(false);
//   //     }
//   //   }, 300);
//   // };

//   // const handleNextClick = () => {
//   //   setDirection(1);
//   //   setShowCard(true);
//   //   setTimeout(() => {
//   //     if (currentIndex < testmonialCardData.length - 1) {
//   //       setCurrentIndex(currentIndex + 1);
//   //       setShowCard(false);
//   //     }
//   //   }, 300);
//   // };

//   // New

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const cardWidth = 460;
//   const cardsPerSlide = 1;

//   const handlePrevClick = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0
//         ? testmonialCardData.length - cardsPerSlide
//         : prevIndex - cardsPerSlide
//     );
//   };

//   const handleNextClick = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex >= testmonialCardData.length - cardsPerSlide
//         ? 0
//         : prevIndex + cardsPerSlide
//     );
//   };

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     handleNextClick();
//   //   }, 3000);
//   //   return () => clearInterval(interval);
//   // }, [currentIndex]);

//   return (
//     <>
//       <div className={styles.testimonial_page_main_container}>
//         <div className={styles.testimonial_page_header_container}>
//           <div>
//             <h2 className={styles.testimonial_page_header_text}>
//               Testimonials
//             </h2>
//           </div>
//           <div className={styles.testimonial_page_header_btn}>
//             <button
//               className={styles.testimonial_page_header_back_btn}
//               onClick={handlePrevClick}
//             >
//               <span className="material-icons" id="rev_next_btn">
//                 arrow_backward
//               </span>
//             </button>
//             <button
//               className={styles.testimonial_page_header_forward_btn}
//               onClick={handleNextClick}
//             >
//               <span className="material-icons" id="rev_prev_btn">
//                 arrow_forward
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className={styles.testimonial_page_show_container}>
//           <div className={styles.testimonial_page_card_container}>
//             <div className={styles.testimonial_page_first_card_container}>
//               <img
//                 src={testmonialCardData[currentIndex].url}
//                 className={styles.testimonial_page_first_card_img}
//               />
//             </div>
//             <div className={styles.testimonial_page_second_card_container}>
//               <img
//                 src={testmonialCardData[currentIndex].src}
//                 className={styles.testimonial_page_second_card_img}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <FaqPage />
//     </>
//   );
// }

// export default TestimonialPage;

import { useState } from "react";
import styles from "./testimonialPage.module.css";
import { testmonialCardData } from "./testmonialData.js";
import FaqPage from "../FaqPage/faqPage.jsx";

function TestimonialPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerSlide = 2;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? testmonialCardData.length - cardsPerSlide
        : prevIndex - cardsPerSlide
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testmonialCardData.length - cardsPerSlide
        ? 0
        : prevIndex + cardsPerSlide
    );
  };

  return (
    <>
      <div className={styles.testimonial_page_main_container}>
        <div className={styles.testimonial_page_header_container}>
          <h2 className={styles.testimonial_page_header_text}>Testimonials</h2>
          <div className={styles.testimonial_page_header_btn}>
            <button
              className={styles.testimonial_page_header_back_btn}
              onClick={handlePrevClick}
            >
              <span className="material-icons">arrow_backward</span>
            </button>
            <button
              className={styles.testimonial_page_header_forward_btn}
              onClick={handleNextClick}
            >
              <span className="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className={styles.testimonial_page_show_container}>
          <div className={styles.testimonial_page_card_wrapper}>
            {testmonialCardData
              .slice(currentIndex, currentIndex + cardsPerSlide)
              .map((item) => (
                <div key={item.id} className={styles.testimonial_card}>
                  <p className={styles.testimonial_text}>{item.text}</p>
                  <div className={styles.testimonial_user}>
                    <img
                      src={item.src}
                      className={styles.testimonial_user_img}
                      alt={item.name}
                    />
                    <h4 className={styles.testimonial_user_name}>
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <FaqPage />
    </>
  );
}

export default TestimonialPage;
