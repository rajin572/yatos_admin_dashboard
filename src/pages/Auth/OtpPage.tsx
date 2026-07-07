"use client";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/Components/ui/button";
import GradientCard from "@/Components/Shared/GradientCard";
import { TbMailFilled } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";;
// import { useForgetOtpVerifyMutation, useResendForgetOTPMutation } from "@/redux/features/auth/authApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const forgottenEmail = JSON.parse(
    Cookies.get("yatos_main_forgetEmail") || "null"
  );

  // const [otpMatch] = useForgetOtpVerifyMutation();
  // const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 6) {
      // const res = await tryCatchWrapper(
      //   otpMatch,
      //   { body: { otp: otp } },
      //   { toastLoadingMessage: "Verifying OTP..." }
      // );
      // if (res?.statusCode === 200) {
      //   Cookies.remove("yatos_main_forgetToken");
      //   Cookies.remove("yatos_main_forgetEmail");
      //   Cookies.set(
      //     "yatos_main_forgetOtpMatchToken",
      //     res.data,
      //     {
      //       path: "/",
      //       expires: 1,
      //     }
      //   );

      setOtp("");
      router("/update-password");
      // }
    }
  };

  const handleResendOtp = async () => {
    // await tryCatchWrapper(
    //   resendOtp,
    //   {
    //     body: {
    //       purpose: "forget-password",
    //     },
    //   },
    //   { toastLoadingMessage: "Resending OTP..." }
    // );
  };

  return (
    <GradientCard from="#2C1C4320" to="#D1B3FF80" className="min-h-screen flex items-center justify-center w-full!" withContainer={false}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 relative z-10 max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="flex flex-col items-center gap-5 sm:gap-6 lg:gap-8 text-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-secondary-color/10 flex items-center justify-center">
              <TbMailFilled className="size-5 sm:size-6 lg:size-7 text-secondary-color" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-color">Check your email</h1>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                We sent a OTP to your email address{" "}
                <span className="text-secondary-color font-bold">{" "}{forgottenEmail}</span>
              </p>
            </div>
          </div>

          <div className="bg-transparent w-full">
            <div className="flex justify-center items-center">
              <OTPInput
                inputStyle="!w-[30px] h-[40px] md:!w-[60px] md:!h-[70px] text-[20px] sm:text-[30px] !bg-primary-color border !border-base-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} required />}
              />
            </div>

            <Button
              onClick={handleOTPSubmit}
              className="py-5 text-base cursor-pointer w-full mt-10"
            >
              Verify OTP
            </Button>
          </div>

          {/* Resend */}
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
            Didn't receive the email?{" "}
            <span
              onClick={handleResendOtp}
              className="text-secondary-color font-semibold cursor-pointer hover:underline"
            >
              Click to resend
            </span>
          </p>

          {/* Back */}
          <Link
            to="/sign-in"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-base-color transition-colors"
          >
            <FaArrowLeftLong className="size-3 sm:size-3.5" />
            Back to log in
          </Link>
        </div>
      </div>
    </GradientCard>
  );
};
export default OTPVerify;
