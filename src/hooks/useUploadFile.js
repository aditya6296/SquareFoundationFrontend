import { toast } from "react-toastify";

const useUploadFile = () => {
  const uploadFile = async (scholarshipId, formData) => {
    console.log("isFile : ", formData);

    try {
      const response = fetch(
        `http://localhost:2200/api/v1/application-form/upload/${scholarshipId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("File uploaded successfully!");
        console.log("Upload response:", data);
      }
    } catch (err) {
      console.log(err, " and error.message", err.message);
    }
  };
  return { uploadFile };
};

export default useUploadFile;
