"use client";
import GradientCard from "@/Components/Shared/GradientCard";
import { Button } from "@/Components/ui/button";
import { FormInput } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { FieldGroup } from "@/Components/ui/field";
import useUserData from "@/hooks/useUserData";
// import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
// import Cookies from "js-cookie";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";


const forgetPassSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
});

const ForgotPassword = () => {
    const form = useForm({
        resolver: zodResolver(forgetPassSchema),
        defaultValues: {
            email: "",
        },
    });

    const router = useNavigate();
    const userExist = useUserData();
    // const [forgetPassword] = useForgetPasswordMutation();

    useEffect(() => {
        if (userExist?.role === "admin") {
            router("/", { replace: true });
        }
    }, [router, userExist]);

    const onFinish = async (_data: z.infer<typeof forgetPassSchema>) => {
        // const res = await tryCatchWrapper(
        //     forgetPassword,
        //     { body: _data },
        //     {
        //         toastLoadingMessage: "Sending OTP...",
        //     }
        // );
        // if (res?.statusCode === 200) {
        //     form.reset();
        //     Cookies?.remove("yatos_main_forgetOtpMatchToken")
        //     Cookies.set("yatos_main_forgetToken", res.data.forgetToken, {
        //         path: "/",
        //         expires: 1,
        //     });
        //     Cookies.set(
        //         "yatos_main_forgetEmail",
        //         JSON.stringify(_data.email),
        //         {
        //             path: "/",
        //             expires: 1,
        //         }
        //     );
        //     router("/forgot-password/otp-verify");
        // }
        form.reset();
        router("/forgot-password/otp-verify");
    };
    return (
        <GradientCard from="#2C1C4320" to="#D1B3FF80" className="min-h-screen flex items-center justify-center w-full!" withContainer={false}>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 relative z-10 max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-secondary-color/10 flex items-center justify-center">
                            <TbMailFilled className="size-5 sm:size-6 lg:size-7 text-secondary-color" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color">Forgot password?</h1>
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-2">No worries, we'll send you reset instructions.</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onFinish)}>
                        <FieldGroup>
                            <FormInput
                                prefix={<MdOutlineEmail size={18} />}
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                inputClassName="py-4! sm:py-5!"
                            />
                            <Button variant="secondary" className="w-full py-4 sm:py-5 text-sm sm:text-base lg:text-lg" type="submit">
                                Reset password
                            </Button>
                        </FieldGroup>
                    </form>

                    {/* Footer */}
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
export default ForgotPassword;
