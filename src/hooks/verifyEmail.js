// const SendverifyEmail = () => {
//   const verifyEmail = async ({ email, password }) => {
//     try {
//       const response = await fetch(
//         "http://localhost:2200/api/v1/auth/verify/send-verificaton-email",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );
//       const data = await response.json();
//       console.log(data, "data from sendVerificationEmail");
//     } catch (error) {
//       console.log(error, "Internal server Error");
//     }
//   };
//   return { verifyEmail };
// };

// export default SendverifyEmail;
