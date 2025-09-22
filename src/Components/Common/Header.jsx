import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import de20Light from "../../Assets/Images/de20-light.webp";
import de20Dark from "../../Assets/Images/de20.webp";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  // États pour gérer l'ouverture du menu, l'affichage en mode clair/sombre, les animations et le défilement
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [scrolledMenu, setScrolledMenu] = useState(false);
  const [linksVisible, setLinksVisible] = useState(0);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Récupère le container de scroll (main ou window)
  const getScrollContainer = () => document.querySelector("main") || window;

  // Gestion du scroll général pour ajouter un fond au header
  useEffect(() => {
    const sc = getScrollContainer();
    const handleScroll = () => {
      const scrollTop = sc === window ? window.scrollY : sc.scrollTop;
      setScrolled(scrollTop > 50);
    };

    sc.addEventListener
      ? sc.addEventListener("scroll", handleScroll)
      : window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      sc.removeEventListener
        ? sc.removeEventListener("scroll", handleScroll)
        : window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Détection du mode clair/sombre en fonction des sections visibles
  useEffect(() => {
    const sc = getScrollContainer();

    const handleScroll = () => {
      const scrollTop = sc === window ? window.scrollY : sc.scrollTop;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const scrollPosition = scrollTop + headerHeight / 2;
      let isLight = false;

      const sections = document.querySelectorAll(
        "section, .bg-jdr-texture, .bg-donjon, main > div"
      );

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const scRect = sc === window ? { top: 0 } : sc.getBoundingClientRect();
        const top =
          rect.top -
          scRect.top +
          (sc === window ? window.scrollY : sc.scrollTop);
        const bottom = top + rect.height;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          if (
            section.classList &&
            section.classList.contains("bg-jdr-texture")
          ) {
            isLight = false;
          } else if (
            section.classList &&
            section.classList.contains("bg-donjon")
          ) {
            isLight = true;
          } else {
            const bgColor = getComputedStyle(section).backgroundColor || "";
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

    sc.addEventListener
      ? sc.addEventListener("scroll", handleScroll)
      : window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      sc.removeEventListener
        ? sc.removeEventListener("scroll", handleScroll)
        : window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Empêche le scroll du body quand le menu est ouvert
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

  // Gestion du scroll interne du menu (ajout d’un fond au besoin)
  useEffect(() => {
    const menu = menuRef.current;
    const handleMenuScroll = () => {
      if (menu && menu.scrollTop > 10) setScrolledMenu(true);
      else setScrolledMenu(false);
    };
    if (menuOpen && menu) {
      menu.addEventListener("scroll", handleMenuScroll);
      handleMenuScroll();
    }
    return () => {
      if (menu) menu.removeEventListener("scroll", handleMenuScroll);
    };
  }, [menuOpen]);

  // Animation d’apparition progressive des liens du menu
  useEffect(() => {
    if (menuOpen) {
      setLinksVisible(0);
      const timer = setInterval(() => {
        setLinksVisible((prev) => {
          if (prev < navLinks.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 60);
      return () => clearInterval(timer);
    } else {
      setLinksVisible(0);
      setSubmenuOpen(false);
    }
  }, [menuOpen]);

  // Liste des liens de navigation (inclut des sous-liens pour la communauté)
  const navLinks = [
    { to: "/Home", label: "Accueil" },
    { to: "/WhatJdr", label: "Quel JdR pour moi ?" },
    { to: "/IdealRole", label: "Ton rôle idéal" },
    { to: "/DescoverJdr", label: "Découvrir les JdR" },
    { to: "/GuideTips", label: "Guides & Astuces" },
    { to: "/OneShot", label: "Scénarios prêts-à-jouer" },
    {
      label: "Tables & Communauté",
      subLinks: [
        { to: "/Pj", label: "Le coin des Joueurs" },
        { to: "/Mj", label: "Le coin des Maîtres du Jeu" },
      ],
    },
    { to: "/Contact", label: "Contact" },
    { to: "/MonCompte", label: "Mon compte" },
    { to: "/", onClick: logout, label: "Déconnexion" },
  ];

  // Gestion du clic sur le dé (ouvre/ferme le menu et lance l’animation)
  const handleDiceClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 600);
    setMenuOpen(!menuOpen);
    setScrolledMenu(false);
  };

  return (
    <>
      {/* Header avec le dé servant de bouton menu */}
      <header
        ref={headerRef}
        className={`top-0 left-0 w-full flex justify-center z-[9998] py-2 transition-all duration-300
    md:fixed 
    ${
      scrolled || scrolledMenu
        ? lightMode
          ? "backdrop-blur-md bg-[#3E3A4D]/80"
          : "backdrop-blur-md bg-[#F2EEE8]/80"
        : "bg-transparent"
    }
  `}
      >
        <img
          src={lightMode ? de20Light : de20Dark}
          alt="Dé 20 Menu"
          className={`w-20  cursor-pointer transition-transform duration-500 ${
            rotate ? "animate-spin-once" : ""
          }`}
          onClick={handleDiceClick}
        />
      </header>

      {/* Menu latéral plein écran */}
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-start pt-40 z-[999] overflow-y-auto transition-all duration-300
        ${menuOpen ? "flex" : "hidden"}
        backdrop-blur-md bg-opacity-100
        ${lightMode ? "bg-[#3E3A4DCC]" : "bg-[#F2EEE8CC]"}`}
      >
        {navLinks.map((link, index) =>
          link.subLinks ? (
            <div key={link.label} className="flex flex-col items-center">
              <button
                onClick={() => setSubmenuOpen((prev) => !prev)}
                style={{
                  transitionDelay:
                    index < linksVisible ? `${index * 60}ms` : "0ms",
                  opacity: index < linksVisible ? 1 : 0,
                  transform:
                    index < linksVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
                className={`flex items-center gap-2 text-3xl my-4 transition-all duration-500
                  ${
                    lightMode
                      ? "text-[#F2EEE8] hover:text-[#f3cc7a]"
                      : "text-[#3E3A4D] hover:text-[#6c5ebf]"
                  }`}
              >
                {link.label}
                {submenuOpen ? (
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    className={lightMode ? "text-[#F2EEE8]" : "text-[#3E3A4D]"}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={lightMode ? "text-[#F2EEE8]" : "text-[#3E3A4D]"}
                  />
                )}
              </button>
              {submenuOpen &&
                link.subLinks.map((sub, subIndex) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    style={{
                      transitionDelay:
                        index < linksVisible
                          ? `${(index + subIndex + 1) * 60}ms`
                          : "0ms",
                      opacity: index < linksVisible ? 1 : 0,
                      transform:
                        index < linksVisible
                          ? "translateY(0)"
                          : "translateY(20px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                    className={`text-xl my-2 transition-all duration-500
                      ${
                        lightMode
                          ? "text-[#F2EEE8] hover:text-[#E9E4DA]"
                          : "text-[#3E3A4D] hover:text-[#6c5ebf]"
                      }`}
                    onClick={async () => {
                      setMenuOpen(false);
                      if (sub.onClick) {
                        await sub.onClick();
                      }
                    }}
                  >
                    {sub.label}
                  </NavLink>
                ))}
            </div>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              style={{
                transitionDelay:
                  index < linksVisible ? `${index * 60}ms` : "0ms",
                opacity: index < linksVisible ? 1 : 0,
                transform:
                  index < linksVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
              className={`text-3xl my-4 transition-all duration-500
                ${
                  lightMode
                    ? "text-[#F2EEE8] hover:text-[#f3cc7a]"
                    : "text-[#3E3A4D] hover:text-[#6c5ebf]"
                }`}
              onClick={async () => {
                setMenuOpen(false);
                if (link.onClick) {
                  await link.onClick();
                }
              }}
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>
    </>
  );
}

export default Header;
