"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function OTPForm({ onVerify }) {
  const { register, handleSubmit } = useForm();
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = (data) => {
    toast.info("Sending OTP...");
    setTimeout(() => {
      toast.success("OTP sent! Enter 1234");
      setOtpSent(true);
    }, 2000);
  };

  const verifyOTP = (otp) => {
    if (otp === "1234") {
      toast.success("OTP Verified");
      onVerify();
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <>
      {!otpSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("phone", { required: true })}
            placeholder="Phone number"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <input
            onChange={(e) => verifyOTP(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 rounded w-full"
          />
        </div>
      )}
    </>
  );
}
