import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@components/Icon";

const navLinks = ["Home", "Feedback", "About", "Accommodations", "Pricing", "Contact Us"];

const Navbar = () => {
    const [isOpenSideNavigation, setIsOpenSideNavigation] = useState<boolean>(false);

    useEffect(() => {
        if (isOpenSideNavigation) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }


        return () => {
            document.body.style.overflow = "auto";
        }

    }, [isOpenSideNavigation])

    return (
        <nav className=" sticky top-0 bg-white py-10 flex justify-between items-center z-40">
            <div className="flex items-center gap-8">
                <Link to="/"><h1 className="text-4xl/0 lg:text-5xl/0 text-primary font-water-brush">Chandava</h1></Link>
                <NavLinks className="hidden lg:flex gap-5" />
            </div>

            <div className="flex gap-4 items-center">
                <AuthButtons className="hidden lg:flex" />

                <button
                    className="block lg:hidden cursor-pointer active:scale-90 transition-all duration-300"
                    onClick={() => setIsOpenSideNavigation(true)}
                >
                    <Icon name="Menu" size={30} color="#222222" />
                </button>
            </div>


            <div
                className={`flex flex-col items-center justify-between lg:hidden fixed top-0 left-0 h-screen w-screen z-50 bg-white transition-transform duration-300 ${isOpenSideNavigation ? "translate-x-0" : "-translate-x-full"
                    }`}
            >

                <div className="absolute top-0 left-0 w-full py-12 flex justify-end items-center px-10 md:px-20 xl:px-24">
                    <button className="cursor-pointer active:scale-90 transition-all duration-300" onClick={() => setIsOpenSideNavigation(false)}>
                        <Icon name="X" size={30} color="#222222" />
                    </button>
                </div>


                <div className="flex-1 flex flex-col gap-4 items-center justify-center w-full h-full">
                    <NavLinks className="flex flex-col gap-6" />
                    <div className="relative group">
                        <p className="cursor-pointer transition-colors duration-300 text-black group-hover:text-primary">
                            Sign up
                        </p>
                        <span className="absolute left-1/2 -bottom-1 h-[0.125rem] w-0 bg-primary transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// ✅ Navigation Links Component
const NavLinks = ({ className }: { className?: string }) => (
    <div className={`flex items-center ${className}`}>
        {navLinks.map((link, index) => (
            <div key={index} className="relative group">
                <p className="cursor-pointer transition-colors duration-300 text-black group-hover:text-primary">
                    {link}
                </p>
                <span className="absolute left-1/2 -bottom-1 h-[0.125rem] w-0 bg-primary transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
            </div>
        ))}
    </div>
);

// ✅ Authentication Buttons (Signup & Login)
const AuthButtons = ({ className }: { className?: string }) => (
    <div className={`flex gap-4 `}>
        <button className={`border border-primary py-2 px-7 rounded-full text-primary transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer ${className}`}>
            Signup
        </button>
        <button className="bg-primary py-2 px-7 rounded-full text-white transition-all duration-300 hover:bg-primary/80 cursor-pointer">
            Login
        </button>
    </div>
);

export default Navbar;
