const useForm = () => {
  const form = async ({ formData }) => {
    console.log("formData ---->>>", formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/submit-form`,
        {
          method: "POST",
          body: JSON.stringify({ formData }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Form -- Data---<><><><>", data);
    } catch (err) {
      console.log("Internal Server Error:", err);
    }
  };
  return { form };
};

export default useForm;
