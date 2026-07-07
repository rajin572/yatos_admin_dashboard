import { AllImages } from "@/assets/AllImages";
import GradientCard from "@/Components/Shared/GradientCard";
import { Button } from "@/Components/ui/button";
import { FormInput, FormPassword } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { FieldGroup } from "@/Components/ui/field";
import useUserData from "@/hooks/useUserData";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
// import Cookies from "js-cookie";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import z from "zod";

const signInSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

const SignIn = () => {
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useNavigate();

    // const [login] = useLoginMutation();

    const userExist = useUserData();

    useEffect(() => {
        if (userExist?.role === "admin") {
            router("/", { replace: true });
        }
    }, [router, userExist]);

    const onFinish = async (_data: z.infer<typeof signInSchema>) => {
        // const res = await tryCatchWrapper(login, { body: _data }, { toastLoadingMessage: "Signing in..." });
        // if (res?.statusCode === 200 && res?.data?.user?.role === "admin") {
        //     Cookies.remove("yatos_main_forgetToken");
        //     Cookies.remove("yatos_main_forgetEmail");
        //     Cookies.remove("yatos_main_forgetOtpMatchToken");
        //     Cookies.set("yatos_main_accessToken", res?.data?.accessToken, {
        //         path: "/",
        //         expires: 365,
        //         secure: false,
        //     });
        //     form.reset();
        //     router("/", { replace: true });
        // } else if (res?.statusCode === 200 && res?.data?.user?.role !== "admin") {
        //     form.reset();
        //     toast.error("Access Denied", {
        //         duration: 2000,
        //     });
        // }
        form.reset();
        router("/", { replace: true });
    };

    return (
        <GradientCard from="#2C1C4320" to="#D1B3FF80" className="min-h-screen flex items-center justify-center w-full!" withContainer={false}>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 relative z-10 max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <img src={AllImages.logo} alt="Beyond Styles" className="w-auto max-w-50 mb-10" />
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color">Log in to your account</h1>
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-2">Welcome back! Please enter your details.</p>
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
                            <FormPassword
                                prefix={<MdPassword size={18} />}
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="••••••••"
                                inputClassName="py-4! sm:py-5!"
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground cursor-pointer">
                                    <input type="checkbox" className="accent-secondary-color" />
                                    Remember Password
                                </label>
                                <Link to="/forgot-password" className="text-xs sm:text-sm lg:text-base text-secondary-color font-semibold">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button variant="secondary" className="w-full py-4 sm:py-5 text-sm sm:text-base lg:text-lg" type="submit">
                                Sign In
                            </Button>
                        </FieldGroup>
                    </form>

                </div>
            </div>
        </GradientCard>
    );
};
export default SignIn;
