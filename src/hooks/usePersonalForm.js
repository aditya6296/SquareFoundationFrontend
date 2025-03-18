const usePersonalForm = () => {
  const personalDetail = async (formPersonalData, scholarshipId) => {
    console.log("fullName===>", formPersonalData);
    console.log("🔍 Sending scholarshipID ✅:", scholarshipId);

    if (!scholarshipId) {
      console.error("Error: Scholarship ID is undefined!");
      alert("Scholarship ID is missing. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:2200/api/v1/application-form/personal-details/${scholarshipId}`,
        {
          method: "POST",
          body: JSON.stringify({ ...formPersonalData, scholarshipId }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Personal detail -- Data---<><><><>", data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPersonalDetail = async (scholarshipId) => {
    console.log("🔍 Received scholarshipID:", scholarshipId);

    try {
      if (!scholarshipId) {
        console.error("❌ Error: scholarshipID is undefined or null");
        return;
      }
      const response = await fetch(
        `http://localhost:2200/api/v1/application-form/personal-details/${scholarshipId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (result.status === "success") {
        return result.data[0]; // Assuming only one entry is needed
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
    return null;
  };
  return { personalDetail, getPersonalDetail };
};

export default usePersonalForm;
