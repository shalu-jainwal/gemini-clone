"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import CountryCodeSelect from "../../components/auth/CountryCodeSelect";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
   const [countryCode, setCountryCode] = useState("");

  const onSubmit = () => {
    toast.info("Sending OTP...");
    setTimeout(() => {
      toast.success("OTP sent! Enter 1234 to verify");
      setOtpSent(true);
    }, 2000);
  };

  const verifyOTP = () => {
    if (otpInput === "1234") {
      dispatch(login({ phone: "user-phone", id: Date.now() }));
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
  
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
       <div className="chat-container backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md border border-[var(--input-border)] bg-[var(--card-bg)]">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--text-color)" }}>
            🚀 Gemini Chat Login
          </h2>

          {!otpSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <CountryCodeSelect
                value={countryCode}
                onChange={setCountryCode}
              />
              <input
                {...register("phone", { required: true, minLength: 6 })}
               className="w-full border border-gray-600 bg-white text-black placeholder-gray-500 placeholder-opacity-100 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:placeholder-opacity-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="📱 Enter phone number"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold tracking-wide transition"
                disabled={!countryCode}
              >
                Send OTP
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <input
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full border border-gray-600 bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="🔐 Enter OTP"
              />
              <button
                onClick={verifyOTP}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold tracking-wide transition"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block w-full md:w-1/2 relative">
        <Image
          src="/images/login-robot.jpg"
          alt="Robot using laptop"
          fill
          className="object-cover"
          priority
        />
       <div className="absolute inset-0 bg-gradient-to-l from-gray-100/70 to-transparent dark:from-gray-900/70" />
      </div>
    </div>
  );
}
