import { useState } from "react"
import AuthBackground from "@assets/images/hero-bg.jpg"
import Logo from "@assets/logo/logo.jpg"
import Input from "@features/auth/components/Input"
import { useInput } from "@hooks/useInput"
import { register } from "@features/auth/services/auth"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import Spinner from "@components/Spinner"
import ScrollToTop from "@components/ScrollToTop"
import axios from "axios"

const RegistrationPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { values, handleChange, errors, isValid, setValues } = useInput({
        first_name: { value: "", required: true, letters: true },
        last_name: { value: "", required: true, letters: true },
        nickname: { value: "", required: true },
        birthdate: { value: "", required: true },
        contact_number: { value: "", required: true, numbers: true },
        email: { value: "", required: true, email: true },
        address: { value: "", required: true, maxLength: 200 },
        password: { value: "", required: true, minLength: 8 },
        password_confirmation: { value: "", required: true, minLength: 8 }
    });




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid()) return;
        setIsLoading(true);
        await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });

        const response = await register(values);
        if (response.success) {
            toast.success("Registration successful");

            setValues({
                first_name: { value: "" },
                last_name: { value: "" },
                nickname: { value: "" },
                birthdate: { value: "" },
                contact_number: { value: "" },
                email: { value: "" },
                address: { value: "" },
                password: { value: "" },
                password_confirmation: { value: "" },
            });

        } else {
            toast.error(response.message)

        }

        setIsLoading(false);

    };




    return (

        <div className="relative h-screen w-screen flex flex-col lg:flex-row bg-black">
            <ScrollToTop />
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
                <form className="w-full lg:border border-white/30 lg:rounded-2xl lg:p-10 h-auto lg:h-[90vh] overflow-y-scroll" autoComplete="off" onSubmit={handleSubmit}>
                    <h1 className="text-xl lg:text-2xl font-bold mb-3">Register an account.</h1>


                    <Input
                        icon="User"
                        type="text"
                        name="first_name"
                        label="First Name"
                        value={values.first_name.value}
                        onChange={handleChange}
                        error={errors.first_name}
                        required />

                    <Input
                        icon="User"
                        type="text"
                        name="last_name"
                        label="Last Name"
                        value={values.last_name.value}
                        onChange={handleChange}
                        error={errors.last_name}
                        required />

                    <Input
                        icon="SquareUser"
                        type="text"
                        name="nickname"
                        label="Nickname"
                        value={values.nickname.value}
                        onChange={handleChange}
                        error={errors.nickname}
                        required />

                    <Input
                        icon="Calendar"
                        type="date"
                        name="birthdate"
                        label="Birthdate"
                        value={values.birthdate.value}
                        onChange={handleChange}
                        error={errors.birthdate}
                        required />

                    <Input
                        icon="Phone"
                        type="text"
                        name="contact_number"
                        label="Contact Number"
                        value={values.contact_number.value}
                        onChange={handleChange}
                        error={errors.contact_number}
                        required />

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
                        icon="MapPinHouse"
                        type="text"
                        name="address"
                        label="Address"
                        value={values.address.value}
                        onChange={handleChange}
                        error={errors.address}
                        required />

                    <Input
                        icon="KeyRound"
                        type="password"
                        name="password"
                        label="Password"
                        value={values.password.value}
                        onChange={handleChange}
                        error={errors.password}
                        required />

                    <Input
                        icon="KeyRound"
                        type="password"
                        name="password_confirmation"
                        label="Confirm Password"
                        value={values.password_confirmation.value}
                        onChange={handleChange}
                        error={errors.password_confirmation}
                        required />


                    <div className="mt-5">
                        <button type="submit" className="border border-white/30 disabled:bg-white/10 disabled:cursor-not-allowed hover:bg-white/10 transition-all w-full py-3 rounded-2xl font-bold cursor-pointer" disabled={isLoading}>

                            {
                                isLoading ? (
                                    <Spinner />
                                ) : "Register"
                            }

                        </button>
                    </div>

                    <div className="mt-5 text-center">
                        <Link to="/login" className="underline">Back to login page</Link>
                    </div>


                </form>
            </div>
        </div>


    );
}

export default RegistrationPage;