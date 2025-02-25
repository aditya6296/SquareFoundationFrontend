import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const forgotCreatePassword = async ({
    email: isEmail,
    otp: newOtp,
    password: newPassword,
  }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: isEmail,
            otp: newOtp,
            password: newPassword,
          }),
        }
      );

      const data = await response.json();
      console.log("----forgot-data---", data);
      if (response.ok && data.status === "Success") {
        toast.success("Password Reset Successfully ! Please Login");
        navigate("/");
      }
    } catch (err) {
      console.log("forgot-error", err);
      console.log("forgot-error", err.message);
    }
  };

  return { forgotCreatePassword };
};

export default useForgotPassword;
