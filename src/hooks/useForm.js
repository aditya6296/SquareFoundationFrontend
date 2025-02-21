const useForm = () => {
  const form = async ({ formData }) => {
    console.log("formData ---->>>", formData);
    try {
      const response = await fetch("http://localhost:2200/api/v1/submit-form", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Form -- Data---<><><><>", data);
    } catch (err) {
      console.log("Internal Server Error:", err);
    }
  };
  return { form };
};

export default useForm;
