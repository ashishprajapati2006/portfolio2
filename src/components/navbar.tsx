import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

type NavbarProps = {
  hide: boolean;
};

// Navbar
export const Navbar = ({ hide }: NavbarProps) => {
  // state variables
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (toggle && !target.closest('.navbar-menu') && !target.closest('.menu-button')) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [toggle]);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-3 sm:py-5 fixed top-0 z-20 bg-primary transition-all duration-300",
        isAtBottom || hide ? "mt-0" : "mt-20"
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-[80px] sm:h-[120px] w-auto object-contain" 
          />
          <p className="text-white text-[14px] sm:text-[18px] font-bold cursor-pointer hidden xs:flex flex-wrap">
            <span>Ashish</span>
            <span className="sm:block hidden">&nbsp;Prajapati | AI & ML</span>
          </p>
        </Link>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden sm:flex flex-row gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <li
              key={link.id}
              className={cn(
                active === link.title ? "text-white" : "text-secondary",
                "hover:text-white text-[16px] md:text-[18px] font-medium cursor-pointer transition-colors"
              )}
              onClick={() => !link.link && setActive(link.title)}
            >
              {link.link ? (
                <a href={link.link} target="_blank" rel="noreferrer noopener">
                  {link.title}
                </a>
              ) : (
                <a href={`#${link.id}`}>{link.title}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            aria-label="Toggle menu"
            className="menu-button w-10 h-10 flex justify-center items-center cursor-pointer touch-target"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt="Menu"
              className="w-[28px] h-[28px] object-contain"
            />
          </button>

          {/* Mobile Menu */}
          <div
            className={cn(
              !toggle ? "hidden" : "flex",
              "navbar-menu p-4 sm:p-6 black-gradient absolute top-[70px] right-0 mx-2 sm:mx-4 my-2 min-w-[160px] sm:min-w-[180px] z-10 rounded-xl shadow-lg"
            )}
          >
            {/* Nav Links (Mobile) */}
            <ul className="list-none flex justify-end items-start flex-col gap-3 sm:gap-4 w-full">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.id}
                  className={cn(
                    active === link.title ? "text-white" : "text-secondary",
                    "font-medium cursor-pointer text-[15px] sm:text-[16px] transition-colors hover:text-white"
                  )}
                  onClick={() => {
                    !link.link && setToggle(false);
                    !link.link && setActive(link.title);
                  }}
                >
                  {link.link ? (
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a href={`#${link.id}`}>{link.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
