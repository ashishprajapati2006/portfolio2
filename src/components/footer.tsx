import { Link } from "react-router-dom";

import { CONTACT_INFO } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-8 bg-primary border-t border-t-secondary/5"
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto flex-col sm:flex-row gap-4">
        <p className="text-white text-md font-bold flex">
          &copy; Ashish Prajapati {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Contact Links */}
        <ul className="list-none flex flex-row gap-6">
          {CONTACT_INFO.map((contact) => (
            <li
              key={contact.label}
              className="text-secondary font-poppins font-medium cursor-pointer text-[24px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
            >
              <a href={contact.link} target="_blank" rel="noreferrer noopener" aria-label={contact.label}>
                <contact.icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
