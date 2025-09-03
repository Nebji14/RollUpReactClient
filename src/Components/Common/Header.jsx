import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import de20Light from "../../Assets/Images/de20-light.webp";
import de20Dark from "../../Assets/Images/de20.webp";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [scrolledMenu, setScrolledMenu] = useState(false);
  const [linksVisible, setLinksVisible] = useState(0);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Gestion du changement de mode clair/sombre selon la section visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition =
        window.scrollY + (headerRef.current?.offsetHeight || 0) / 2;
      let isLight = false;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          // Détermination du mode en fonction des classes et couleurs de fond
          if (section.classList.contains("bg-jdr-texture")) {
            isLight = false; // Mode sombre pour bg-jdr-texture
          } else if (section.classList.contains("bg-donjon")) {
            isLight = true; // Mode clair pour bg-donjon
          } else {
            // Fallback: vérifier la couleur de fond
            const bgColor = getComputedStyle(section).backgroundColor;
            if (
              bgColor.includes("255, 255, 255") ||
              bgColor.includes("242, 238, 232")
            ) {
              isLight = true;
            }
          }
        }
      });

      setLightMode(isLight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion du défilement de la page lorsque le menu est ouvert
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

  // Gestion du défilement dans le menu
  useEffect(() => {
    const menu = menuRef.current;

    const handleMenuScroll = () => {
      if (menu && menu.scrollTop > 10) {
        setScrolledMenu(true);
      } else {
        setScrolledMenu(false);
      }
    };

    if (menuOpen && menu) {
      menu.addEventListener("scroll", handleMenuScroll);
      // Vérifier immédiatement si le menu a déjà du contenu défilé
      handleMenuScroll();
    }

    return () => {
      if (menu) {
        menu.removeEventListener("scroll", handleMenuScroll);
      }
    };
  }, [menuOpen]);

  // Animation d'apparition séquentielle des liens
  useEffect(() => {
    if (menuOpen) {
      // Réinitialiser le compteur
      setLinksVisible(0);

      // Animer l'apparition des liens un par un
      const timer = setInterval(() => {
        setLinksVisible((prev) => {
          if (prev < navLinks.length) {
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 60);

      return () => clearInterval(timer);
    } else {
      // Réinitialiser quand le menu se ferme
      setLinksVisible(0);
    }
  }, [menuOpen]);

  // Configuration des liens de navigation
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

  // Gestion du clic sur le dé pour ouvrir/fermer le menu avec animation
  const handleDiceClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 600);
    setMenuOpen(!menuOpen);
    setScrolledMenu(false); // Réinitialiser l'état de défilement
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full flex justify-center z-[9999] py-2 transition-all duration-300 ${
          menuOpen && scrolledMenu
            ? "backdrop-blur-xl bg-opacity-90 " +
              (lightMode ? "bg-[#3E3A4D]" : "bg-[#F2EEE8]")
            : ""
        }`}
      >
        <img
          // Logo qui change selon le mode clair/sombre
          src={lightMode ? de20Light : de20Dark}
          alt="Dé 20 Menu"
          className={`w-20 cursor-pointer transition-transform duration-500 ${
            rotate ? "animate-spin-once" : ""
          }`}
          onClick={handleDiceClick}
        />
      </header>

      {/* Menu de navigation avec animation d'apparition */}
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-start pt-40 z-[999] overflow-y-auto transition-all duration-300
        ${menuOpen ? "flex" : "hidden"}
        backdrop-blur-md bg-opacity-100
        ${lightMode ? "bg-[#3E3A4DCC]" : "bg-[#F2EEE8CC]"}`}
      >
        {navLinks.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={{
              transitionDelay: index < linksVisible ? `${index * 60}ms` : "0ms",
              opacity: index < linksVisible ? 1 : 0,
              transform:
                index < linksVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
            className={`text-3xl my-4 transition-all duration-500
               ${
                 lightMode
                   ? "text-[#F2EEE8] hover:text-[#dbcfb6]"
                   : "text-[#3E3A4D] hover:text-[#7160b3]"
               }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Header;
