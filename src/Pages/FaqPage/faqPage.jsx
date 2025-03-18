import { useState } from "react";
import styles from "./faq.module.css";
import { faqData } from "./faqData.js";
import Footer from "../../Components/Footer/footer.jsx";

// function FaqPage() {
//   const [openId, setOpenId] = useState(null);

//   const handleClick = (id) => {
//     setOpenId((prevId) => (prevId === id ? null : id)); // If already open, close it; otherwise, open the new one
//   };
//   // const [isOpenArr, setIsOpenArr] = useState([]);
//   // const handleClick = (id) => {
//   //   isOpenArr.includes(id)
//   //     ? setIsOpenArr(isOpenArr.filter((i) => i != id))
//   //     : setIsOpenArr([...isOpenArr, id]);
//   // };

//   return (
//     <>
//       <div className={styles.faq_main_container}>
//         <div className={styles.faq_header_text}>
//           <h1>Fequently Asked Questions</h1>
//         </div>

//         <div className={styles.faq_para_text_container}>
//           {faqData.map((elem) => (
//             <details
//               className={styles.faq_para_text}
//               // onClick={() => setIsOpen(!isOpen)}

//               key={elem.id}
//             >
//               <summary
//                 onClick={() => handleClick(elem.id)}
//                 className={styles.faq_para_text_question}
//               >
//                 {elem.question}
//               </summary>
//               {/* {isOpenArr.includes(elem.id) ? (
//                 <p className={styles.faq_para_text_answer}>{elem.answer}</p>
//               ) : (
//                 <p></p>
//               )} */}
//               {openId === elem.id && (
//                 <p className={styles.faq_para_text_answer}>{elem.answer}</p>
//               )}
//             </details>
//           ))}
//           {/* <div
//             className={styles.faq_para_tex}
//             onClick={() => setIsShow(!isShow)}
//           >
//             <h3>How to use this website</h3>
//             {isShow ? (
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
//                 ratione. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, harum!
//               </p>
//             ) : (
//               <></>
//             )}
//           </div> */}

//           {/* <div
//             className={styles.faq_para_tex}
//             onClick={() => setIsData(!isdata)}
//           >
//             <h3>How to use this website</h3>
//             {isdata ? (
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
//                 ratione.
//               </p>
//             ) : (
//               <></>
//             )}
//           </div> */}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default FaqPage;

// import { useState } from "react";
// import styles from "./faq.module.css";
// import { faqData } from "./faqData.js";
// import Footer from "../../Components/Footer/footer.jsx";

function FaqPage() {
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id)); // Correct toggle logic
  };

  return (
    <>
      <div className={styles.faq_main_container}>
        <div className={styles.faq_header_text}>
          <h1>Frequently Asked Questions</h1>
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
              </div>

              {/* Answer - Visible only when open */}
              {openId === elem.id && (
                <p className={styles.faq_para_text_answer}>{elem.answer}</p>
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
