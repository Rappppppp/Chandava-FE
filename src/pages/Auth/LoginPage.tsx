import { useState } from "react"
import AuthBackground from "@assets/images/hero-bg.jpg"
import Logo from "@assets/logo/logo.jpg"
import Input from "@features/auth/components/Input"
import { useInput } from "@hooks/useInput"
import { AuthService } from "@features/auth/services/AuthService"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import Spinner from "@components/Spinner"
import ScrollToTop from "@components/ScrollToTop"
import axios from "axios"
import { ArrowLeft } from "lucide-react"


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

        try {
            setIsLoading(true)

            await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });

            const response = await AuthService.login(values.email.value, values.password.value);
            if(response.user.role === "admin"){
                navigate("/admin/dashboard")
                return;
            }else if (response.user.role === "user"){
                navigate("/users/home")
                return;
            }
            else{
                toast.error("Something went wrong. Please try again.")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")

        } finally {
            setIsLoading(false)
        }

    };




    return (

        <div className="relative h-screen w-screen flex flex-col lg:flex-row bg-black">
            <ScrollToTop />
            <div
                className="fixed inset-0 bg-black brightness-90"
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

            <div className="relative z-10 text-white  flex-1 flex lg:items-center justify-center px-10  lg:px-30 pb-10 lg:pb-0 lg:py-20">
                <form className="p-4 backdrop-blur-sm bg-primary/15 w-full lg:border border-white/30 rounded-2xl lg:p-10" autoComplete="off" onSubmit={handleSubmit}>

                    <div className="flex items-center w-fit gap-3">
                        <ArrowLeft className="w-7 h-7 -ml-1 hover:scale-120 transition-all text-white cursor-pointer"
                        onClick={() => navigate("/")} />
                        <h1 className="text-xl lg:text-2xl font-bold">Login</h1>
                    </div>
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
                        <Link to="/registration" className="underline cursor-pointer">Don't have an account?</Link>
                    </div>

                    {/* <div className="mt-3 text-center">
                        <p className="underline">Forgot password?</p>
                    </div> */}
                </form>
            </div>
        </div>


    );
}

export default LoginPage;