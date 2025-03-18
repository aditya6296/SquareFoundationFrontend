import { useEffect, useState } from "react";
import styles from "./dashForm.module.css";
import usePersonalForm from "../../hooks/usePersonalForm";
import PropTypes from "prop-types";
import useAcademicForm from "../../hooks/useAcademicForm";
import useUploadFile from "../../hooks/useUploadFile";
import { toast } from "react-toastify";

function DashForm({ setIsFormOpen, scholarshipId, checkResultData }) {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({
    // name: "",
    // email: "",
    // phoneNumber: "",
    // DOB: "",
    // gender: "",
    // materialStatus: "",
  });
  const [stepPage, setStepPage] = useState(1);
  const totalSteps = 4; // Total steps in the form
  const { personalDetail, getPersonalDetail } = usePersonalForm();
  const { academicDetail } = useAcademicForm();
  const { uploadFile } = useUploadFile();

  const [academicData, setAcademicData] = useState({});
  const [educationLevel, setEducationLevel] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [isFile, setIsFile] = useState(null);
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

  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
    setFieldOfStudy("");
  };

  // 🟢 Auto-fill the form when checkResultData is available
  useEffect(() => {
    if (
      checkResultData?.data?.application?.[0]?.personalDetails ||
      checkResultData?.data?.application?.[0]?.academicInformation
    ) {
      console.log(
        "checkResultData updated: at dashform in useeffect",
        checkResultData.data.application[0].personalDetails.name
      );
      console.log(
        "checkResultData updated: at dashform in useeffect academicInformation ",
        checkResultData.data.application[0].academicInformation.collegeName
      );
      setPersonalData((prev) => ({
        ...prev, //Keeps previous values in case some fields in checkResultData are missing.
        name:
          checkResultData.data.application[0].personalDetails.name || prev.name,
        email:
          checkResultData.data.application[0].personalDetails.email ||
          prev.email,
        phoneNumber:
          checkResultData.data.application[0].personalDetails.phoneNumber ||
          prev.phoneNumber,
        DOB:
          checkResultData.data.application[0].personalDetails.DOB || prev.DOB,
        gender:
          checkResultData.data.application[0].personalDetails.gender ||
          prev.gender,
        materialStatus:
          checkResultData.data.application[0].personalDetails.materialStatus ||
          prev.materialStatus,
      }));
      setAcademicData((prev) => ({
        ...prev,
        collegeName:
          checkResultData.data.application[0].academicInformation.collegeName ||
          prev.collegeName,
        educationLevel:
          checkResultData.data.application[0].academicInformation
            .educationLevel || prev.educationLevel,

        fieldOfStudy:
          checkResultData.data.application[0].academicInformation
            .fieldOfStudy || prev.fieldOfStudy,

        GPA:
          checkResultData.data.application[0].academicInformation.GPA ||
          prev.GPA,

        yearOfStudy:
          checkResultData.data.application[0].academicInformation.yearOfStudy ||
          prev.yearOfStudy,

        passOutYear:
          checkResultData.data.application[0].academicInformation.passOutYear ||
          prev.passOutYear,

        reason:
          checkResultData.data.application[0].academicInformation.reason ||
          prev.reason,
      }));
      // Directly update `fieldOfStudy` state to match the academic data
    }
  }, [checkResultData]); // Runs when checkResultData updates

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
      setIsFile((prev) => ({ ...prev, [name]: files[0] }));
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
    const formAcademicData = {
      collegeName: e.target[0].value,
      educationLevel: e.target[1].value,
      fieldOfStudy: e.target[2].value,
      GPA: e.target[3].value,
      yearOfStudy: e.target[4].value,
      passOutYear: e.target[5].value,
      reason: e.target[6].value,
    };
    console.log("📌 Submitted Academic Data:", formAcademicData);
    await academicDetail(formAcademicData, scholarshipId);
    nextStep();
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!isFile) {
      toast.error("Please select a file !");
      return;
    }

    const formData = new FormData();
    formData.append("file", isFile);

    uploadFile(scholarshipId, formData);
    nextStep();
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
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={personalData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_container}>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone"
                value={personalData.phoneNumber || ""}
                onChange={handleChange}
              />
              <input
                type="date"
                name="DOB"
                placeholder="DOB"
                value={personalData.DOB || ""}
                onChange={handleChange}
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
            <div className={styles.input_container}>
              <select
                name="gender"
                className={styles.gender_dropdown}
                value={personalData.gender || ""}
                onChange={handleChange}
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
              >
                <option value="">Material Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit">Save & Next</button>
          </form>
        )}

        {step === 2 && (
          <form className={styles.form} onSubmit={handleAcademicDetails}>
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
                value={academicData.educationLevel || ""}
                onChange={(e) => {
                  handleChange(e);
                  handleEducationLevelChange(e);
                }}
                required
              >
                <option value="">Select Current Education Level</option>
                {Object.keys(fieldOptions).map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className={styles.input_container}>
              {console.log("academicData :", academicData)}
              <select
                name="fieldOfStudy"
                className={styles.educationLevel_dropdown}
                value={academicData.fieldOfStudy || ""}
                onChange={(e) => {
                  handleChange(e);
                }}
                // disabled={!educationLevel} // Disable if no education level is selected
                required
              >
                <option value="">Select Field Of Study</option>
                {academicData.educationLevel &&
                  fieldOptions[academicData.educationLevel].map((field) => (
                    <option key={field}>{field}</option>
                  ))}
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
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit">Save & Next</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className={styles.form} onSubmit={handleUpload}>
            <h2>Upload Documents</h2>
            <input
              type="file"
              name="file"
              // value={isFile.file}
              onChange={handleChange}
            />
            {/* onChange={handleFileChange} */}
            <div className={styles.buttonGroup}>
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit">Save & Next</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2>Review & Submit</h2>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep}>Previous</button>
              <button onClick={() => alert("Form Submitted!")}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// DashForm.propTypes = {
//   setIsFormOpen: PropTypes.func.isRequired,
//   scholarshipId: PropTypes.string.isRequired,
//   checkResultData: PropTypes.shape({
//     data: PropTypes.shape({
//       application: PropTypes.arrayOf(
//         PropTypes.shape({
//           personalDetails: PropTypes.shape({
//             name: PropTypes.string,
//             email: PropTypes.string,
//             phoneNumber: PropTypes.string,
//             DOB: PropTypes.string,
//             gender: PropTypes.string,
//             materialStatus: PropTypes.string,
//           }),
//         }),
//         PropTypes.shape({
//           academicInformation: PropTypes.shape({
//             collegeName: PropTypes.string,
//             educationLevel: PropTypes.string,
//             fieldOfStudy: PropTypes.string,
//             GPA: PropTypes.string,
//             yearOfStudy: PropTypes.string,
//             passOutYear: PropTypes.string,
//             reason: PropTypes.string,
//           }),
//         })
//       ),
//     }),
//   }),
// };

DashForm.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  scholarshipId: PropTypes.string.isRequired,
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
        })
      ),
    }),
  }),
};

export default DashForm;
