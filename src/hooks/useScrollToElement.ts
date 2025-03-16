import { useNavigate, useLocation } from "react-router-dom";

export const useScrollToElement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const offset = 200; // Adjust this based on your navbar height

  const scrollToElement = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/?scrollTo=${id}`, { replace: true });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  };

  return scrollToElement;
};
