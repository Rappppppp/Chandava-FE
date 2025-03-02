import { lazy } from "react";

const HeroSection = lazy(() => import("@features/landingpage/components/HeroSection"));
const Feedback = lazy(() => import("@features/landingpage/components/Feedback"));
const AboutUs = lazy(() => import("@features/landingpage/components/AboutUs"));
const WhatCanWeOffer = lazy(() => import("@features/landingpage/components/WhatCanWeOffer"));
const Accomodations = lazy(() => import("@features/landingpage/components/Accomodations"));
const ContactUs = lazy(() => import("@features/landingpage/components/ContactUs"));




const LandingPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeroSection />
            <Feedback />
            <AboutUs />
            <WhatCanWeOffer />
            <Accomodations />
            <ContactUs />
        </div >
    );
};

export default LandingPage;
