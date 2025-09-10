import React from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import AshParticles from "../Components/Common/ParticlesBackground";

export default function LeCoinDesMj() {
  return (
    // Structure principale avec fond et layout en colonne
    <div className="flex flex-col min-h-screen w-full bg-jdr-texture bg-cover bg-center bg-fixed">
      <Header />

      {/* Contenu principal avec marge en haut pour laisser de l'espace au header */}
      <main className="flex-1 overflow-y-auto pt-32 pb-32 px-6">
        <AshParticles />

        {/* Section titre + boutons d'action */}
        <section className="w-full max-w-5xl mx-auto px-6">
          <h1 className="text-center text-[32px] font-bold text-[#31255b] mb-8 mt-5">
            Le coin des maîtres du jeu
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full mx-auto gap-4 sm:gap-6">
            <Button
              color="secondary"
              text="Créer une table"
              icon={<FontAwesomeIcon icon={faPen} />}
              className="w-[250px] sm:w-auto"
            />

            <NavLink to="/Pj">
              <Button
                color="secondary"
                text="Le coin des Pj"
                className="w-[250px] sm:w-auto"
              />
            </NavLink>
          </div>
        </section>

        {/* Section avec deux blocs : recherche de tables + tables ajoutées */}
        <section className="mt-16 flex flex-col items-center gap-16 px-4 sm:px-20">
          <div className="w-full max-w-5xl">
            <p className="font-semibold text-[#111827] text-[20px] mb-2 ">
              Recherche de tables :
            </p>
            <div className="text-[#111827] flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {/* Contenu Dynamique */}
            </div>
          </div>

          <div className="w-full max-w-5xl">
            <p className="font-semibold text-[#111827] text-[20px] mb-2 ">
              Vos tables ajoutées :
            </p>
            <div className="text-[#111827] flex flex-col md:flex-row md:flex-wrap gap-4">
              {/* Contenu Dynamique */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
