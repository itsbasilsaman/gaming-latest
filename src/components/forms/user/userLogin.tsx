import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/gaminggate-logo.png'
 
import { loginUser } from "../../../reduxKit/actions/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

  const UserLogin: React.FC = React.memo(() => {
  const [inputValue, setInputValue] = useState<string>("");  
  const [countryCode, setCountryCode] = useState<string>("");  
  const [inputType, setInputType] = useState<"email" | "phone" | null>(null);  
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

        const response= await dispatch(loginUser(payload)).unwrap()
         toast.success(response.message);

       
    

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
    <div className=" md:h-[100vh] h-full   grid grid-rows-5 bg-white">
      <div className="lg:row-span-2  primary-background relative h-[100px] lg:h-auto flex items-center">
        <div className="flex pl-2 lg:pl-0 lg:justify-center items-center lg:absolute  lg:top-16 lg:left-1/2 lg:-translate-x-1/2">
          <img src={Logo}   className="w-[80px]   h-[60px]   object-cover" />
          <span className="lg:text-[24px]" style={{ fontFamily: "Unbounded", color: "white" }}>GAME GATE</span>
        </div>
      </div> 
      <div className="row-span-5 lg:bg-white flex items-center justify-center">
     
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[530px] px-4 sm:px-6 py-12">
          <div className="relative z-10 flex flex-col affiliate-section rounded-[12px] items-center px-4 sm:px-8 pb-[65px] pt-12 w-full bg-white border-gray-300 border">
            <h2
              className="text-[20px] sm:text-[24px] font-bold mb-7 mt-3 text-center primary-color"
              style={{ fontFamily: "Unbounded" }}
            >
              Welcome back!
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="input"
                  className="block text-[15px] sm:text-[17px] text-gray-700 mb-2"
                >
                  {inputType === "phone" ? "Phone Number or Email " : "Email or Phone Number"}
                </label>
                <div className="flex items-center border border-gray-300 rounded-[6px]">
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
                  <input
  type="text"
  value={inputValue}
  onChange={(e) => handleInputChange(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();  
      handleSubmit(e);  
    }
  }}
  placeholder={inputType === "phone" ? "Enter phone number " : "Enter email address"}
  className="w-full px-3 py-3 text-lg rounded-[6px]"
/>
                </div>
                {errors.input && (
                  <div className="text-red-400 text-sm mt-1">{errors.input}</div>
                )}
              </div>

              <div className="text-center mt-4">
  <div className="flex flex-col sm:flex-row gap-2">
    <Link to={'/'} className="w-full order-2 sm:order-1">
      <button
        className="w-full px-6 py-3 border border-gray-300 rounded-[6px] font-semibold transform transition"
        style={{ fontFamily: "Unbounded" }}
      >
        Later
      </button>
    </Link>
    <button
      type="submit"
      className="w-full px-6 py-3 rounded-[6px] primary-background text-white font-semibold transform transition order-1 sm:order-2"
      style={{ fontFamily: "Unbounded" }}
    >
      {loading ? "Sending OTP..." : "Login"}
    </button>
  </div>
</div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
});

export default UserLogin
