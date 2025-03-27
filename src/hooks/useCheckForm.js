const useCheckForm = () => {
  const checkUserForm = async () => {
    try {
      console.log("checking .......");
      const checkData = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/application-form/status`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await checkData.json();
      console.log("checkData : ", result);
    } catch (err) {
      console.log(err);
    }
  };
  return { checkUserForm };
};

export default useCheckForm;
