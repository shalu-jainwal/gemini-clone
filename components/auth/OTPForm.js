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
    <div className="card p-6 rounded-xl shadow-xl max-w-md mx-auto">
      {!otpSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("phone", { required: true })}
            placeholder="Phone number"
            className="w-full p-3 rounded-xl border border-gray-400 bg-[var(--card-bg)] text-[var(--text-color)] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <input
            onChange={(e) => verifyOTP(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-3 rounded-xl border border-gray-400 bg-[var(--card-bg)] text-[var(--text-color)] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
      )}
    </div>
  );
}
