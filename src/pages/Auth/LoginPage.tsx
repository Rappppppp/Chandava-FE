import { useState } from "react"
import AuthBackground from "@assets/images/hero-bg.jpg"
import Logo from "@assets/logo/logo.jpg"
import Input from "@features/auth/components/Input"
import { useInput } from "@hooks/useInput"
import { login } from "@features/auth/services/auth"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import Spinner from "@components/Spinner"


const LoginPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const { values, handleChange, errors, isValid } = useInput({
        email: { value: "", required: true, email: true },
        password: { value: "", required: true },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid()) return;

        setIsLoading(true)

        const response = await login(values.email.value, values.password.value);
        if (!response.success) {
            toast.error(response.message)
            setIsLoading(false)
            return;
        }
        localStorage.setItem("token", response.response.token);
        if (response.response.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/users");
        }
    };




    return (

        <div className="relative h-screen w-screen flex flex-col lg:flex-row bg-black">
            <div
                className="fixed inset-0 bg-black brightness-50"
                style={{
                    backgroundImage: `url(${AuthBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                }}
            />
            {/* Content Goes Here */}
            <div className="relative z-10 text-white w-full lg:w-1/2 flex flex-col items-center justify-center px-10 py-10">
                <img src={Logo} alt="" className="aspect-square w-[6.25rem] lg:w-[9.375rem] rounded-full mb-3" />
                <h1 className="text-4xl lg:text-6xl text-center  font-water-brush">Welcome to Chandava Lake Resort and Resto</h1>
                <p className="text-lg lg:text-2xl">your gateway to relaxation</p>
            </div>

            <div className="relative z-10 text-white  flex-1 flex lg:items-center justify-center px-10  lg:px-30 py-10 lg:py-20 backdrop-blur-sm">
                <form className="w-full lg:border border-white/30 lg:rounded-2xl lg:p-10" autoComplete="off" onSubmit={handleSubmit}>
                    <h1 className="text-xl lg:text-2xl font-bold mb-3">Log In. Relax. Enjoy.</h1>
                    <p className="mb-5">Secure your stay in just a few clicks!</p>


                    <Input
                        icon="Mail"
                        type="email"
                        name="email"
                        label="Email Address"
                        value={values.email.value}
                        onChange={handleChange}
                        error={errors.email}
                        required />
                    <Input
                        icon="Key"
                        type="password"
                        name="password"
                        label="Password"
                        value={values.password.value}
                        onChange={handleChange}
                        error={errors.password}
                        required />

                    <div className="mt-5">
                        <button type="submit" className="border border-white/30 disabled:bg-white/10 disabled:cursor-not-allowed hover:bg-white/10 transition-all w-full py-3 rounded-2xl font-bold cursor-pointer" disabled={isLoading}>
                            {
                                isLoading ? (
                                    <Spinner />
                                ) : "Login"
                            }
                        </button>
                    </div>

                    <div className="mt-5 text-center">
                        <Link to="/registration" className="underline cursor-pointer">Don't have an account? Click here.</Link>
                    </div>

                    <div className="mt-3 text-center">
                        <p className="underline">Forgot password?</p>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default LoginPage;