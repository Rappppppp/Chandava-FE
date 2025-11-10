import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@components/Icon";
import { useScrollToElement } from "@hooks/useScrollToElement";

const navLinks = ["Home", "Feedback", "About", "Accommodations", "Contact Us"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scroll when mobile nav is open
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <h1 className="text-4xl lg:text-5xl font-water-brush text-primary tracking-tight">
            Chandava
          </h1>
        </Link>

        {/* Desktop Nav */}
        <NavLinks
          setIsOpen={setIsOpen}
          className="hidden lg:flex gap-6 items-center"
        />

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="block lg:hidden p-2 rounded-md active:scale-95 transition-transform duration-150"
        >
          <Icon name={isOpen ? "X" : "Menu"} size={30} color="#222" />
        </button>
      </div>

      {/* Overlay */}
      {/* <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      /> */}

      {/* Mobile Sidebar */}
      <aside
        className={`bg-white fixed top-0 left-0 h-screen w-full flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
       <div className="bg-white w-full">
         {/* Header */}
        <div className="flex justify-between items-center mb-8 p-6">
          <h2 className="text-3xl font-water-brush text-primary">Chandava</h2>
          <button
            aria-label="Close menu"
            className="rounded-md active:scale-95 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="X" size={28} color="#222" />
          </button>
        </div>

        {/* Links */}
        <NavLinks
          setIsOpen={setIsOpen}
          className="flex flex-col gap-6 text-lg"
        />

        {/* Footer */}
        <div className="flex justify-center mt-10 border-t border-gray-200 pt-6">
          <AuthButtons />
        </div>
       </div>
      </aside>
    </nav>
  );
};

const NavLinks = ({
  setIsOpen,
  className,
}: {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const scrollToElement = useScrollToElement();
  return (
    <div className={`flex ${className}`}>
      {navLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => {
            scrollToElement(link);
            setIsOpen(false);
          }}
          className="relative cursor-pointer group font-medium text-gray-800 hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {link}
          <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full" />
        </button>
      ))}
    </div>
  );
};

const AuthButtons = () => (
  <div className="flex gap-4">
    <Link
      to="/registration"
      className="border border-primary py-2 px-6 rounded-full text-primary text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      Sign Up
    </Link>
    <Link
      to="/login"
      className="bg-primary py-2 px-6 rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      Login
    </Link>
  </div>
);

export default Navbar;
