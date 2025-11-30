import { useState } from "react";
import { useLocation } from "react-router-dom";
import { icons } from "lucide-react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@components/ScrollToTop";
import Icon from "@components/Icon";
import { formatTitleCase } from "@utils/stringFormatter";
import { Link } from "react-router-dom";
import { ConfirmModal } from "@components/Modal";
import { useAuth } from "@contexts/AuthContext";
// import { Bell, User } from "lucide-react"

interface SidebarItemProps {
    path: string;
    name: string;
    icon: keyof typeof icons;
    isActive: boolean;
    useBottomSeparator?: boolean;
}

const SidebarItem = ({ name, icon, isActive, path, useBottomSeparator }: SidebarItemProps) => (
    <li>
        <Link
            to={`/admin/${path}`}
            className={`flex w-full items-center rounded-md px-4 py-2 text-sm ${isActive ? "bg-primary text-white" : "text-black hover:bg-white/10"
                }`}
        >
            <Icon name={icon} size={20} color={isActive ? "#fff" : "#222222"} />
            <p className="ml-3">{name}</p>
        </Link>

        {useBottomSeparator && <hr className="border-t border-gray-300 my-2 w-full" />}
    </li>
);


const navigation: { name: string; icon: keyof typeof icons; path: string, useBottomSeparator?: boolean }[] = [
    { name: "Dashboard", icon: "House", path: "dashboard", useBottomSeparator: true },
    { name: "Accommodations", icon: "House", path: "accommodations" },
    { name: "Manage Accommodations", icon: "Building2", path: "manage-accommodations" },
    { name: "Bookings", icon: "Calendar", path: "bookings" },
    { name: "Change Schedule Requests", icon: "Settings2", path: "change-schedule" },
    { name: "Customers", icon: "Users", path: "customers" },
    { name: "Inquiries", icon: "MessagesSquare", path: "inquiries" },
    { name: "Feedbacks", icon: "Laugh", path: "feedbacks" },
    { name: "Analytics", icon: "ChartArea", path: "analytics" },
    { name: "Messages", icon: "MessageSquare", path: "messages" },
    // { name: "Settings", icon: "Settings", path: "settings" },
];

const AdminLayout = () => {
    const { logout, logoutLoading } = useAuth();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname.split("/")[2];

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <ScrollToTop />


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

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-300 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex h-16 items-center justify-between px-4 border-b border-gray-300">
                        <h2 className="text-xl font-bold">Chandava</h2>
                        <button onClick={toggleSidebar} className="md:hidden">
                            <Icon name="X" size={20} color="black" />
                        </button>
                    </div>
                    <nav className="mt-6 px-4">
                        <ul className="space-y-2">
                            {navigation.map((item, index) => (
                                <SidebarItem
                                    key={index}
                                    path={item.path}
                                    name={item.name}
                                    icon={item.icon}
                                    isActive={currentPath === item.path}
                                />
                            ))}
                        </ul>
                    </nav>
                    <div className="absolute bottom-0 w-full border-t border-gray-300 p-4">
                        <button onClick={() => setOpenLogoutModal(true)} className="flex w-full items-center rounded-md px-4 py-2 text-sm text-black hover:bg-gray-100">
                            <Icon name="LogOut" size={20} color="#222222" />
                            <p className="ml-3">Logout</p>
                        </button>
                    </div>
                </aside>



                {/* Main Content Wrapper */}
                <div className="flex flex-1 flex-col h-screen">
                    {/* Header */}
                    <header className="sticky top-0 z-30 bg-white border-b border-gray-300 px-4 h-16 flex justify-between items-center">
                        <div className="flex">
                            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                                <Icon name="Menu" size={20} color="black" />
                                <span className="sr-only">Toggle menu</span>
                            </button>
                            <p className="font-bold">{formatTitleCase(currentPath)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div> */}
                            {/* <button className="relative p-2 rounded-full hover:bg-gray-100">
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button> */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                    {(() => {
                                        const hour = new Date().getHours();
                                        if (hour < 12) return "Good Morning, ";
                                        if (hour < 18) return "Good Afternoon, ";
                                        return "Good Evening, ";
                                    })()} <span><strong>Admin</strong>! 😊</span>
                                </span>
                            </div>
                        </div>
                    </header>


                    <main className="flex-1 overflow-auto p-5">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
