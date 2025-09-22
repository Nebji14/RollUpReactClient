import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareXTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import logoImg from "../../Assets/Images/Logo-SansFond.webp";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#3E3A4D] relative md:sticky md:bottom-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-3">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-t from-[#3E3A4D] to-transparent -translate-y-full"></div>

      <div className="flex flex-col items-center order-1 md:order-2 mb-3 md:mb-0">
        <NavLink to="/Home" className="block -mb-1">
          <div className="w-[90px] h-[90px] flex items-center justify-center">
            <img src={logoImg} alt="logo RollUp" className="object-contain" />
          </div>
        </NavLink>
        <p className="text-[#F2EEE8] text-xs -mt-1">{currentYear}</p>
      </div>

      <div className="flex space-x-4 order-2 md:order-1 mb-3 md:mb-0">
        <FontAwesomeIcon
          icon={faSquareFacebook}
          className="w-7 h-7 md:w-9 md:h-9 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faDiscord}
          className="w-7 h-7 md:w-9 md:h-9 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          className="w-7 h-7 md:w-9 md:h-9 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />
      </div>

      <div className="flex flex-col items-center md:items-end space-y-2 order-3">
        <a
          href="#"
          className="text-[#F2EEE8] font-medium hover:text-[#f3cc7a] transition-colors text-center md:text-right text-sm"
        >
          Politique de confidentialité
        </a>
        <a
          href="#"
          className="text-[#F2EEE8] font-medium hover:text-[#f3cc7a] transition-colors text-center md:text-right text-sm"
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}

export default Footer;
