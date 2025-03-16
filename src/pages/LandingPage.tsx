import { lazy, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const HeroSection = lazy(() => import("@features/landingpage/components/HeroSection"));
const Feedback = lazy(() => import("@features/landingpage/components/Feedback"));
const AboutUs = lazy(() => import("@features/landingpage/components/AboutUs"));
const WhatCanWeOffer = lazy(() => import("@features/landingpage/components/WhatCanWeOffer"));
const Accomodations = lazy(() => import("@features/landingpage/components/Accomodations"));
const ContactUs = lazy(() => import("@features/landingpage/components/ContactUs"));




const LandingPage = () => {
    const [searchParams] = useSearchParams();
    const scrollTo = searchParams.get("scrollTo");
    const offset = 200; // Offset value

    useEffect(() => {
        if (scrollTo) {
            setTimeout(() => {
                const element = document.getElementById(scrollTo);
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
                }
            }, 100); // Delay ensures the page loads first
        }
    }, [scrollTo]);

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
