import { useEffect, useState } from "react";

const useScholarship = () => {
  const [scholarshipData, setScholarshipData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const fetchScholarshipData = async () => {
    setIsLoading(true); // Set loading to true when data fetching starts
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/dashboard/scholarship-data`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Failed to fetch data");
        return;
      }

      const data = await response.json();
      console.log("Scholarship data ➡️", data);
      setScholarshipData(data.data);
    } catch (err) {
      console.log(err, err.message);
    } finally {
      setIsLoading(false); // Set loading to false after the fetch attempt
    }
  };
  useEffect(() => {
    fetchScholarshipData();
  }, []);

  return { fetchScholarshipData, scholarshipData, isLoading };
};

export default useScholarship;
