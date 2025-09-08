import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import de20Light from "../../Assets/Images/de20-light.webp";
import de20Dark from "../../Assets/Images/de20.webp";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [scrolledMenu, setScrolledMenu] = useState(false);
  const [linksVisible, setLinksVisible] = useState(0);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Gestion du changement clair/sombre
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
          if (section.classList.contains("bg-jdr-texture")) {
            isLight = false;
          } else if (section.classList.contains("bg-donjon")) {
            isLight = true;
          } else {
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

  // Body overflow
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

  // Scroll menu
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

  // Animation liens
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

  // Liens navigation
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
        { to: "/CoinJoueurs", label: "Le coin des Joueurs" },
        { to: "/CoinMaitre", label: "Le coin des Maîtres du Jeu" },
      ],
    },
    { to: "/Contact", label: "Contact" },
    { to: "/MonCompte", label: "Mon compte" },
    { to: "/", onClick: logout, label: "Déconnexion" },
  ];

  const handleDiceClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 600);
    setMenuOpen(!menuOpen);
    setScrolledMenu(false);
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
          src={lightMode ? de20Light : de20Dark}
          alt="Dé 20 Menu"
          className={`w-20 cursor-pointer transition-transform duration-500 ${
            rotate ? "animate-spin-once" : ""
          }`}
          onClick={handleDiceClick}
        />
      </header>

      {/* Menu */}
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
