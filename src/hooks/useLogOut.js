import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useLogOut = (setUserInfo) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log("logout response", response);

      if (response.status !== 200) {
        toast.error("Logout failed");
        return;
      }

      const logoutResponse = await response.json();
      if (response.status === 200) {
        setUserInfo({ isAuthenticated: false, email: "" });
        toast.success(logoutResponse.message || "Logout Successfully!");
        navigate("/");
      }
    } catch (err) {
      console.log(err, "Internal Server error");
      console.log(err.message);
    }
  };

  // Handle logout only if the user closes the tab or window
  // const handleUnload = async (event) => {
  //   const navigationEntries = performance.getEntriesByType("navigation");
  //   const logOutType =
  //     navigationEntries.length > 0 ? navigationEntries[0].type : null;

  //   // ✅ Check if the user is closing the tab, NOT refreshing
  //   if (logOutType !== "reload") {
  //     event.preventDefault(); // This will show the default browser prompt
  //     event.returnValue = "Are you sure you want to leave?"; // ✅ Default message (custom message not allowed)

  //     // ✅ Logout request before closing
  //     await logout(); // Call logout API
  //   }
  // };

  // const handleUnload = async (event, {userInfo}) => {
  //   if (userInfo.isAuthenticated) {
  //     event.preventDefault();
  //     event.returnValue = ""; // This is necessary for Chrome

  //     const confirmationMessage = "Are you sure you want to leave?";
  //     event.returnValue = confirmationMessage; // For older browsers

  //     const confirmed = window.confirm(confirmationMessage);
  //     if (confirmed) {
  //       await logout();
  //     }
  //   }
  // };

  return { logout };
};

export default useLogOut;
