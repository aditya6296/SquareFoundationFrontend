import styles from "./viewDetails.module.css";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { ViewDetailsData } from "./viewDetailData.js";
const ViewDetails = ({ setIsDetailOpen, scholarshipData }) => {
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
        <div>
          <h2>{scholarshipData.title}</h2>
          <p>{scholarshipData.description}</p>
        </div>
        {scholarshipData?.details ? (
          scholarshipData.details.map((item, index) => (
            <div key={index}>
              <h2>{item.heading}</h2>
              <ul className={styles.itemDetail}>
                {item.details?.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Details not available.</p>
        )}

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
  setIsDetailOpen: PropTypes.func.isRequired,
  scholarshipData: PropTypes.object.isRequired,
};

export default ViewDetails;
