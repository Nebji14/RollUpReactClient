import React from "react";
import Button from "./Button";

const Card = () => {
  return (
    <div
      className="flex rounded-[20px] overflow-hidden shadow-md"
      style={{ backgroundColor: "#F2EEE8", color: "#111827" }}
    >
      {/* IMAGE (récupérée du backend) */}
      <div className="w-1/2">
        {/* <img src={backendImageUrl} alt="illustration" className="h-full w-full object-cover" /> */}
      </div>

      {/* CONTENU TEXTE */}
      <div className="w-1/2 flex flex-col justify-between p-4">
        <div>
          {/* TITRE */}
          <h2 className="text-xl font-bold mb-2">
            {/* {backendTitle} */}
            La Lueur sous les Ruines
          </h2>

          {/* INFOS DE BASE */}
          <ul className="text-sm mb-4 space-y-1">
            <li>
              {/* {backendDiscordLink} */}
              Lien Discord
            </li>
            <li>
              {/* {backendRoll20Link} */}
              Lien Roll20
            </li>
            <li>
              Joueurs : {/* {backendPlayersNumber} */}/
              {/* {backendPlayersMax} */}
            </li>
            <li>
              {/* {backendBeginnerAccepted} */}
              Débutant acceptés
            </li>
            <li>
              {/* {backendTheme} */}
              Aventure / Horreur légère
            </li>
            <li>{/* {backendFrequency} */}2 Fois / Semaine</li>
            <li>
              {/* {backendSystem} */}
              Chroniques Oubliées Fantasy (d20)
            </li>
          </ul>

          {/* DESCRIPTION */}
          <div
            className="rounded-[10px] p-2 text-sm overflow-y-auto max-h-32"
            style={{ backgroundColor: "#E9E4DA" }}
          >
            {/* {backendDescription} */}
            Un vieux village minier cache un réseau de tunnels oubliés, d'où
            filtre une étrange lueur. Vous incarnez des envoyés de la
            Exploration, ambiance sombre ambiance sombre et...Un vieux village
            minier cache un réseau de tunnels oubliés, d'où filtre une étrange
            lueur. Vous incarnez des envoyés de la Exploration, ambiance sombre
            ambiance sombre et...Un vieux village minier cache un réseau de
            tunnels oubliés, d'où filtre une étrange lueur. Vous incarnez des
            envoyés de la Exploration, ambiance sombre ambiance sombre. Un vieux
            village minier cache un réseau de tunnels oubliés, d'où filtre une
            étrange lueur. Vous incarnez des envoyés de la Exploration, ambiance
            sombre ambiance sombre et...Un vieux village minier cache un réseau
            de tunnels oubliés, d'où filtre une étrange lueur. Vous incarnez des
            envoyés de la Exploration, ambiance sombre ambiance sombre et...
          </div>
        </div>

        {/* BOUTON */}
        <div className="mt-4">
          <Button
            color="secondary"
            text="Quitter la table"
            className="w-[250px] sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
