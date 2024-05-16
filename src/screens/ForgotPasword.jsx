import React from "react";
import { ImageViewer } from "../components/Image";
import { Icon } from "@iconify/react";
import { IconInput } from "../components/IconInput";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { LinkTag } from "../components/Link";
import { LoginFooter } from "../components/Footer";
import { links } from "../data/constants";

export const ForgotPassword = () => {
    return(
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
            <Icon icon={"carbon:password"} className="text-xl" />
          </div>
          <h3 className="text-xl font-normal tracking-tight">Forgot Password</h3>
          <p className="label-text px-10 text-gray-400">We will send you a password reset link to your email. You can reset it by clicking the link in that email. </p>
        </div>

        <div className="px-10 flex flex-col gap-y-4 py-4">
          <IconInput
            type={"email"}
            placeholder={"Email"}
            icon={"clarity:email-solid"}
          />
        </div>
        <div className="px-10 flex flex-col gap-y-4 py-2 w-full">
          <Button text={"Request password reset"} />

          <div className="flex justify-between w-full">
            <LinkTag text={"Login into account"} href={"/login"} />
            <LinkTag text={"Don't have an account? sign up"} href={"/signup"} />
          </div>
        </div>
        <LoginFooter/>
      </div>
    </div>
    );
}