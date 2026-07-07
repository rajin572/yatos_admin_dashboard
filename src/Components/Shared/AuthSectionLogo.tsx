import { AllImages } from "@/assets/AllImages";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthSectionLogo = ({
  skip = false,
  showLogo = false,
}: {
  skip?: boolean;
  showLogo?: boolean;
}) => {
  return (
    <div className={`${skip ? "hidden" : "block"} mt-10`}>
      {showLogo ? (
        <Link to="/join">
          <img
            src={AllImages.logo}
            alt="Frafol Logo"
            width={1000}
            height={1000}
            className="w-40 h-auto"
          />
        </Link>
      ) : (
        <div className="">
          <IoIosArrowRoundBack
            onClick={() => window.history.back()}
            className="text-3xl text-secondary-color font-extrabold cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default AuthSectionLogo;
