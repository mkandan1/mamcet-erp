import React, { useState } from "react";
import { ImageViewer } from "../components/Image";
import { Icon } from "@iconify/react";
import { IconInput } from "../components/IconInput";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { LinkTag } from "../components/Link";
import { LoginFooter } from "../components/Footer";
import { links } from "../data/constants";
import { FailedAlert, SuccessAlert } from "../components/Alert";
import { Auth } from "../../api/Auth";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState("new");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email == undefined || password == undefined) {
      setStatus("failed");
      return;
    }

    await Auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("failed");
      });
  };
  return (
    <div className="w-screen flex">
      <div className="hidden md:block md:w-[50%] bg-cover bg-left-top lg:w-[65%]">
        <ImageViewer src={links.loginHeroImage} alt="login background image" />
      </div>
      <div className="w-[100%] md:w-[50%] lg:w-[35%] h-screen py-20 relative">
        <div className="w-full flex flex-col gap-2 items-center py-5">
          <div className="bg-primary text-white rounded-full flex justify-center items-center w-10 h-10">
            <Icon icon={"material-symbols:lock-outline"} className="text-xl" />
          </div>
          <h3 className="text-xl font-normal tracking-tight">Sign In</h3>
        </div>

        {status == "failed" ? (
          <FailedAlert text={"Invalid email or password!"} />
        ) : (
          <></>
        )}
        {status == "success" ? (
          <SuccessAlert text={"You have successfully logged in!"} />
        ) : (
          <></>
        )}

        <div className="px-10 flex flex-col gap-y-4 py-4">
          <IconInput
            type={"email"}
            placeholder={"Email"}
            icon={"clarity:email-solid"}
            onChange={(e) => handleEmailInput(e)}
          />
          <IconInput
            type={"password"}
            placeholder={"Password"}
            icon={"mdi:password"}
            onChange={(e) => handlePasswordInput(e)}
          />
          <CheckBox text={"Remember me"} />
        </div>
        <div className="px-10 flex flex-col gap-y-4 py-2 w-full">
          <Button text={"Login"} onClick={() => handleLogin()} />

          <div className="flex justify-between w-full">
            <LinkTag text={"Forgot password?"} href={"/forgot-password"} />
            <LinkTag text={"Don't have an account? sign up"} href={"/signup"} />
          </div>
        </div>
        <LoginFooter />
      </div>
    </div>
  );
};
