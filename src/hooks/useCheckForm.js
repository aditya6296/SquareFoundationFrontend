const useCheckForm = () => {
  const checkUserForm = async () => {
    try {
      console.log("checking .......");
      const checkData = await fetch(
        "http://localhost:2200/api/v1/application-form/status",
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
