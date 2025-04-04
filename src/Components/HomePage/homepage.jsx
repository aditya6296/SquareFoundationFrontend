import Navbar from "../Navbar/navbar";
import styles from "./homepage.module.css";
import { Link } from "react-router";
import { imgData } from "./imageData.js";
import ImpactPage from "../../Pages/ImpactPage/impactPage.jsx";
import PropTypes from "prop-types";
import HomeBigStar from "../../assets/homepage_big_star.svg";
import HomeMiniStar from "../../assets/homepage_mini_star.svg";
import HomeArrow from "../../assets/homepage_arrow_svg.svg";
import { toast } from "react-toastify";
function Homepage({ userInfo, manageLogin, isLoginOpen, setisLoginOpen }) {
  return (
    <>
      <Navbar
        userInfo={userInfo}
        manageLogin={manageLogin}
        isLoginOpen={isLoginOpen}
        setisLoginOpen={setisLoginOpen}
      />
      <div className={styles.home_page_main_container}>
        <div className={styles.home_page_main_header_text_container}>
          <div className={styles.home_page_arrow_svg}>
            <img src={HomeArrow} className={styles.home_page_arrow_svg_show} />
          </div>
          <div className={styles.home_page_main_header_container}>
            <div className={styles.home_page_main_header_text}>
              <h1 className={styles.home_page_main_header_text_1}>
                Square Foundation-{" "}
                <span className={styles.home_page_main_header_text_highlight}>
                  Investing
                </span>{" "}
                in Your Dreams
              </h1>
              <p className={styles.home_page_main_header_text_para}>
                This foundation scholarship offers financial aasistance and the
                opportunity to achieve your dreams. Apply now and take the first
                step towards a brighter future!
              </p>
            </div>
            <div className={styles.home_page_apply_now}>
              {userInfo.isAuthenticated === true ? (
                <Link
                  to="/dashboard"
                  className={styles.home_page_apply_now_link}
                >
                  Apply Now
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setisLoginOpen(true);
                    toast.warn("Please login !");
                  }}
                  className={styles.home_page_apply_now_link}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
          <div className={styles.home_page_star_1_svg}>
            <img
              src={HomeMiniStar}
              className={styles.home_page_mini_star_svg_show}
            />
          </div>
          <div className={styles.home_page_larger_star_svg}>
            <img
              src={HomeBigStar}
              className={styles.home_page_arrow_svg_show}
            />
          </div>
        </div>

        <div className={styles.home_page_scroll_container}>
          {imgData.map((img) => (
            <div className={styles.home_page_scroll_picture} key={img.id}>
              <img
                src={img.url}
                className={styles.home_page_scroll_picture_1}
              />
              <img src={img.src} className={styles.home_page_scroll_down} />
            </div>
          ))}
        </div>
      </div>
      <ImpactPage />
    </>
  );
}

Homepage.propTypes = {
  userInfo: PropTypes.object.isRequired,
  manageLogin: PropTypes.func.isRequired,
  isLoginOpen: PropTypes.bool.isRequired,
  setisLoginOpen: PropTypes.bool.isRequired,
};

export default Homepage;
