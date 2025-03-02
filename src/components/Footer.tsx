const Footer = () => {
    return (
      <footer className=" text-center p-4 rounded-2xl">
        &copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.
      </footer>
    );
  };
  
  export default Footer;
  