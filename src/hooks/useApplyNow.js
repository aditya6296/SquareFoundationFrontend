import { useState } from "react";
import { toast } from "react-toastify";

const useApplyNow = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState(null);
  const [checkResultData, setCheckResultData] = useState(null);
  const applyNow = async (scholarshipId) => {
    console.log("scholarshipId apply", scholarshipId);
    setSelectedScholarshipId(scholarshipId); // Store the selected ID

    try {
      // ✅ Step 1: Check if the ID exists in the database
      const checkResponse = await fetch(
        `http://localhost:2200/api/v1/application-form/check/${scholarshipId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const checkResult = await checkResponse.json();
      setCheckResultData(checkResult);
      console.log("checkResult data ...: ", checkResult);
      if (checkResult.status == "Exists") {
        return toast.info(checkResult.message);
      } // toast.warning and toast.info

      if (!checkResponse.ok || !checkResult.exists) {
        // toast.error("Scholarship ID not found! Please try again.");
        toast.success(
          "Please fill out the form carefully and ensure all details are accurate !"
        );

        return;
      }
      console.log("Scholarship ID is valid, proceeding...");
    } catch (error) {
      console.error("Error in applying:", error);
    }
  };
  return {
    applyNow,
    isFormOpen,
    selectedScholarshipId,
    setIsFormOpen,
    checkResultData,
  };
};

export default useApplyNow;
