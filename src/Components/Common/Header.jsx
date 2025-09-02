import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import de20Light from "../../Assets/Images/de20-light.webp";
import de20Dark from "../../Assets/Images/de20.webp";

function Header() {
  // État pour gérer l'ouverture du menu
  const [menuOpen, setMenuOpen] = useState(false);
  // État pour basculer entre version claire/sombre du header
  const [lightMode, setLightMode] = useState(false);
  // État pour gérer l'animation de rotation du dé
  const [rotate, setRotate] = useState(false);

  // Changer le mode clair/sombre du header en fonction de la section visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const headerHeight = 80;
      const scrollPosition = window.scrollY + headerHeight / 2;
      let isLight = false;

      // Vérifie la section actuelle pour déterminer si le header doit être clair
      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition <= bottom) {
          if (section.classList.contains("bg-jdr-texture")) {
            isLight = true;
          }
        }
      });

      setLightMode(isLight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // ⚡ Exécution immédiate au montage
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer/débloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Liste des liens de navigation
  const navLinks = [
    { to: "/Home", label: "Accueil" },
    { to: "/", label: "Quel JdR pour moi ?" },
    { to: "/", label: "Ton rôle idéal" },
    { to: "/", label: "Découvrir les JdR" },
    { to: "/", label: "Guides & Astuces" },
    { to: "/", label: "Scénarios prêts-à-jouer" },
    { to: "/", label: "Tables & Communauté" },
    { to: "/", label: "Contact" },
    { to: "/", label: "Mon compte" },
    { to: "/", label: "Déconnexion" },
  ];

  // Gestion du clic sur l’icône du dé
  // - lance une animation de rotation
  // - ouvre ou ferme le menu
  const handleDiceClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 600); // arrêt animation après 600ms
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* HEADER - fixe en haut de page avec le dé comme bouton du menu */}
      <header className="fixed top-0 left-0 w-full flex justify-center z-[9999] backdrop-blur-md py-2">
        <img
          src={lightMode ? de20Dark : de20Light}
          alt="Dé 20 Menu"
          className={`w-20 cursor-pointer transition-transform duration-500 ${
            rotate ? "animate-spin-once" : ""
          }`}
          onClick={handleDiceClick}
        />
      </header>

      {/* NAV - menu plein écran affiché lors du clic sur le dé */}
      <nav
        className={`fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-start pt-40 z-[1000] backdrop-blur-lg overflow-y-auto transition-all duration-300
        ${menuOpen ? "flex" : "hidden"}
        ${lightMode ? "bg-[#F2EEE8]/90" : "bg-[#3E3A4D]/90"}`}
      >
        {/* Liens de navigation avec animation d'apparition */}
        {navLinks.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-3xl my-4 transition-colors duration-300 opacity-0 translate-y-4 
               ${menuOpen ? "animate-fade-in-up" : ""} 
               [animation-delay:${index * 100}ms]
               ${
                 lightMode
                   ? "text-[#3E3A4D] hover:text-[#7160b3]"
                   : "text-[#F2EEE8] hover:text-[#dbcfb6]"
               } ${isActive ? "font-semibold" : ""}`
            }
            onClick={() => setMenuOpen(false)} // Ferme le menu au clic sur un lien
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Header;
