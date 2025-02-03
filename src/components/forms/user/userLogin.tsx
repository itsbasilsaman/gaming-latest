import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { loginUser } from "../../../reduxKit/actions/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

  const UserLogin: React.FC = React.memo(() => {
  const [inputValue, setInputValue] = useState<string>(""); // Phone number or email input value
  const [countryCode, setCountryCode] = useState<string>(""); // Default country code
  const [inputType, setInputType] = useState<"email" | "phone" | null>(null); // Track the type of input
  const [errors, setErrors] = useState<{ input?: string }>({});
  const {loading}=useSelector((state:RootState)=> state.auth)

const dispatch=useDispatch<AppDispatch>()
const navigate= useNavigate()
  // Handle input change (email or phone)
  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setInputType("email");
    } else if (/^\d+$/.test(value)) {
      setInputType("phone");
    } else {
      setInputType(null);
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputValue) {
      setErrors({ input: "This field is required" });
      return;
    }
    if (inputType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        setErrors({ input: "Please enter a valid email address" });
        return;
      }
    } else if (inputType === "phone") {
      if (!inputValue || !/^\d+$/.test(inputValue)) {
        setErrors({ input: "Please enter a valid phone number" });
        return;
      }
    }
    setErrors({});

    try {
      const payload = {
        contact: inputType === "phone" ? `+${countryCode}${inputValue}` : inputValue,
        type: inputType === "phone" ? "PHONE" : "EMAIL",
      };

      const Type=payload.type
      console.log("Payloadhihih:", payload,inputValue);
         await dispatch(loginUser(payload)).unwrap()
         toast.success("Otp Sented Successfully");
        navigate(`/user/emailVerification?inputValue=${encodeURIComponent(inputValue)}&type=${Type}`);
    
      // Add logic to send the payload to your backend
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#fff', // Light red background for an error message
        color: '#721c24', // Darker red text color for better readability
        iconColor: '#f44336', // Custom color for the icon
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on hover
          toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown' // Animation when the toast appears
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp' // Animation when the toast disappears
        }
      });
    } 
  };



  return (
    <div
      className="flex items-center p-2 justify-center min-h-screen user-background relative overflow-hidden"
    
    >
      <div className="absolute inset-0 animate-pulse"></div>
      <div className="absolute inset-0 adminlogin-background"></div>

      <div className="relative z-10 flex flex-col affiliate-section rounded-[13px] items-center px-6 py-10 w-full max-w-md ">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "Unbounded", color: "white" }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="input"
              className="block text-[17px] text-gray-600 mb-2"
            >
              {inputType === "phone" ? "Phone Number or Email " : "Email or Phone Number"}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              {inputType === "phone" && (
                <select
                  value={countryCode}
                  onChange={(e) => handleCountryCodeChange(e.target.value)}
                  className="px-3 py-2 text-lg border-r border-gray-300 focus:outline-none"
                >
                  <option value="91">+91</option>
                  <option value="1">+1</option>
                  <option value="44">+44</option>
                </select>
              )}
              {/* Email or Phone Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={inputType === "phone" ? "Enter phone number " : "Enter email address"}
                className="w-full px-3 py-3 text-lg rounded-[6px] focus:outline-none"
              />
            </div>

            {errors.input && (
              <div className="text-red-400 text-sm mt-1">{errors.input}</div>
            )}
          </div>


         
          <div className="text-center mt-4">
            <button
              type="submit"
             
              className="w-full px-6 py-3 rounded-[6px] text-white font-semibold text-lg    transform transition"
              style={{ backgroundColor: "#24288E", fontFamily: "Unbounded" }}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <div className="flex justify-center items-center mt-5">
              <div className="line text-gray-200"  ></div>
              <p className="text-[17px] mx-3 text-gray-200">or</p>
              <div className="line  text-gray-200"></div>
            </div>

            <span className="mt-4 flex gap-2 justify-center items-center text-white">
              <MdAccountCircle style={{ color: "#24288E" }} className="text-lg" />
              Don't have an account?{" "}
              <NavLink
                to="/user/signup"
                className="text-blue-950   text-sm font-medium hover:underline"
              >
                Sign Up
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});

export default UserLogin
