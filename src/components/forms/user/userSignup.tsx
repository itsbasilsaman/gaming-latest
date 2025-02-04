import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AxiosError } from "axios"; // Import AxiosError for error typing

import { SignupUser } from "../../../reduxKit/actions/auth/authAction";
import { userSignupValidationSchema } from "../../../validation/user/userSignupValidationSchema";
import { AppDispatch, RootState } from "../../../reduxKit/store";

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  fcmToken: string;
  phone: string;
  country: string;
  userName: string;
  email: string;
  gender: string;
}

const UserRegister: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Formik setup
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      fcmToken: "fcm",
      phone: "",
      country: "",
      userName: "",
      email: "",
      gender: "",
    },
    validationSchema: userSignupValidationSchema,
    onSubmit: async (values: SignupFormValues) => {
      setIsSubmitting(true);
      try {
        const response = await dispatch(SignupUser(values)).unwrap();
        toast.success(response.message);
        navigate("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle Axios specific error
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.response?.data.message || "Something went wrong",
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            timerProgressBar: true,
            background: "#fff",
            color: "#721c24",
            iconColor: "#f44336",
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
            showClass: { popup: "animate__animated animate__fadeInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" },
          });
        } else {
          // Handle other errors
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An unknown error occurred.",
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            timerProgressBar: true,
            background: "#fff",
            color: "#721c24",
            iconColor: "#f44336",
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
            showClass: { popup: "animate__animated animate__fadeInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" },
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen user-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10  affiliate-section  px-8 py-10 rounded-[24px]   w-full max-w-lg md:max-w-3xl lg:max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6 py-3"  style={{fontFamily:"Unbounded"}}>
          Create Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "firstName", label: "First Name" , placeholder:'Your First Name' },
              { name: "lastName", label: "Last Name" ,placeholder:'Your Last Name'  },
              { name: "country", label: "Country" , placeholder:'Your Country' },
              { name: "userName", label: "Username" , placeholder:'Enter Your Username' },
              { name: "email", label: "Email " , placeholder:'email@example.com' },
              { name: "phone", label: "Phone Number" , placeholder:'(123) 456-7890' },
            ].map((field) => (
              <div key={field.name}  >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-white"
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
                  placeholder={field.placeholder}
                  className="w-full px-3 py-3 pl-4 border rounded-[3px]  mt-[8px] focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                {formik.touched[field.name as keyof SignupFormValues] &&
                  formik.errors[field.name as keyof SignupFormValues] && (
                    <p className="text-[14px] text-red-400 mt-1 ">
                      {formik.errors[field.name as keyof SignupFormValues]}
                    </p>
                  )}
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-3 border rounded-[3px] mt-[8px] cursor-pointer    focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option   value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-sm text-red-800 mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full px-4 py-3 bg-blue-950 text-white text-[17px] font-semibold rounded-md hover:bg-blue-900 transition"
            >
              {loading ? "Submitting..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
