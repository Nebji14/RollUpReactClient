import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faChevronUp,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function CreerTable({ onClose }) {
  const [openMenu, setOpenMenu] = useState(null);

  // États
  const [titre, setTitre] = useState("");
  const [discord, setDiscord] = useState("");
  const [roll20, setRoll20] = useState("");
  const [image, setImage] = useState(null);
  const [nbJoueurs, setNbJoueurs] = useState("Sélectionner");
  const [niveau, setNiveau] = useState("Sélectionner");
  const [systeme, setSysteme] = useState("Sélectionner");
  const [frequence, setFrequence] = useState(3);
  const [synopsis, setSynopsis] = useState("");

  // Données
  const joueurs = Array.from({ length: 10 }, (_, i) => i + 1);
  const niveaux = ["Débutant", "Intermédiaire", "Expert"];
  const systemes = [
    "D&D 5e",
    "Pathfinder",
    "Call of Cthulhu",
    "Shadowrun",
    "Vampire: La Mascarade",
  ];

  return (
    <div className="relative w-[95%] sm:w-[90%] md:max-w-2xl p-4 sm:p-6 rounded-2xl shadow-xl border border-[#E9E4DA] bg-donjon bg-center bg-cover text-[#F2EEE8] flex flex-col gap-5 items-center sm:max-h-[75vh] max-h-[70vh]  overflow-y-auto mt-10 sm:mt-0">
      {/* Croix pour fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-3 right-4 sm:top-4 sm:right-6 text-xl sm:text-2xl text-[#F2EEE8] hover:text-[#f3cc7a]"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Titre */}
      <h2 className="text-lg sm:text-xl text-[#f3cc7a] font-bold mb-2 text-center">
        Créer une table de jeu
      </h2>

      {/* Titre du JdR */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Titre du JdR
        </label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Ex: La campagne de l'éternel"
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
      </div>

      {/* Lien Discord */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Lien vers le salon Discord
        </label>
        <input
          type="url"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
          placeholder="https://discord.gg/..."
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
      </div>

      {/* Lien Roll20 */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Lien vers la table Roll20
        </label>
        <input
          type="url"
          value={roll20}
          onChange={(e) => setRoll20(e.target.value)}
          placeholder="https://app.roll20.net/join/..."
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
      </div>

      {/* Image de fond */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Image de fond
        </label>
        <div
          className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-[#111827] rounded-xl bg-[#E9E4DA] text-[#111827] cursor-pointer hover:bg-[#d6d1c8] transition text-sm sm:text-base"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FontAwesomeIcon
            icon={faCloudUploadAlt}
            className="text-xl sm:text-2xl mb-1"
          />
          {image ? (
            <span className="text-xs sm:text-sm">{image.name}</span>
          ) : (
            <span className="text-xs sm:text-sm">
              Cliquez ou déposez une image
            </span>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Nombre de joueurs */}
      <div className="w-full sm:w-[90%] relative">
        <label className="font-bold mb-1 block text-sm sm:text-base">
          Nombre de joueurs
        </label>
        <div
          className="flex items-center w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] cursor-pointer text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "joueurs" ? null : "joueurs")}
        >
          <span className="flex-grow">{nbJoueurs}</span>
          <FontAwesomeIcon
            icon={openMenu === "joueurs" ? faChevronUp : faChevronDown}
            className="absolute right-3"
          />
        </div>
        {openMenu === "joueurs" && (
          <div className="absolute mt-1 w-full rounded-lg bg-[#E9E4DA] text-[#111827] border border-[#111827] z-10 text-sm sm:text-base">
            {joueurs.map((j, idx) => (
              <div
                key={idx}
                className="px-3 py-1 cursor-pointer rounded-lg hover:bg-[#6c5ebf] hover:text-white"
                onClick={() => {
                  setNbJoueurs(j);
                  setOpenMenu(null);
                }}
              >
                {j}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Niveau */}
      <div className="w-full sm:w-[90%] relative">
        <label className="font-bold mb-1 block text-sm sm:text-base">
          Niveau en JDR
        </label>
        <div
          className="flex items-center w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] cursor-pointer text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "niveau" ? null : "niveau")}
        >
          <span className="flex-grow">{niveau}</span>
          <FontAwesomeIcon
            icon={openMenu === "niveau" ? faChevronUp : faChevronDown}
            className="absolute right-3"
          />
        </div>
        {openMenu === "niveau" && (
          <div className="absolute mt-1 w-full rounded-lg bg-[#E9E4DA] text-[#111827] border border-[#111827] z-10 text-sm sm:text-base">
            {niveaux.map((n, idx) => (
              <div
                key={idx}
                className="px-3 py-1 cursor-pointer rounded-lg hover:bg-[#6c5ebf] hover:text-white"
                onClick={() => {
                  setNiveau(n);
                  setOpenMenu(null);
                }}
              >
                {n}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Système */}
      <div className="w-full sm:w-[90%] relative">
        <label className="font-bold mb-1 block text-sm sm:text-base">
          Par Système
        </label>
        <div
          className="flex items-center w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] cursor-pointer text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "systeme" ? null : "systeme")}
        >
          <span className="flex-grow">{systeme}</span>
          <FontAwesomeIcon
            icon={openMenu === "systeme" ? faChevronUp : faChevronDown}
            className="absolute right-3"
          />
        </div>
        {openMenu === "systeme" && (
          <div className="absolute mt-1 w-full rounded-lg bg-[#E9E4DA] text-[#111827] border border-[#111827] z-10 text-sm sm:text-base">
            {systemes.map((s, idx) => (
              <div
                key={idx}
                className="px-3 py-1 cursor-pointer rounded-lg hover:bg-[#6c5ebf] hover:text-white"
                onClick={() => {
                  setSysteme(s);
                  setOpenMenu(null);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fréquence */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Fréquence ({frequence} / semaine)
        </label>
        <input
          type="range"
          min="1"
          max="7"
          value={frequence}
          onChange={(e) => setFrequence(e.target.value)}
          className="w-full accent-[#3E3A4D]"
        />
        <div className="text-xs sm:text-sm mt-1">
          1 jour — 7 jours / semaine
        </div>
      </div>

      {/* Synopsis */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Synopsis
        </label>
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Décrivez votre campagne..."
          rows={3}
          className="w-full p-2 sm:p-4 rounded-xl bg-[#E9E4DA] text-[#111827] border border-[#111827] focus:outline-none text-xs sm:text-sm"
        />
      </div>

      {/* Bouton final */}
      <Button
        color="secondary"
        text="Créer une table"
        className="py-2 rounded-full text-sm sm:text-base"
      />
    </div>
  );
}
