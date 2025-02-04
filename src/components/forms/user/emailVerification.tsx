import React, { useState, useEffect } from "react";
import {
  verifiyOtpUser,
  loginUser,
} from "../../../reduxKit/actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IVerifyOtp } from "../../../interfaces/user/userLoginInterfaces";
import toast from "react-hot-toast";

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [Content, setContent] = useState<string | null>("");
  const [Type, setType] = useState<string | null>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const inputValue: string | null = searchParams.get("inputValue");
  const type: string | null = searchParams.get("type");

  // Handle OTP input change
  const handleInputChange = (value: string, index: number): void => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure single-digit input
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  useEffect(() => {
    setContent(inputValue);
    setType(type);
  }, [inputValue, type]);

  // Handle backspace key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-input-${index - 1}`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (!/^\d+$/.test(pasteData)) return; // Allow only numeric input

    const newOtp = pasteData.split("").concat(otp.slice(pasteData.length));
    setOtp(newOtp.slice(0, otp.length));

    // Automatically focus on the last filled input
    const lastFilledIndex = pasteData.length - 1;
    const nextInput = document.getElementById(
      `otp-input-${lastFilledIndex}`
    ) as HTMLInputElement;
    nextInput?.focus();
  };
  // Handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [timer]);

  // Resend OTP
  const handleResend = () => {
    if (!Content || !Type) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Contact and Type are required fields!",
      });
      return;
    }

    setOtp(["", "", "", "", "", ""]);
    const payload = {
      contact: Content,
      type: Type,
    };
    dispatch(loginUser(payload));
    toast.success("OTP Resend Successfull");
  };
  // Handle OTP submission
  const handleSubmit = async (): Promise<void> => {
    const otpCode = otp.join("");
    const payload: IVerifyOtp = {
      contact: Content, // Provide the appropriate content value
      otp: otpCode,
      fcmToken: "fcm",
    };
    try {
      const data = await dispatch(verifiyOtpUser(payload)).unwrap();
      console.log("The OTP verification response:", data);
      if (data?.data?.accessToken) {
        toast.success("OTP successfully verified");
        navigate("/");
      } else {
        navigate("/user/signup");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text:
          (error as { message: string })?.message ||
          "Failed to verify OTP. Please try again.",
      });
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
      {/* Background Animation */}
      <div className="absolute inset-0 animate-pulse"></div>
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 adminlogin-background">
        <div className="background-one relative inset-0 flex justify-center items-start pt-[60px]">
          {/* Placeholder for logo */}
        </div>
        <div className="background-two bg-white"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-col bg-white items-center px-[28px] py-[45px] w-full max-w-md admin-login-box">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm p-8 bg-white rounded-lg">
            <h2
              className="text-[23px] font-bold mb-6 text-center text-white animate-bouncetext-center"
              style={{ fontFamily: "Unbounded", color: "#24288E" }}
            >
              Email OTP
            </h2>

            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <p className="mb-6 text-center text-sm text-gray-500">
              Request in{" "}
              {timer > 0 ? (
                `${timer} sec`
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:underline"
                >
                  Resend
                </button>
              )}
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() =>
                  Swal.fire("Cancelled", "OTP submission cancelled.", "info")
                }
              >
                Cancel
              </button>
              <button
                disabled={otp.some((digit) => digit === "")}
                className={`px-4 py-2 font-semibold text-white rounded ${
                  otp.some((digit) => digit === "")
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleSubmit}
              >
                {loading ? "Verifying ..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
