import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useLogOut = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:2200/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      console.log("logout response", response);

      if (response.status !== 200) {
        toast.error("Logout failed");
        return;
      }

      const logoutResponse = await response.json();
      toast.success(logoutResponse.message || "Logout Successfully!");
      navigate("/");

      // if (response.status === 200) {
      //   alert("Logout SuccessFully !");
      // }
    } catch (err) {
      console.log(err, "Internal Server error");
      console.log(err.message);
    }
  };
  return { logout };
};

export default useLogOut;
