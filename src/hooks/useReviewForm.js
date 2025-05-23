import { useState } from "react";
const useReviewForm = (scholarshipId) => {
  const [reviewData, setReviewData] = useState({});
  const reviewForm = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/application-form/review/${scholarshipId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const reviewFormData = await response.json();
      console.log("reviewData > :", reviewFormData);
      setReviewData(reviewFormData);
    } catch (err) {
      console.log(err);
    }
  };
  return { reviewForm, reviewData };
};

export default useReviewForm;
