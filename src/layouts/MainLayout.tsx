import { Outlet, } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
const MainLayout = () => {
    return (
        <div className="flex flex-col  px-10 md:px-20 xl:px-24">
            <Navbar />


            <main className="flex-1 mb-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
