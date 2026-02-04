import { Outlet, } from "react-router-dom";
import Navbar from "@features/users/navbar/Navbar"
import ScrollToTop from "@components/ScrollToTop";
import Chatbot from "@features/landingpage/components/Chatbot";

const UserLayout = () => {
    return (<>
        <ScrollToTop />
        <div className="flex flex-col  px-10 md:px-20 xl:px-24">
            <Navbar />
            <Chatbot />

            <main className="flex-1 mb-10">
                <Outlet />
            </main>

        </div>


    </>);
}

export default UserLayout;