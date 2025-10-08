import React, { useState } from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import AshParticles from "../Components/Common/ParticlesBackground";
import CreerTable from "../Components/Common/CreateTable";
import JoinRequest from "../Components/Common/JoinRequest";

// Import du context et de la Card
import { useTable } from "../context/TableContext";
import TableCard from "../Components/Common/TableCardsPj";
import { useAuth } from "../context/AuthContext";

export default function LeCoinDesMj() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupération des tables via le contexte
  const { tables } = useTable();
  const { userConnected } = useAuth();

  console.log("tables mj", tables);

  return (
    // Structure principale avec fond et layout en colonne
    <div className="flex flex-col min-h-auto md:min-h-screen w-full bg-jdr-texture bg-cover bg-center bg-fixed">
      <Header />

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto pt-18 md:pt-32 pb-32 px-6">
        <AshParticles />

        {/* Section titre + boutons d'action */}
        <section className="w-full max-w-5xl mx-auto px-6">
          <h1 className="text-center text-[32px] font-bold text-[#31255b] mb-8 mt-5">
            Le coin des maîtres du jeu
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full mx-auto gap-4 sm:gap-6">
            {/* Bouton ouvre modal */}
            <Button
              color="secondary"
              text="Créer une table"
              icon={<FontAwesomeIcon icon={faPen} />}
              className="w-[250px] sm:w-auto"
              onClick={() => setIsModalOpen(true)}
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
          {/* Demandes des joueurs : NE PAS TOUCHER */}
          <div className="w-full max-w-5xl">
            <p className="font-semibold text-[#111827] text-[20px] mb-2 ">
              Demandes des joueurs :
            </p>
            <div className="text-[#111827] flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {/* Contenu Dynamique */}
              <JoinRequest />
            </div>
          </div>

          {/* Les tables ajoutés */}
          <div className="w-full max-w-5xl">
            <p className="font-semibold text-[#111827] text-[20px] mb-2 ">
              Vos tables ajoutées :
            </p>
            <div className="text-[#111827] flex flex-col md:flex-row md:flex-wrap gap-4">
              {tables.length > 0 ? (
                tables
                  .filter((t) => t.user.pseudo === userConnected.pseudo)
                  .map((table) => (
                    <TableCard
                      key={table._id}
                      table={table}
                      showEdit={true} //  affiche le bouton "Modifier la table"
                      showDelete={true} //  affiche le bouton "Supprimer cette table"
                    />
                  ))
              ) : (
                <p>Aucune table ajoutée pour l'instant.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[10000]"
          onClick={() => setIsModalOpen(false)} // clic sur le fond pour fermer
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreerTable onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
