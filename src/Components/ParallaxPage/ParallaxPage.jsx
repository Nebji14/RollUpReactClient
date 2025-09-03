import { useEffect } from "react";
import cloudsImg from "../../Assets/Images/clouds.webp";
import logoImg from "../../Assets/Images/Logo-SansFond.webp";
import mountainImg from "../../Assets/Images/mountain.webp";
import mountain2Img from "../../Assets/Images/mountain2.webp";
import castleImg from "../../Assets/Images/Chateau-fond.webp";
import Button from "../Common/Button.jsx";
import { NavLink } from "react-router-dom";

// Import FontAwesome (après installation)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const ParallaxPage = () => {
  useEffect(() => {
    // Récupération des éléments du DOM par leur ID
    const clouds = document.getElementById("clouds");
    const logo = document.getElementById("logo");
    const mountain = document.getElementById("mountain");
    const mountain2 = document.getElementById("mountain2");
    const btn = document.getElementById("btnEnSavoirPlus");
    const scrollArrow = document.getElementById("scrollArrow");

    // Vérification que tous les éléments existent avant d’appliquer l’effet
    if (clouds && mountain && mountain2 && btn) {
      // Stockage des positions/origines initiales pour servir de référence
      const cloudsOrigin = clouds.offsetTop;
      const mountainOrigin =
        parseInt(window.getComputedStyle(mountain).bottom) || 0;
      const mountain2Origin =
        parseInt(window.getComputedStyle(mountain2).left) || 0;
      const mountainRightOrigin =
        parseInt(window.getComputedStyle(mountain).right) || 0;
      const btnOriginTop = parseInt(window.getComputedStyle(btn).top) || 0;

      // Fonction appelée au scroll → gère les décalages et opacités
      const handleScroll = () => {
        const value = window.scrollY;

        // Limité uniquement à la hauteur de l'écran (effet parallax initial)
        if (value < window.innerHeight) {
          // Déplacement vertical des nuages
          clouds.style.top = cloudsOrigin + value * 0.7 + "px";
          clouds.style.opacity = Math.max(1 - value / 600, 0);

          // Fading du logo
          logo.style.opacity = Math.max(1 - value / 500, 0);

          // Déplacement et fade de la montagne droite
          mountain.style.bottom = mountainOrigin - value * 0.5 + "px";
          mountain.style.right = mountainRightOrigin - value + "px";
          mountain.style.opacity = Math.max(1 - value / 500, 0);

          // Déplacement et fade de la montagne gauche
          mountain2.style.left = mountain2Origin - value + "px";
          mountain2.style.opacity = Math.max(1 - value / 500, 0);

          // Déplacement vertical + fade du bouton "En savoir plus"
          btn.style.top = btnOriginTop + value * 0.7 + "px";
          btn.style.opacity = Math.max(1 - value / 600, 0);

          // Fade de la flèche de défilement
          if (scrollArrow) {
            scrollArrow.style.opacity = Math.max(1 - value / 300, 0);
          }
        }
      };

      // Écoute du scroll et nettoyage à la destruction du composant
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      <section
        id="secParallax"
        className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#9087b3] to-[#362f4b] "
      >
        {/* Dégradé en bas pour effet fondu avec la suite de la page */}
        <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-[#2b2a3a] to-transparent z-[5]" />

        {/* Nuages (parallax + fade) */}
        <img
          src={cloudsImg}
          alt="nuages"
          id="clouds"
          className="absolute z-[1] sm:top-[-10%] top-[35%]  left-1/2 w-full max-w-[1000px] -translate-x-1/2 pointer-events-none select-none"
        />

        {/* Logo central */}
        <img
          src={logoImg}
          alt="logo"
          id="logo"
          className="absolute z-[2] sm:top-0 top-[-30px] left-1/2 w-full max-w-[400px] -translate-x-1/2 pointer-events-none select-none"
        />

        {/* Montagnes (gauche et droite) */}
        <img
          src={mountainImg}
          alt="montagne droite"
          id="mountain"
          className="absolute z-[3] bottom-0 right-0 sm:w-[55vw] w-[80vw] sm:h-[75%] h-[55%] pointer-events-none select-none"
        />
        <img
          src={mountain2Img}
          alt="montagne gauche"
          id="mountain2"
          className="absolute z-[3] bottom-0 left-0 sm:w-[55vw] w-[80vw] sm:h-[75%] h-[55%] pointer-events-none select-none"
        />

        {/* Bouton CTA vers la page "About" */}
        <NavLink to="/About">
          <Button
            id="btnEnSavoirPlus"
            color="primary"
            text="En savoir plus"
            className="absolute z-[3] left-1/2 top-[64%] -translate-x-1/2 -translate-y-1/2"
          />
        </NavLink>

        {/* Château en arrière-plan */}
        <img
          src={castleImg}
          alt="château"
          id="castle"
          className="absolute z-[4] bottom-0 left-0 w-screen sm:h-1/2 h-[40%] pointer-events-none select-none"
        />

        {/* Flèche de défilement vers le bas avec FontAwesome */}
        <div className="absolute bottom-4 right-8 z-10">
          <div
            id="scrollArrow"
            className="animate-bounce flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={faAnglesDown}
              className="text-[#F2EEE8] text-4xl mb-1"
            />
            <span className="text-[#F2EEE8] text-sm">Scroll</span>
          </div>
        </div>
      </section>
    </>
  );
};
export default ParallaxPage;
