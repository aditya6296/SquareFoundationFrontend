import { useEffect, useState } from "react";
import styles from "./dashForm.module.css";
import usePersonalForm from "../../hooks/usePersonalForm";
import PropTypes from "prop-types";
import useAcademicForm from "../../hooks/useAcademicForm";
import useUploadFile from "../../hooks/useUploadFile";
import { toast } from "react-toastify";
import useReviewForm from "../../hooks/useReviewForm";
import { FadeLoader } from "react-spinners";
// import SuccessFully from "../SuccessPopUp/successFully";

function DashForm({
  setIsFormOpen,
  isFormOpen,
  scholarshipId,
  checkResultData,
  setIsSubmitted,
}) {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({});
  const [stepPage, setStepPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4; // Total steps in the form
  const { personalDetail, getPersonalDetail } = usePersonalForm();
  const { academicDetail } = useAcademicForm();
  const { uploadFile } = useUploadFile(setIsLoading);
  const { reviewForm, reviewData } = useReviewForm(scholarshipId);
  const [academicData, setAcademicData] = useState({});
  const [isFile, setIsFile] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // Options based on education level
  const fieldOptions = {
    Matric: ["10th"],
    Intermediate: ["Science", "Commerce", "Arts"],
    Graduation: [
      "B.Tech",
      "B.Sc",
      "B.Com",
      "BA",
      "BBA",
      "BCA",
      "B.Pharm",
      "B.Ed.",
      "B.Arch",
      "Other",
    ],
    "Post Graduation": [
      "M.Tech",
      "M.Sc",
      "M.Com",
      "MA",
      "MBA",
      "MCA",
      "LLM",
      "M.Pharm",
      "M.Ed.",
      "M.Arch",
      "Other",
    ],
    Other: ["Others"],
  };

  console.log("checkResultData at dashform :", checkResultData);
  // 🟢 Auto-fill the form when checkResultData is available
  // useEffect(() => {
  //   if (
  //     checkResultData?.data?.application?.[0]?.personalDetails ||
  //     checkResultData?.data?.application?.[0]?.academicInformation ||
  //     checkResultData?.data?.application?.[0]?.uploadDocuments
  //   ) {
  //     console.log(
  //       "checkResultData updated: at dashform in useeffect",
  //       checkResultData.data.application[0].personalDetails.name
  //     );
  //     console.log(
  //       "checkResultData updated: at dashform in useeffect academicInformation ",
  //       checkResultData.data.application[0].academicInformation.collegeName
  //     );
  //     setPersonalData((prev) => ({
  //       ...prev, //Keeps previous values in case some fields in checkResultData are missing.
  //       name:
  //         checkResultData.data.application[0].personalDetails.name || prev.name,
  //       email:
  //         checkResultData.data.application[0].personalDetails.email ||
  //         prev.email,
  //       phoneNumber:
  //         checkResultData.data.application[0].personalDetails.phoneNumber ||
  //         prev.phoneNumber,
  //       DOB:
  //         checkResultData.data.application[0].personalDetails.DOB || prev.DOB,
  //       gender:
  //         checkResultData.data.application[0].personalDetails.gender ||
  //         prev.gender,
  //       materialStatus:
  //         checkResultData.data.application[0].personalDetails.materialStatus ||
  //         prev.materialStatus,
  //     }));
  //     setAcademicData((prev) => ({
  //       ...prev,
  //       collegeName:
  //         checkResultData.data.application[0].academicInformation.collegeName ||
  //         prev.collegeName,
  //       educationLevel:
  //         checkResultData.data.application[0].academicInformation
  //           .educationLevel || prev.educationLevel,

  //       fieldOfStudy:
  //         checkResultData.data.application[0].academicInformation
  //           .fieldOfStudy || prev.fieldOfStudy,

  //       GPA:
  //         checkResultData.data.application[0].academicInformation.GPA ||
  //         prev.GPA,

  //       yearOfStudy:
  //         checkResultData.data.application[0].academicInformation.yearOfStudy ||
  //         prev.yearOfStudy,

  //       passOutYear:
  //         checkResultData.data.application[0].academicInformation.passOutYear ||
  //         prev.passOutYear,

  //       reason:
  //         checkResultData.data.application[0].academicInformation.reason ||
  //         prev.reason,
  //     }));
  //     const uploadDocs =
  //       checkResultData?.data?.application?.[0]?.uploadDocuments ?? {}; // Ensure it's an object

  //     setIsFile((prev) => ({
  //       ...prev,
  //       photo: uploadDocs?.photo?.length
  //         ? uploadDocs.photo[0]
  //         : prev.photo ?? null,
  //       identityProof: uploadDocs?.identityDocument?.length
  //         ? uploadDocs.identityDocument[0]
  //         : prev.identityProof ?? null,
  //       academicTranscript: uploadDocs?.academicTranscript?.length
  //         ? uploadDocs.academicTranscript[0]
  //         : prev.academicTranscript ?? null,
  //       personalStatement: uploadDocs?.personalStatement?.length
  //         ? uploadDocs.personalStatement[0]
  //         : prev.personalStatement ?? null,
  //     }));
  //   }
  // }, [checkResultData]); // Runs when checkResultData updates

  useEffect(() => {
    if (
      checkResultData?.data?.application &&
      checkResultData.data.application.length > 0
    ) {
      console.log(
        "checkResultData updated: at dashform in useeffect",
        checkResultData.data.application[0]?.personalDetails?.name ?? "N/A"
      );

      setPersonalData((prev) => ({
        ...prev,
        name:
          checkResultData.data.application[0]?.personalDetails?.name ??
          prev.name,
        email:
          checkResultData.data.application[0]?.personalDetails?.email ??
          prev.email,
        phoneNumber:
          checkResultData.data.application[0]?.personalDetails?.phoneNumber ??
          prev.phoneNumber,
        DOB:
          checkResultData.data.application[0]?.personalDetails?.DOB ?? prev.DOB,
        gender:
          checkResultData.data.application[0]?.personalDetails?.gender ??
          prev.gender,
        materialStatus:
          checkResultData.data.application[0]?.personalDetails
            ?.materialStatus ?? prev.materialStatus,
      }));

      setAcademicData((prev) => ({
        ...prev,
        collegeName:
          checkResultData.data.application[0]?.academicInformation
            ?.collegeName ?? prev.collegeName,
        educationLevel:
          checkResultData.data.application[0]?.academicInformation
            ?.educationLevel ?? prev.educationLevel,
        fieldOfStudy:
          checkResultData.data.application[0]?.academicInformation
            ?.fieldOfStudy ?? prev.fieldOfStudy,
        GPA:
          checkResultData.data.application[0]?.academicInformation?.GPA ??
          prev.GPA,
        yearOfStudy:
          checkResultData.data.application[0]?.academicInformation
            ?.yearOfStudy ?? prev.yearOfStudy,
        passOutYear:
          checkResultData.data.application[0]?.academicInformation
            ?.passOutYear ?? prev.passOutYear,
        reason:
          checkResultData.data.application[0]?.academicInformation?.reason ??
          prev.reason,
      }));

      const uploadDocs =
        checkResultData?.data?.application?.[0]?.uploadDocuments ?? {}; // Ensure it's an object

      setIsFile((prev) => ({
        ...prev,
        photo: uploadDocs?.photo?.[0] ?? prev.photo,
        identityProof: uploadDocs?.identityProof?.[0] ?? prev.identityProof,
        academicTranscript:
          uploadDocs?.academicTranscript?.[0] ?? prev.academicTranscript,
        personalStatement:
          uploadDocs?.personalStatement?.[0] ?? prev.personalStatement,
      }));
    }
  }, [checkResultData]);

  // Handle Next Step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (stepPage < totalSteps) {
      setStepPage((prevStep) => prevStep + 1);
    }
  };

  // Handle Previous Step
  const prevStep = async (e) => {
    e.preventDefault();
    if (step === 2) {
      console.log("📌 Fetching details for scholarshipID:"); // ✅
      const data = await getPersonalDetail();
      if (data) setPersonalData(data);
      if (data) setAcademicData(data);

      // ✅ Ensure uploaded files are set correctly
      if (data.uploadDocuments) {
        setIsFile({
          photo: data.uploadDocuments.photo || null,
          identityProof: data.uploadDocuments.identityProof || null,
          academicTranscript: data.uploadDocuments.academicTranscript || null,
          personalStatement: data.uploadDocuments.personalStatement || null,
        });
      }

      if (stepPage > 1) {
        setStepPage((prevStep) => prevStep - 1);
      }
    }

    setStep((prevStep) => prevStep - 1);
  };

  // Update input values dynamically
  const handleChange = (e) => {
    // setPersonalData({ ...personalData, [e.target.name]: e.target.value });

    const { name, value, type, files } = e.target;
    if (type === "file") {
      console.log("files data == : ", files);
      setIsFile((prev) => ({ ...prev, [name]: files[0] }));
      // setIsFile(files[0]);
      console.log("isfiles data == : ", isFile);
    } else {
      setPersonalData((prev) => ({ ...prev, [name]: value }));
      setAcademicData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePersonalDtails = async (e) => {
    e.preventDefault();
    const formPersonalData = {
      name: e.target[1].value,
      email: e.target[2].value,
      phoneNumber: e.target[3].value,
      DOB: e.target[4].value,
      gender: e.target[5].value,
      materialStatus: e.target[6].value,
    };

    console.log(formPersonalData);
    console.log("Submitting with Scholarship ID:", scholarshipId);
    await personalDetail(formPersonalData, scholarshipId);

    nextStep();
  };

  const handleAcademicDetails = async (e) => {
    e.preventDefault();
    console.log("📌 e.target[1]:", e.target[1]);

    const formAcademicData = {
      collegeName: e.target[1].value,
      educationLevel: e.target[2].value,
      fieldOfStudy: e.target[3].value,
      GPA: e.target[4].value,
      yearOfStudy: e.target[5].value,
      passOutYear: e.target[6].value,
      reason: e.target[7].value,
    };
    console.log("collegeName at dashform :", formAcademicData.collegeName);
    console.log("yearOfStudy at dashform :", formAcademicData.yearOfStudy);
    console.log("📌 Submitted Academic Data:", formAcademicData);
    await academicDetail(formAcademicData, scholarshipId);
    nextStep();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Debugging
    console.log("setIsLoading inside handleUpload:", setIsLoading);

    if (typeof setIsLoading !== "function") {
      console.error("setIsLoading is not a function!", setIsLoading);
      return;
    }

    if (
      !isFile.photo ||
      !isFile.identityProof ||
      !isFile.academicTranscript ||
      !isFile.personalStatement
    ) {
      toast.error("Please upload all required files.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    Object.entries(isFile).forEach(([key, file]) => {
      formData.append(key, file);
    });

    try {
      await uploadFile(scholarshipId, formData);
      await reviewForm();
      nextStep();
    } catch (error) {
      toast.error("File upload failed. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle education level change separately
  const handleEducationLevelChange = (e) => {
    const selectedLevel = e.target.value;
    setAcademicData((prevData) => ({
      ...prevData,
      educationLevel: selectedLevel, // Update education level
      fieldOfStudy: "", // Reset field of study when education level changes
    }));
  };

  return (
    <>
      <div className={styles.container}>
        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <p>
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* <form className={styles.form}> */}
        {step === 1 && (
          <form className={styles.form} onSubmit={handlePersonalDtails}>
            <div>
              {" "}
              <button
                onClick={() => setIsFormOpen(false)}
                className={styles.close_btn}
              >
                Close
              </button>
            </div>
            <h2>Personal Details</h2>
            <div className={styles.input_container}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={personalData.name || ""}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={personalData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.input_container}>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone"
                value={personalData.phoneNumber || ""}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="DOB"
                placeholder="DOB"
                value={personalData.DOB ? personalData.DOB.split("T")[0] : ""}
                onChange={handleChange}
                // pattern="\d{4}-\d{2}-\d{2}"
                required
              />
            </div>
            <div className={styles.input_container}>
              <select
                name="gender"
                className={styles.gender_dropdown}
                value={personalData.gender || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="materialStatus"
                className={styles.material_dropdown}
                value={personalData.materialStatus || ""}
                onChange={handleChange}
                required
              >
                <option value="">Material Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className={styles.save_btn}>
              Save & Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form className={styles.form} onSubmit={handleAcademicDetails}>
            <div>
              {" "}
              <button
                onClick={() => setIsFormOpen(false)}
                className={styles.close_btn}
              >
                Close
              </button>
            </div>
            <h2>Academic Information</h2>
            <div className={styles.input_container}>
              <input
                type="text"
                name="collegeName"
                placeholder="Enter Your Current Institution Name"
                value={academicData.collegeName || ""}
                onChange={handleChange}
                required
              />

              <select
                name="educationLevel"
                className={styles.educationLevel_dropdown}
                value={academicData.educationLevel || ""} // Prefill selected education level
                onChange={handleEducationLevelChange} // Reset fieldOfStudy when changed
                required
              >
                <option value="">Select Current Education Level</option>
                {/* Dynamically create options for education levels */}
                {Object.keys(fieldOptions).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              {/* old */}
              {/* <select
                name="educationLevel"
                className={styles.educationLevel_dropdown}
                value={academicData.educationLevel || ""}
                // onChange={(e) => {
                //   handleChange(e);
                //   handleEducationLevelChange(e);
                // }}
                onChange={handleChange}
                required
              >
                <option value="">Select Current Education Level</option>
                {Object.keys(fieldOptions).map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select> */}
            </div>
            <div className={styles.input_container}>
              {console.log("academicData :", academicData)}
              <select
                name="fieldOfStudy"
                className={styles.educationLevel_dropdown}
                value={academicData.fieldOfStudy || ""}
                onChange={handleChange}
                // disabled={!educationLevel} // Disable if no education level is selected
                disabled={!academicData.educationLevel}
                required
              >
                <option value="">Select Field Of Study</option>
                {/* {(academicData.educationLevel &&
                  fieldOptions[academicData.educationLevel].map((field) => (
                    <option key={field}>{field}</option>
                  ))) } */}
                {fieldOptions[academicData.educationLevel]?.map((field) => (
                  <option key={field}>{field}</option>
                )) || <option disabled>No options available</option>}
              </select>
              <input
                type="text"
                name="GPA"
                placeholder="GPA / Percentage"
                value={academicData.GPA || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.input_container}>
              <input
                type="text"
                name="yearOfStudy"
                placeholder="year of study"
                value={academicData.yearOfStudy || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="passOutYear"
                placeholder="Pass Out Year"
                value={academicData.passOutYear || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.input_container}>
              <textarea
                type="text"
                name="reason"
                value={academicData.reason || ""}
                placeholder="Why are you applying for this Scholarship"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={prevStep}
                className={styles.prev_btn}
              >
                Previous
              </button>
              <button type="submit" className={styles.save_AndNext_Btn}>
                Save & Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <>
            {isLoading && (
              <div className={styles.loading_overlay}>
                <FadeLoader size={50} color="white" />
              </div>
            )}
            <form className={styles.form} onSubmit={handleUpload}>
              <div>
                {" "}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className={styles.close_btn}
                >
                  Close
                </button>
              </div>
              <h2>Upload Documents</h2>
              <div className={styles.input_file_container}>
                <div className={styles.input_box}>
                  <p>Upload your Photo</p>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    required={!isFile.photo}
                  />
                  <div>
                    {isFile.photo ? (
                      <p>📌 File Uploaded: {isFile.photo.fileName}</p>
                    ) : (
                      <p>⚠️ No file uploaded</p>
                    )}
                  </div>
                </div>

                <div className={styles.input_box}>
                  <p>Upload your Identity Proof</p>
                  <input
                    type="file"
                    name="identityProof"
                    onChange={handleChange}
                    required={
                      !isFile.identityProof || isFile.identityProof.length === 0
                    }
                  />

                  {isFile.identityProof ? (
                    <p>📌 File Uploaded: {isFile.identityProof.fileName}</p>
                  ) : (
                    <p>⚠️ No file uploaded</p>
                  )}
                </div>
                <div className={styles.input_box}>
                  <p>Upload your academic Transcript</p>
                  <input
                    type="file"
                    name="academicTranscript"
                    onChange={handleChange}
                    required={
                      !isFile.academicTranscript ||
                      isFile.academicTranscript.length === 0
                    }
                  />

                  {isFile.academicTranscript ? (
                    <p>
                      📌 File Uploaded: {isFile.academicTranscript.fileName}
                    </p>
                  ) : (
                    <p>⚠️ No file uploaded</p>
                  )}
                </div>

                <div className={styles.input_box}>
                  <p>Upload your personal Statement</p>
                  <input
                    type="file"
                    name="personalStatement"
                    onChange={handleChange}
                    required={
                      !isFile.personalStatement ||
                      isFile.personalStatement.length === 0
                    }
                  />

                  {isFile.personalStatement ? (
                    <p>📌 File Uploaded: {isFile.personalStatement.fileName}</p>
                  ) : (
                    <p>⚠️ No file uploaded</p>
                  )}
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={prevStep}
                  className={styles.prev_btn}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className={styles.save_AndNext_Btn}
                  disabled={isLoading}
                >
                  {/* Save & Next */}
                  {isLoading ? "Uploading..." : "Save & Next"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 4 && isFormOpen && (
          <div>
            <div>
              {" "}
              <button
                onClick={() => setIsFormOpen(false)}
                className={styles.close_btn}
              >
                Close
              </button>
            </div>
            <h2 className={styles.review_header}>Review & Submit</h2>
            <div className={styles.review}>
              <div className={styles.review_info}>
                {" "}
                <label>name</label>
                <p>{reviewData.data.application[0].personalDetails.name}</p>
              </div>
              <div className={styles.review_info}>
                {" "}
                <label>email</label>
                <p>{reviewData.data.application[0].personalDetails.email}</p>
              </div>
              <div className={styles.review_info}>
                <label>phoneNumber</label>
                <p>
                  {reviewData.data.application[0].personalDetails.phoneNumber}
                </p>
              </div>
              <div className={styles.review_info}>
                {" "}
                <label>DOB</label>
                <p>
                  {
                    new Date(reviewData.data.application[0].personalDetails.DOB)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>

              <div className={styles.review_info}>
                <label>gender</label>

                <p>{reviewData.data.application[0].personalDetails.gender}</p>
              </div>
              <div className={styles.review_info}>
                {" "}
                <label>materialStatus</label>
                <p>
                  {
                    reviewData.data.application[0].personalDetails
                      .materialStatus
                  }
                </p>
              </div>
            </div>
            <div className={styles.review}>
              <div className={styles.review_info}>
                <label>Institution Name</label>
                <p>
                  {
                    reviewData.data.application[0].academicInformation
                      .collegeName
                  }
                </p>
              </div>
              <div className={styles.review_info}>
                <label>educationLevel</label>
                <p>
                  {
                    reviewData.data.application[0].academicInformation
                      .educationLevel
                  }
                </p>
              </div>
              <div className={styles.review_info}>
                <label>fieldOfStudy</label>
                <p>
                  {
                    reviewData.data.application[0].academicInformation
                      .fieldOfStudy
                  }
                </p>
              </div>
              <div className={styles.review_info}>
                <label>GPA / Percentage</label>

                <p>{reviewData.data.application[0].academicInformation.GPA}</p>
              </div>
              <div className={styles.review_info}>
                <label>yearOfStudy</label>

                <p>
                  {
                    reviewData.data.application[0].academicInformation
                      .yearOfStudy
                  }
                </p>
              </div>
              <div className={styles.review_info}>
                <label>passOutYear</label>

                <p>
                  {
                    reviewData.data.application[0].academicInformation
                      .passOutYear
                  }
                </p>
              </div>
              <div className={styles.review_info}>
                <label>reason</label>

                <p>
                  {reviewData.data.application[0].academicInformation.reason}
                </p>
              </div>
            </div>
            <div>
              <p>
                {/* {checkResultData.data.application[0].uploadDocuments.photo.map(
                  (elem, index) => (
                    <span key={index}>{elem.fileName}</span>
                  )
                )} */}
              </p>
              <p>
                {/* {
                  checkResultData.data. application[0].uploadDocuments
                    .identityProof
                } */}
              </p>
            </div>
            <div>
              {/* <input type="checkbox" />
              <p>
                I hereby declare that all the information provided is true to
                the best of my knowladge
              </p> */}
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.prev_btn}>
                Previous
              </button>
              <button
                // onClick={() => alert("Form Submitted!")}
                // onClick={() => setIsSubmitted(true)}
                onClick={() => {
                  setIsFormOpen(false); // Close the popup
                  setTimeout(() => setIsSubmitted(true), 100);
                }}
                className={styles.save_AndNext_Btn}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

DashForm.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  scholarshipId: PropTypes.string.isRequired,
  isFormOpen: PropTypes.bool.isRequired,
  setIsSubmitted: PropTypes.bool.isRequired,
  checkResultData: PropTypes.shape({
    data: PropTypes.shape({
      application: PropTypes.arrayOf(
        PropTypes.shape({
          personalDetails: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            phoneNumber: PropTypes.string,
            DOB: PropTypes.string,
            gender: PropTypes.string,
            materialStatus: PropTypes.string,
          }),
          academicInformation: PropTypes.shape({
            collegeName: PropTypes.string,
            educationLevel: PropTypes.string,
            fieldOfStudy: PropTypes.string,
            GPA: PropTypes.string,
            yearOfStudy: PropTypes.string,
            passOutYear: PropTypes.string,
            reason: PropTypes.string,
          }),
          uploadDocuments: PropTypes.shape({
            photo: PropTypes.instanceOf(File),
            identityProof: PropTypes.instanceOf(File),
            academicTranscript: PropTypes.instanceOf(File),
            personalStatement: PropTypes.instanceOf(File),
          }),
        })
      ),
    }),
  }),
};

export default DashForm;
