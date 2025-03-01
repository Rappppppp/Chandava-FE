
import HeroBg from "@assets/images/hero-bg.jpg";
const HeroSection = () => {
    return (

        <div
            style={{ backgroundImage: `url(${HeroBg})` }}
            className="w-full flex flex-col  items-center justify-center bg-black h-[50vh] lg:h-[60vh] xl:h-[70vh] rounded-4xl lg:rounded-[2.125rem] text-white ">
            <h1 className="font-water-brush text-[3rem]/10 md:text-[4rem]/15 lg:text-[5rem]/20 xl:text-[6rem]/20 text-center ">Chandava</h1>
            <p className="text-[1rem] lg:text-[2.25rem]">Lake Resort & Resto</p>
            <p className="text-[1.5rem] lg:text-[2.50rem] font-water-brush ">your gateway to relaxation</p>
        </div>

    );
}

export default HeroSection;