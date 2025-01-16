import React, { useState } from "react";
import "react-phone-number-input/style.css"; 
import { NavLink } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

export const UserLogin: React.FC = React.memo(() => {
  const [inputValue, setInputValue] = useState<string>(""); // Phone number or email input value
  const [countryCode, setCountryCode] = useState<string>("IN"); // Default country code
  const [inputType, setInputType] = useState<"email" | "phone" | null>(null); // Track the type of input
  const [errors, setErrors] = useState<{ input?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    setIsSubmitting(true);

    try {
      console.log("Input Value:", inputValue);
      console.log("Country Code:", countryCode);
 
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div className="absolute inset-0 adminlogin-background"></div>

 
      <div className="relative z-10 flex flex-col bg-white items-center px-6 py-8 w-full max-w-md admin-login-box">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "Unbounded", color: "#24288E" }}
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
               
                  <option value="IN">+91</option>
                  <option value="US">+1</option>
                  <option value="UK">+44</option>
             
                </select>
              )}

              {/* Email or Phone Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={inputType === "phone" ? "Enter phone number " : "Enter email address"}
                className="w-full px-3 py-2 text-lg border-none focus:outline-none"
              />
            </div>

            {errors.input && (
              <div className="text-red-400 text-sm mt-1">{errors.input}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-[1000px] text-white font-semibold text-lg hover:shadow-lg hover:scale-105 transform transition"
              style={{ backgroundColor: "#24288E", fontFamily: "Unbounded" }}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>

            <div className="flex justify-center items-center mt-5">
              <div className="line"></div>
              <p className="text-[17px] mx-3 text-gray-700">or</p>
              <div className="line"></div>
            </div>

            <span className="mt-4 flex gap-2 justify-center items-center text-gray-950">
              <MdAccountCircle style={{ color: "#24288E" }} className="text-lg" />
              Don't have an account?{" "}
              <NavLink
                to="/user/signup"
                className="text-blue-600 uppercase text-sm font-medium"
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
