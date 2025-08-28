import React from "react";
import Battle from "../Assets/Images/Battle.webp";
import Button from "../Components/Common/Button";
import { NavLink } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden">
        {/* Conteneur scrollable */}
        <div className="h-full overflow-y-auto scroll-smooth">
          {/* Bloc 1 titre + image */}
          <div className="min-h-screen flex flex-col items-center justify-start gap-8 p-8 text-[#f3cc7a]">
            <h1 className="text-5xl font-bold text-center mt-16">
              Le jeu de rôle commence ici
            </h1>
            <img
              src={Battle}
              alt="Illustration Battle"
              className="w-300 h-auto rounded-lg shadow-lg mx-auto mt-16"
            />
          </div>

          {/* Bloc 2 text + btn */}
          <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-[#F2EEE8]">
            <div className="max-w-xl space-y-4 text-start">
              <h2 className="text-[20px] font-semibold">
                Bienvenue, aventurier :
              </h2>
              <p>
                Tu es peut-être tombé ici par hasard… ou peut-être est-ce le
                début de ta première quête. Ce site a été conçu pour guider les
                débutants dans leur découverte du jeu de rôle (JDR). Que tu
                n’aies jamais lancé un dé ou que tu sois simplement curieux, tu
                trouveras ici de quoi comprendre, tester, et te lancer
                facilement dans l’aventure.
              </p>
              <h2 className="text-[20px] font-semibold">
                Ce que le site propose :
              </h2>
              <ul className="llist-disc list-inside text-left text-[16px]">
                <li>
                  Un parcours d’initiation ludique, avec deux questionnaires
                  interactifs : L’un pour découvrir quel type d’univers JDR te
                  correspond. L’autre pour savoir si tu es plutôt joueur, maître
                  du jeu… ou les deux.
                </li>
                <li>
                  Des ressources adaptées à ton profil : guides, vidéos,
                  podcasts, et des scénarios prêts à jouer gratuitement.
                </li>
                <li>
                  Des liens vers les boutiques et plateformes pour trouver les
                  bons outils, en ligne comme en présentiel.
                </li>
                <li>
                  Une communauté bienveillante (forum, Discord), pour poser des
                  questions, partager tes expériences et rencontrer d’autres
                  passionnés.
                </li>
                <li>
                  Un système de mise en relation sécurisé avec des joueurs ou
                  MJ, selon tes envies, ton niveau, et ta disponibilité.
                </li>
              </ul>
              <h2 className="text-[20px] font-semibold"> L’objectif ? </h2>
              <p>
                Si tu débutes t’aider à franchir les premières étapes, sans
                pression, à ton rythme. Et peut-être, te donner envie de
                raconter tes propres histoires autour d’une table, réelle ou
                virtuelle.
              </p>
            </div>
            <NavLink to="/">
              <Button
                color="primary"
                text="Retour"
                className="px-6 py-3 mt-4"
              />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
