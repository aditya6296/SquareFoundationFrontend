import { useState } from "react";
import styles from "./ScholarshipForm.module.css";
import useForm from "../../hooks/useForm";

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    institution: "",
    educationLevel: "",
    fieldOfStudy: "",
    gpa: "",
    reason: "",
    photo: null,
    identityProof: null,
    transcripts: null,
    personalStatement: null,
    declaration: false,
  });

  const { form } = useForm();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert("Please accept the declaration to proceed.");
      return;
    }
    console.log("Form Submitted:", formData);
    form({ formData });
    alert("Application submitted successfully!");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Bright Future Scholarship Application</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Personal Information */}
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        {/* Academic Details */}
        <h3 className={styles.sectionTitle}>Academic Details</h3>
        <input
          type="text"
          name="institution"
          placeholder="Enter Your Current Institution Name"
          value={formData.institution}
          onChange={handleChange}
          // required
        />
        <input
          type="text"
          name="educationLevel"
          placeholder="Enter Your Current Education Level"
          value={formData.educationLevel}
          onChange={handleChange}
          // required
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Enter Your Field of Study"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          // required
        />
        <input
          type="text"
          name="gpa"
          placeholder="Enter Your GPA/Percentage"
          value={formData.gpa}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Why are you applying for this scholarship?"
          value={formData.reason}
          onChange={handleChange}
          // required
        ></textarea>

        {/* Upload Documents */}
        <h3 className={styles.sectionTitle}>Upload Documents</h3>
        <label>Upload Your Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} />
        <label>Upload Your Proof of Identity</label>
        <input
          type="file"
          name="identityProof"
          onChange={handleFileChange}
          // required
        />
        <label>Upload Your Academic Transcripts</label>
        <input
          type="file"
          name="transcripts"
          onChange={handleFileChange}
          // required
        />
        <label>Upload Your Personal Statement</label>
        <input
          type="file"
          name="personalStatement"
          onChange={handleFileChange}
          // required
        />

        {/* Declaration */}
        <div className={styles.declaration}>
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={handleChange}
            // required
          />
          <label>
            I hereby declare that all the information provided is true to the
            best of my knowledge.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ScholarshipForm;
