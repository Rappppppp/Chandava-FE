import { lazy } from "react";

const HeroSection = lazy(() => import("@features/landingpage/components/HeroSection"));
const Feedback = lazy(() => import("@features/landingpage/components/Feedback"));
const AboutUs = lazy(() => import("@features/landingpage/components/AboutUs"));



const LandingPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <HeroSection />
            <Feedback />
            <AboutUs />
        </div >
    );
};

export default LandingPage;
