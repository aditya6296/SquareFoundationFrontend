import { toast } from "react-toastify";

const useUploadFile = (setIsLoading) => {
  const uploadFile = async (scholarshipId, formData) => {
    console.log("fileupload data id  =====: ", scholarshipId);
    // console.log("fileupload data =====: ", formData.get("file"));
    console.log("Checking FormData contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/application-form/upload/${scholarshipId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        toast.success("File uploaded successfully!");
        console.log("Upload response:", data);
      }
    } catch (err) {
      console.log(err, " and error.message", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { uploadFile };
};

export default useUploadFile;
