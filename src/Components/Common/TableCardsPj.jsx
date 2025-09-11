import React, { useState } from "react";
import Button from "./Button";

const Card = () => {
  const [isJoined, setIsJoined] = useState(false);

  const handleToggle = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden shadow-xl bg-[#F2EEE8] text-[#111827] rounded-[20px]">
      {/* IMAGE (récupérée du backend) */}
      <div className="w-full md:w-1/2">
        <div className="h-48 md:h-full w-full rounded-t-[20px] md:rounded-t-none md:rounded-l-[20px] border-2 border-[#3E3A4D] overflow-hidden">
          <img
            src={"backendImageUrl"}
            alt="illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* CONTENU TEXTE */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4">
        <div>
          {/* TITRE */}
          <h2 className="text-xl font-bold mb-2">La Lueur sous les Ruines</h2>

          {/* INFOS DE BASE */}
          <ul className="text-sm mb-4 space-y-1">
            <li>Lien Discord</li>
            <li>Lien Roll20</li>
            <li>
              Joueurs : {/* {backendNombreJoueurs} */}/
              {/* {backendNombreJoueursMax} */}
            </li>
            <li>Débutant</li>
            <li>Aventure / Horreur légère</li>
            <li>2 Fois / Semaine</li>
            <li>Chroniques Oubliées Fantasy (d20)</li>
          </ul>

          {/* DESCRIPTION */}
          <div className="rounded-[10px] p-2 text-sm overflow-y-auto max-h-32 bg-[#E9E4DA]">
            Un vieux village minier cache un réseau de tunnels oubliés, d'où
            filtre une étrange lueur. Vous incarnez des envoyés de la
            Exploration, ambiance sombre ambiance sombre et...
          </div>
        </div>

        {/* BOUTON */}
        <div className="mt-4">
          <Button
            color="secondary"
            text={isJoined ? "Quitter la table" : "Rejoindre la table"}
            className="w-full sm:w-auto"
            onClick={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
