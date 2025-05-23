import { useState } from "react";
import { toast } from "react-toastify";

const useOtp = ({ setIsOtpSent }) => {
  const [loading, setLoading] = useState(false); // State to manage spinner visibility

  const sendOtp = async ({ email, isResnd = false }) => {
    console.log(email, "email from sendOtp");
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, isResnd }),
        }
      );
      const data = await response.json();
      console.log("SendOTP data ----->>>>>>", data);
      console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

      if (response.status === 201) {
        toast.success("OTP sent");
        setIsOtpSent(true);
      } else {
        toast.error(data.message);
        console.log("data.message ==> ", data.message);
        setLoading(false); // Spinner close
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Always stop loading, even in case of error
    }
  };

  return { sendOtp, loading };
};

export default useOtp;
