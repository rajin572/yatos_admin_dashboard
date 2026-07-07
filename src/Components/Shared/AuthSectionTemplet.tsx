import React from "react";
import AuthSectionLogo from "./AuthSectionLogo";
import GradientCard from "./GradientCard";

const AuthSectionTemplate = ({
  children,
  imageScr,
  skip = false,
  showLogo = false,
}: {
  children: React.ReactNode;
  imageScr: string;
  skip?: boolean;
  showLogo?: boolean;
}) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 relative">
      <div className="lg:col-span-2 min-h-[94vh] flex flex-col justify-center items-center">
        <div className="flex flex-col w-full gap-5 h-full">
          <AuthSectionLogo skip={skip} showLogo={showLogo} />
          <GradientCard from="#99FDFF80" to="#D1B3FF80" withContainer={false} className=" w-full min-h-screen flex flex-col justify-center items-center">
            {children}
          </GradientCard>
        </div>

      </div>
      <div className="lg:col-span-1 w-full">
        <img
          src={imageScr}
          alt="Auth Background"
          width={2000}
          height={2000}
          className="hidden lg:block w-1/3 h-screen fixed top-0  object-cover"
        />
      </div>
    </div>

  );
};

export default AuthSectionTemplate;
