import { useState } from "react";
import { toast } from "react-toastify";

const useOtp = ({ setIsOtpSent }) => {
  const [loading, setLoading] = useState(false); // State to manage spinner visibility

  const sendOtp = async ({ email, isResnd = false }) => {
    console.log(email, "email from sendOtp");
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:2200/api/v1/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, isResnd }),
      });
      const data = await response.json();
      console.log("SendOTP data ----->>>>>>", data);

      if (response.status === 201) {
        toast.success("OTP sent");
        setIsOtpSent(true);
        setLoading(false); // Spinner close
      } else {
        toast.error(data.message);
        console.log("data.message ==> ", data.message);
        setLoading(false); // Spinner close
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { sendOtp, loading };
};

export default useOtp;
