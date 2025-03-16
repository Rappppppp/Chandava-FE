
import RecentlyViewed from "@features/users/home/RecentlyViewed";
import Accomodations from "@features/users/home/Accomodations";


const UserHomePage = () => {
    return (
        <div className="flex flex-col gap-10">
            <RecentlyViewed />
            <Accomodations />
        </div>
    );
}

export default UserHomePage;