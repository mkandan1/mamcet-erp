import React from "react";
import { ImageViewer } from "../components/Image";
import { Icon } from "@iconify/react";
import { IconInput } from "../components/IconInput";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { LinkTag } from "../components/Link";
import { LoginFooter } from "../components/Footer";
import { links } from "../data/constants";

export const Login = () => {
  return (
    <div className="w-screen flex">
      <div className="hidden md:block md:w-[50%] bg-cover bg-left-top lg:w-[65%]">
        <ImageViewer
          src={links.loginHeroImage}
          alt="login background image"
        />
      </div>
      <div className="w-[100%] md:w-[50%] lg:w-[35%] h-screen py-20 relative">
        <div className="w-full flex flex-col gap-2 items-center py-5">
          <div class="bg-primary text-white rounded-full flex justify-center items-center w-10 h-10">
            <Icon icon={"material-symbols:lock-outline"} className="text-xl" />
          </div>
          <h3 className="text-xl font-normal tracking-tight">Sign In</h3>
        </div>

        <div className="px-10 flex flex-col gap-y-4 py-4">
          <IconInput
            type={"email"}
            placeholder={"Email"}
            icon={"clarity:email-solid"}
          />
          <IconInput
            type={"password"}
            placeholder={"Password"}
            icon={"mdi:password"}
          />
          <CheckBox text={"Remember me"} />
        </div>
        <div className="px-10 flex flex-col gap-y-4 py-2 w-full">
          <Button text={"Login"} />

          <div className="flex justify-between w-full">
            <LinkTag text={"Forgot password?"} href={"/forgot-password"} />
            <LinkTag text={"Don't have an account? sign up"} href={"/signup"} />
          </div>
        </div>
        <LoginFooter/>
      </div>
    </div>
  );
};
