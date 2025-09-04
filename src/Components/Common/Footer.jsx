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
    <footer className="w-full h-[15vh] bg-[#3E3A4D] flex items-center justify-between px-8 py-4 fixed bottom-0">
      {/* Dégradé supérieur */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-t from-[#3E3A4D] to-transparent -translate-y-full"></div>

      <div className="flex items-center space-x-6">
        {/* Facebook */}
        <FontAwesomeIcon
          icon={faSquareFacebook}
          className="w-11 h-11 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />

        {/* Discord */}
        <FontAwesomeIcon
          icon={faDiscord}
          className="w-11 h-11 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />

        {/* X/Twitter */}
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          className="w-11 h-11 text-[#F2EEE8] hover:text-[#f3cc7a] transition-colors cursor-pointer"
        />
      </div>

      {/* Partie centre - Logo et année */}
      <div className="flex flex-col items-center">
        {/* Logo entouré d'un NavLink */}
        <NavLink to="/Home" className="block -mb-2">
          <div className="w-[150px] h-[150px] flex items-center justify-center">
            <img src={logoImg} alt="logo RollUp" />
          </div>
        </NavLink>
        {/* Année dynamique - rapprochée du logo */}
        <p className="text-[#F2EEE8] text-sm mb-5 -mt-5">{currentYear}</p>
      </div>

      {/* Partie droite - Liens légaux */}
      <div className="flex flex-col items-end space-y-4">
        {/* Politique de Confidentialité - Un seul lien sur deux lignes */}
        <a
          href="#"
          className="text-[#F2EEE8] font-medium hover:text-[#f3cc7a] transition-colors text-right"
        >
          Politique de confidentialité
        </a>

        {/* Mentions légales */}
        <a
          href="#"
          className="text-[#F2EEE8] font-medium hover:text-[#f3cc7a] transition-colors text-right"
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}

export default Footer;
