import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useLogin = ({ manageLogin }) => {
  const [loading, setLoading] = useState(false); // State to manage spinner visibility
  const navigate = useNavigate();
  const login = async ({ email, password }) => {
    console.log("Login--email", email);
    console.log("Login--Password", password);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:2200/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        console.log("data manage ", data.data.user);
        toast.success("Login Success!");
        setLoading(false);
        // manageLogin(data.data.user.email);
        manageLogin({ email: data.data.user.email });
        navigate("/dash");

        // if (data?.data?.user) {
        //   manageLogin(data.data.user); // Pass the full user object
        //   navigate("/");
        // } else {
        //   alert("Invalid response from server");
        // }

        // manageLogin(data.data.user);
        // manageLogin(email);
        // navigate("/");
      } else if (res.status === 400) {
        toast.error(data.message);
        navigate("/signup");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      // alert("OTP not sent!");
      // alert(err.message);
    }
  };
  return { login, loading };
};

export default useLogin;
