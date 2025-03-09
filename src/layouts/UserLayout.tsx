import { Outlet, } from "react-router-dom";
import Navbar from "@features/users/navbar/Navbar"


const UserLayout = () => {
    return (<>
        <div className="flex flex-col  px-10 md:px-20 xl:px-24">
            <Navbar />


            <main className="flex-1 mb-10">
                <Outlet />
            </main>

        </div>


    </>);
}

export default UserLayout;