import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { IconInput } from "../components/IconInput";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { LinkTag } from "../components/Link";
import { FailedAlert, SuccessAlert } from "../components/Alert";
import { Auth } from "../api/Auth";
import mamcet_logo from '../assets/images/SAC.jpeg';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("new");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setStatus("failed");
      return;
    }

    setLoading(true);
    try {
      const data = await Auth.signInWithEmailAndPassword(email, password);
      setStatus("success");
      console.log(data)
      localStorage.setItem('uid', data?.user?._id);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bgImage h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <div className="text-white rounded-full flex justify-center items-center mx-auto">
            <img src={mamcet_logo} alt="MAMCET" className="w-auto h-28" />
          </div>
          <h3 className="text-lg uppercase leading-6 font-normal mt-4 mb-1">
            Selvamm Arts and Science College
          </h3>
          <h4 className="text-sm uppercase text-blue-500 font-medium tracking-tight">
            Department of Computer Science
          </h4>
          <p className="mt-4 font-medium">Login to ERP</p>
        </div>

        <div className="mb-4">
          {status === "failed" && (
            <FailedAlert text="Invalid email or password!" className="mb-4" />
          )}
          {status === "success" && (
            <SuccessAlert text="You have successfully logged in!" className="mb-4" />
          )}
        </div>

        <div className="flex flex-col gap-y-4">
          <IconInput
            type="email"
            placeholder="Email"
            icon="clarity:email-solid"
            onChange={handleEmailInput}
          />
          <div className="relative">
            <IconInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              icon="mdi:password"
              onChange={handlePasswordInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              <Icon
                icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                className="text-xl"
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <CheckBox text="Remember me" />
            <LinkTag text="Forgot password?" href="/forgot-password" />
          </div>
        </div>

        <div className="mt-6">
          <Button text="Login" onClick={handleLogin} loading={loading} />

          <div className="flex justify-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
              <LinkTag text="Sign up" href="/signup" className="text-primary font-semibold" />
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p className="text-white">&copy; 2024. This is a college research project.</p>
      </footer>
    </div>
  );
};
