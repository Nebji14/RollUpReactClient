// src/Pages/LeCoinDesPj.jsx
import React, { useState } from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Recherche from "../Components/Common/Recherche";
import TableCard from "../Components/Common/TableCardsPj"; // ta card existante
import { useTable } from "../context/TableContext";

export default function LeCoinDesPj() {
  //  ouvrir / fermer la modale de recherche
  const [openRecherche, setOpenRecherche] = useState(false);

  // les filtres
  const [searchResults, setSearchResults] = useState([]); // stockera les tables trouvées
  const [hasSearched, setHasSearched] = useState(false); // pour savoir si une recherche a été faite

  // context pour récupérer toutes les tables
  const { tables: _tables } = useTable();

  // fonction appelée depuis la modale de recherche
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setHasSearched(true);
    setOpenRecherche(false);
  };

  return (
    <div className="flex flex-col min-h-auto md:min-h-screen w-full bg-donjon bg-cover bg-center bg-fixed">
      <Header />

      <main className="flex-1 overflow-y-auto pt-18 md:pt-32 pb-32 px-6">
        <section className="w-full max-w-5xl mx-auto px-6">
          <h1 className="text-center text-[32px] font-bold text-[#F3CC7A] mb-8 mt-5">
            Le coin des Joueurs
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full mx-auto gap-4 sm:gap-6">
            <Button
              color="primary"
              text="Recherche"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              className="w-[250px] sm:w-auto"
              onClick={() => setOpenRecherche(true)}
            />
            <NavLink to="/Mj">
              <Button
                color="primary"
                text="Le coin des Mj"
                className="w-[250px] sm:w-auto"
              />
            </NavLink>
          </div>
        </section>

        <section className="mt-16 flex flex-col items-center gap-16 px-4 sm:px-20">
          {/* Résultats de recherche */}
          <div className="w-full max-w-5xl">
            <p className="font-semibold text-[#F2EEE8] text-[20px] mb-2 ">
              Recherche de tables :
            </p>

            <div className="text-[#F2EEE8] flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {hasSearched ? (
                searchResults.length > 0 ? (
                  searchResults.map((table) => (
                    <TableCard
                      key={table._id}
                      table={table}
                      showJoin={true} // affiche le bouton Rejoindre/Quitter
                    />
                  ))
                ) : (
                  <p>Aucune table trouvée pour ces critères.</p>
                )
              ) : (
                <p>Lance une recherche pour voir les résultats ici.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modale de recherche */}
      {openRecherche && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-[10000]">
          <Recherche
            onClose={() => setOpenRecherche(false)}
            onSearch={handleSearchResults}
          />
        </div>
      )}
    </div>
  );
}
