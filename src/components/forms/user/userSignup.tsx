import React, { useState } from "react";
import { useFormik } from "formik";
// import { NavLink } from "react-router-dom";
// import { MdAccountCircle } from "react-icons/md";
import { SignupUser } from "../../../reduxKit/actions/auth/authAction";


import { userSignupValidationSchema } from "../../../validation/user/userSignupValidationSchema"; // Import the validation schema
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";

// Define the form values interface
 export interface SignupFormValues {

  firstName:string
  lastName:string
  fcmToken:string
  phone:string
  country:string
  userName:string
  email:string
  gender:string
}




export const UserRegister: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {loading}=useSelector((state:RootState)=>state.auth)
  const dispatch=useDispatch<AppDispatch>()
  // Formik setup
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      fcmToken: "fcm",
      phone:"",
      country: "",
      userName: "",
      email: "",
      gender: "",
    },

    validationSchema: userSignupValidationSchema,
    onSubmit: async (values:SignupFormValues) => {
      setIsSubmitting(true);
      try {
        console.log("Form submitted successfully with values:", values);
        await dispatch(SignupUser(values))
        // Add your form submission logic here (e.g., API request)
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  }); 

  return (
    <div
      className="flex items-center p-2 justify-center min-h-screen relative overflow-hidden"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 animate-pulse"></div>
      <div className="absolute inset-0 adminlogin-background">
        <div className="background-one relative inset-0 flex justify-center items-start pt-[60px]"></div>
        <div className="background-two"></div>
      </div>

      <div className="relative z-10 flex flex-col bg-white items-center px-[28px] py-[75px] w-full max-w-md admin-login-box">
        <h2
          className="text-3xl font-bold mb-6 text-center text-white animate-bounce"
          style={{ fontFamily: "Unbounded", color: "#24288E" }}
        >
          Create Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "country", label: "Country" },
            { name: "userName", label: "Username" },
            { name: "email", label: "Email Address" },
          ].map((field) => (
            <div className="mb-6" key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-[17px] text-gray-600 mb-[2px]"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                value={formik.values[field.name as keyof SignupFormValues]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-2 py-[10px] text-lg border rounded-lg text-gray-800 focus:ring-2 focus:ring-[#723077] focus:outline-none transition"
              />
              {formik.touched[field.name as keyof SignupFormValues] &&
                formik.errors[field.name as keyof SignupFormValues] && (
                  <div className="text-red-400 text-sm mt-1">
                    {formik.errors[field.name as keyof SignupFormValues]}
                  </div>
                )}
            </div>
          ))}
          <div className="mb-6">
            <label
              htmlFor="gender"
              className="block text-[17px] text-gray-600 mb-[2px]"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-2 py-[10px] text-lg border rounded-lg text-gray-800 focus:ring-2 focus:ring-[#723077] focus:outline-none transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-400 text-sm mt-1">
                {formik.errors.gender}
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-[1000px] text-white font-semibold text-lg hover:shadow-lg hover:scale-105 transform transition"
              style={{ backgroundColor: "#24288E", fontFamily: "Unbounded" }}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};