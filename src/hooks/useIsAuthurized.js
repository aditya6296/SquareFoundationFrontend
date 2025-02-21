import { useEffect } from "react";

const useIsAuthorized = ({ setUserInfo }) => {
  const getIsAuthorized = async () => {
    const res = await fetch("http://localhost:2200/api/v1/isAuthenticated", {
      credentials: "include",
    });
    const resObj = await res.json();
    if (res.status === 200 && resObj.isAuthenticated === true) {
      setUserInfo({
        isAuthenticated: true,
      });
    }
    //  else {
    //   alert("Plase login Awwwww !");
    // }
  };

  useEffect(() => {
    getIsAuthorized();
  }, []);
};

export default useIsAuthorized;
