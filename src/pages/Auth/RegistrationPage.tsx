import { useState, memo } from "react";
import AuthBackground from "@assets/images/hero-bg.jpg";
import Logo from "@assets/logo/logo.jpg";
import Input from "@features/auth/components/Input";
import { useInput } from "@hooks/useInput";
import { register } from "@features/auth/services/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@components/Spinner";
import ScrollToTop from "@components/ScrollToTop";
import axios from "axios";
import MapWithAddress from "@components/MapWithAddress"; // ✅ import your map
import { AuthService } from "@features/auth/services/AuthService";
import { ArrowLeft } from "lucide-react";

const RegistrationPage = () => {
    const navigate = useNavigate();
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
        password_confirmation: { value: "", required: true, minLength: 8 },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid()) return;
        setIsLoading(true);

        try {
            await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });

            const response = await register(values);
            if (response.success) {

                const response = await AuthService.login(values.email.value, values.password.value);
                if (response.user.role === "user") {
                    navigate("/users/home")
                    return;
                } else {
                    toast.error("Something went wrong. Please try again.")
                }
                // toast.success("Registration successful");

                // setValues({
                //   first_name: { value: "" },
                //   last_name: { value: "" },
                //   nickname: { value: "" },
                //   birthdate: { value: "" },
                //   contact_number: { value: "" },
                //   email: { value: "" },
                //   address: { value: "" },
                //   password: { value: "" },
                //   password_confirmation: { value: "" },
                // });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Server error. Please try again later.");
        }

        setIsLoading(false);
    };

    return (
        <div className="relative h-screen w-screen flex flex-col lg:flex-row bg-black">
            <ScrollToTop />

            {/* Background */}
            <div
                className="fixed inset-0 bg-black brightness-90"
                style={{
                    backgroundImage: `url(${AuthBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Left Content */}
            <div className="relative z-10 text-white w-full lg:w-1/2 flex flex-col items-center justify-center px-10 py-10">
                <img
                    src={Logo}
                    alt="Logo"
                    className="aspect-square w-[6.25rem] lg:w-[9.375rem] rounded-full mb-3"
                />
                <h1 className="text-4xl lg:text-6xl text-center font-water-brush">
                    Welcome to Chandava Lake Resort and Resto
                </h1>
                <p className="text-lg lg:text-2xl">your gateway to relaxation</p>
            </div>

            {/* Right Content / Form */}
            <div className="relative z-10 text-white flex-1 flex lg:items-center justify-center px-10 lg:px-30 pb-10 lg:py-20">
                <form
                    className="p-4 backdrop-blur-sm space-y-3 bg-primary/15 w-full lg:border border-white/30 rounded-2xl lg:p-10 h-auto lg:h-[90vh] overflow-y-scroll"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >

                      <div className="flex items-center w-fit gap-3">
                        <ArrowLeft className="w-7 h-7 -ml-1 hover:scale-120 transition-all text-white cursor-pointer"
                        onClick={() => navigate("/")} />
                           <h1 className="text-xl lg:text-2xl font-bold">Registration</h1>
                    </div>
                 

                    <div>
                        <Link to="/login" className="underline">
                            Already have an account?
                        </Link>
                    </div>

                    {/* Personal Info */}
                    <Input
                        icon="User"
                        type="text"
                        name="first_name"
                        label="First Name"
                        value={values.first_name.value}
                        onChange={handleChange}
                        error={errors.first_name}
                        required
                    />

                    <Input
                        icon="User"
                        type="text"
                        name="last_name"
                        label="Last Name"
                        value={values.last_name.value}
                        onChange={handleChange}
                        error={errors.last_name}
                        required
                    />

                    <Input
                        icon="Calendar"
                        type="date"
                        name="birthdate"
                        label="Birthdate"
                        value={values.birthdate.value}
                        onChange={handleChange}
                        error={errors.birthdate}
                        required
                    />

                    <Input
                        icon="Phone"
                        type="tel"
                        name="contact_number"
                        label="Contact Number"
                        value={values.contact_number.value}
                        onChange={handleChange}
                        error={errors.contact_number}
                        required
                    />

                    <Input
                        icon="Mail"
                        type="email"
                        name="email"
                        label="Email Address"
                        value={values.email.value}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />

                    {/* Address Field */}
                    <Input
                        icon="MapPinHouse"
                        type="text"
                        name="address"
                        label="Home Address"
                        value={values.address.value}
                        onChange={handleChange}
                        error={errors.address}
                        required
                    />

                    {/* 🗺 Map Picker */}
                    <div className="mt-2">
                        <MapWithAddress
                            onAddressSelect={(selectedAddress: string) => {
                                setValues((prev: any) => ({
                                    ...prev,
                                    address: { ...prev.address, value: selectedAddress },
                                }));
                                toast.success("Address selected from map");
                            }}
                        />
                    </div>

                    {/* Password Fields */}
                    <Input
                        icon="KeyRound"
                        type="password"
                        name="password"
                        label="Password"
                        value={values.password.value}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <Input
                        icon="KeyRound"
                        type="password"
                        name="password_confirmation"
                        label="Confirm Password"
                        value={values.password_confirmation.value}
                        onChange={handleChange}
                        error={errors.password_confirmation}
                        required
                    />

                    {/* Submit */}
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border border-white/30 disabled:bg-white/10 disabled:cursor-not-allowed hover:bg-white/10 transition-all w-full py-3 rounded-2xl font-bold cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ✅ Prevent re-render of the entire registration page if not needed
export default memo(RegistrationPage);
