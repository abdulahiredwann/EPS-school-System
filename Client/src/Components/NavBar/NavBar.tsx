import { useState } from "react";
import Logo from "../../../public/EPS.png";
import { TiThMenu } from "react-icons/ti";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="shadow-lg">
      <div className="mx-auto flex items-center justify-between p-2">
        {/* Logo and School Name */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="School Logo" className="h-9" />
          <span className="text-xl font hidden md:text-xl md:font md:inline">
            Ethio-Parents' School
          </span>
          {/* About Us and Contact Links */}
          <div className="hidden md:flex space-x-4 ml-4">
            <a href="/about-us" className="text-md font-thin">
              About Us
            </a>
            <a href="/contact" className="text-md font-thin">
              Contact
            </a>
          </div>
        </div>

        {/* Buttons for Login */}
        <div className="hidden md:flex space-x-4">
          <a href="/loginteacher" className="btn btn-outline btn-success">
            Teacher Login
          </a>
          <a href="/studentlogin" className="btn btn-outline btn-success">
            Student Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center p-2 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <TiThMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-2 py-4">
            <a href="/teacher-login" className="btn btn-outline btn-success">
              Teacher Login
            </a>
            <a href="/student-login" className="btn btn-outline btn-success">
              Student Login
            </a>
            <a href="/about-us" className="text-md font-thin">
              About Us
            </a>
            <a href="/contact" className="text-md font-thin">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
