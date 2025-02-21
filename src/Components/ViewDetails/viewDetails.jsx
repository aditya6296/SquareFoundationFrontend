import styles from "./viewDetails.module.css";
import { ViewDetailsData } from "./viewDetailData.js";
import { Link } from "react-router";
import PropTypes from "prop-types";
const ViewDetails = ({ setIsDetailOpen }) => {
  const handleViewDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <div className={styles.detailContainer}>
        <button
          className={`material-icons ${styles.clearButton}`}
          onClick={handleViewDetail}
        >
          clear
        </button>
        {ViewDetailsData.map((item, index) => (
          <div key={index}>
            <h2>{item.heading}</h2>
            <ul className={styles.itemDetail}>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.home_page_apply_now}>
          <Link to="#" className={styles.view_detail_apply_now_link}>
            Apply Now
          </Link>
        </div>
      </div>
    </>
  );
};

ViewDetails.propTypes = {
  setIsDetailOpen: PropTypes.bool.isRequired,
};

export default ViewDetails;
