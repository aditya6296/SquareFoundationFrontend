import { toast } from "react-toastify";

const useAcademicForm = () => {
  const academicDetail = async (formAcademicData, scholarshipId) => {
    console.log("formAcademicData at useAcademic : ", formAcademicData);
    console.log("scholarshipId at useAcademic : ", scholarshipId);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/application-form/academic-details/${scholarshipId}`,
        {
          method: "POST",
          body: JSON.stringify({ ...formAcademicData, scholarshipId }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("formAcademicData- is--- ✅ ", data);
    } catch (err) {
      console.log(err, " and ", err.message);
    }
  };
  return { academicDetail };
};

export default useAcademicForm;
