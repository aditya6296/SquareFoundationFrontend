import { useEffect } from "react";

const useIsAuthorized = ({ setUserInfo, setIsLoading }) => {
  useEffect(() => {
    const getIsAuthorized = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/isAuthenticated`,
          { credentials: "include" }
        );
        const resObj = await res.json();
        console.log("Response from backend:", resObj, "and  : ", resObj.email);

        if (res.status === 200 && resObj.isAuthenticated) {
          setUserInfo({
            isAuthenticated: true,
            email: resObj.email, // Get email from backend
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getIsAuthorized();
  }, []);
};

export default useIsAuthorized;
