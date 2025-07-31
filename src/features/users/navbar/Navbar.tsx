import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@components/Icon";
import { useAuth } from "@contexts/AuthContext";
import UserDefault from "@assets/images/user-default.jpg"
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ConfirmModal } from "@components/Modal";



// const navLinks = ["Home", "Bookings", "Favorites", "Feedbacks", "Coupons"];
const navLinks = [
    { label: "Home", link: "home" },
    { label: "Bookings", link: "bookings" },
    { label: "Feedbacks", link: "feedbacks" },


]

const Navbar = () => {
    const { user, logout, logoutLoading } = useAuth();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
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
            <ConfirmModal
                isOpen={openLogoutModal}
                setIsOpen={setOpenLogoutModal}
                title="Logout Confirmation"
                fnLoading={logoutLoading}
                closeButton="Not now"
                mainButton="Yes, logout!"
                buttonFn={() => logout()}
            >
                <p>Are you sure you want to logout?</p>

            </ConfirmModal>
            <div className="flex items-center gap-8">
                <Link to="/users/home"><h1 className="text-4xl/0 lg:text-5xl/0 text-primary font-water-brush">Chandava</h1></Link>
                <NavLinks className="hidden lg:flex gap-5" />
            </div>

            <div className="flex gap-4 items-center">
                <AuthButtons first_name={user?.first_name} setOpenLogoutModal={setOpenLogoutModal} />

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
                        <p onClick={() => setOpenLogoutModal(true)} className="cursor-pointer transition-colors duration-300 text-black group-hover:text-primary">
                            Logout
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
        {navLinks.map((nav, index) => (
            <div key={index} className="relative group">
                <Link to={`/users/${nav.link}`} className="cursor-pointer transition-colors duration-300 text-black group-hover:text-primary">
                    {nav.label}
                </Link>
                <span className="absolute left-1/2 -bottom-1 h-[0.125rem] w-0 bg-primary transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
            </div>
        ))}
    </div>
);

// ✅ Authentication Buttons (Signup & Login)
const AuthButtons = ({ first_name, setOpenLogoutModal }: { first_name?: string, setOpenLogoutModal: React.Dispatch<React.SetStateAction<boolean>> }) => (
    <div className={`hidden lg:block`}>


        <Popover className="group">
            {({ open }) => (
                <>
                    <PopoverButton className=" gap-3 justify-center items-center flex cursor-pointer focus:outline-none focus:ring-0 active:scale-90 transition-all duration-500">
                        <div className="aspect-square w-10 h-10 rounded-full bg-primary">
                            <img src={UserDefault} alt="user-default" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="">Welcome, {first_name}</p>
                            <div className="group-data-[open]:rotate-180 transition-all duration-500 ease-in-out">
                                <Icon name="ChevronDown" size={20} color="#222222" />
                            </div>
                        </div>
                    </PopoverButton>
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                anchor="bottom"
                                className="flex origin-top flex-col z-50 overflow-hidden"
                            >
                                <div className="border border-gray-200 rounded-lg mt-2 p-1 flex flex-col gap-1 bg-white">
                                    <div className="flex items-center justify-start gap-3 hover:bg-gray-100 rounded-2xl pr-14 pl-3 py-3 transition-all duration-500 cursor-pointer">
                                        <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-red-400">
                                            <Icon name="Settings" size={20} color="#fff" />
                                        </div>
                                        <p className="text-gray-800">Settings</p>
                                    </div>
                                    <div className="flex items-center justify-start gap-3 hover:bg-gray-100 rounded-2xl pr-14 pl-3 py-3 transition-all duration-500 cursor-pointer" onClick={() => setOpenLogoutModal(true)}>
                                        <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-blue-400">
                                            <Icon name="LogOut" size={20} color="#fff" />
                                        </div>
                                        <p className="text-gray-800">Logout</p>
                                    </div>
                                </div>
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Popover>

    </div>
);

export default Navbar;
