import AuthLayout from "@/Components/Shared/AuthLayout";
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

const inputClassName = "bg-primary-color! border-base-color/30!";

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
        <AuthLayout
            subtitle="Sign in to manage your platform"
            cardTitle="Welcome Back"
            cardDescription="Enter your credentials to access the admin dashboard"
        >
            <form onSubmit={form.handleSubmit(onFinish)}>
                <FieldGroup>
                    <FormInput
                        prefix={<MdOutlineEmail size={18} />}
                        control={form.control}
                        name="email"
                        label="Email Address"
                        placeholder="admin@yatos.com"
                        inputClassName={inputClassName}
                    />
                    <FormPassword
                        prefix={<MdPassword size={18} />}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        inputClassName={inputClassName}
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                            <input type="checkbox" className="accent-secondary-color" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-secondary-color font-semibold">
                            Forgot password?
                        </Link>
                    </div>

                    <Button variant="secondary" className="w-full" type="submit">
                        Sign In
                    </Button>
                </FieldGroup>
            </form>
        </AuthLayout>
    );
};
export default SignIn;
