import React from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function LeCoinDesPj() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />

      {/* Contenu scrollable */}
      <main className="flex-1 overflow-y-auto w-full">
        <section className="w-full min-h-screen bg-donjon bg-cover bg-center flex flex-col pt-[120px] px-6 pb-32">
          {/* pt-[120px] = espace pour le Header fixe */}
          <h1 className="text-center text-[32px] font-bold text-[#F3CC7A] mb-8 mt-5">
            Le coin des joueurs
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full mx-auto gap-4 sm:gap-6">
            <Button
              color="primary"
              text="Recherche"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              className="w-[250px] sm:w-auto"
            />
            <Button
              color="primary"
              text="Filtrer"
              icon={<FontAwesomeIcon icon={faFilter} />}
              className="w-[250px] sm:w-auto"
            />
            <NavLink to="/Mj">
              <Button
                color="primary"
                text="Le coin des Mj"
                className="w-[250px] sm:w-auto"
              />
            </NavLink>
          </div>

          <div className="mt-16 flex flex-col items-center gap-16 px-4 sm:px-20">
            <div className="w-full max-w-5xl">
              <p className="font-semibold text-[#F2EEE8] text-[20px] mb-2">
                Recherche de tables :
              </p>
              <div className="text-[#F2EEE8] flex flex-col sm:flex-row sm:flex-wrap gap-4">
                {/* Contenu Dynamique */}
              </div>
            </div>

            <div className="w-full max-w-5xl">
              <p className="font-semibold text-[#F2EEE8] text-[20px] mb-2">
                Vos tables ajoutées :
              </p>
              <div className="text-[#F2EEE8] flex flex-col md:flex-row md:flex-wrap gap-4">
                {/* Contenu Dynamique */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
