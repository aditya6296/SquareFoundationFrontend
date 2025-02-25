import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useSignUp = () => {
  const navigate = useNavigate();
  const registerUser = async ({ email, password, otp }) => {
    console.log("email ===>", email);
    console.log("password ===>", password);
    try {
      console.log("hello body --->");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, otp }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("signupdata===>>>>", data);

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Register successfully ! Please Login");
      navigate("/");

      // Return the parsed response
      // const inputData = await response.json();
    } catch (error) {
      console.log(error, "Internal server Error");
    }
  };
  return { registerUser };
};

export default useSignUp;
