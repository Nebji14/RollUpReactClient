import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Recherche({ onClose }) {
  // Un seul état pour savoir quel menu est ouvert
  const [openMenu, setOpenMenu] = useState(null);

  const [genre, setGenre] = useState("Sélectionner");
  const [niveau, setNiveau] = useState("Sélectionner");
  const [systeme, setSysteme] = useState("Sélectionner");
  const [frequence, setFrequence] = useState(3);

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Horreur",
    "Historique",
    "Cyberpunk",
    "Steampunk",
    "Post-Apocalyptique",
  ];
  const niveaux = ["Débutant", "Intermédiaire", "Expert"];
  const systemes = [
    "D&D 5e",
    "Pathfinder",
    "Call of Cthulhu",
    "Shadowrun",
    "Vampire: La Mascarade",
  ];

  return (
    <div className="relative w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-[#F2EEE8] text-[#111827] flex flex-col gap-6 items-center">
      {/* Croix pour fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-6 text-2xl text-[#111827] hover:text-[#6c5ebf]"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Recherche..."
        className="w-[90%] md:w-[80%] h-12 px-4 rounded-full bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] focus:outline-none"
      />

      {/* GENRE */}
      <div className="w-[90%] md:w-[80%] relative">
        <label className="font-bold mb-2 block">Par Genre</label>
        <div
          className="flex items-center h-12 px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
          onClick={() => setOpenMenu(openMenu === "genre" ? null : "genre")}
        >
          <span className="flex-grow">{genre}</span>
          <FontAwesomeIcon
            icon={openMenu === "genre" ? faChevronUp : faChevronDown}
            className="absolute right-5 text-[#111827]"
          />
        </div>
        {openMenu === "genre" && (
          <div className="absolute mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {genres.map((g, idx) => (
              <div
                key={idx}
                className="px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white"
                onClick={() => {
                  setGenre(g);
                  setOpenMenu(null);
                }}
              >
                {g}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NIVEAU */}
      <div className="w-[90%] md:w-[80%] relative">
        <label className="font-bold mb-2 block">Niveau en JDR</label>
        <div
          className="flex items-center h-12 px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
          onClick={() => setOpenMenu(openMenu === "niveau" ? null : "niveau")}
        >
          <span className="flex-grow">{niveau}</span>
          <FontAwesomeIcon
            icon={openMenu === "niveau" ? faChevronUp : faChevronDown}
            className="absolute right-5 text-[#111827]"
          />
        </div>
        {openMenu === "niveau" && (
          <div className="absolute mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {niveaux.map((n, idx) => (
              <div
                key={idx}
                className="px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white"
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

      {/* SYSTEME */}
      <div className="w-[90%] md:w-[80%] relative">
        <label className="font-bold mb-2 block">Par Système</label>
        <div
          className="flex items-center h-12 px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
          onClick={() => setOpenMenu(openMenu === "systeme" ? null : "systeme")}
        >
          <span className="flex-grow">{systeme}</span>
          <FontAwesomeIcon
            icon={openMenu === "systeme" ? faChevronUp : faChevronDown}
            className="absolute right-5 text-[#111827]"
          />
        </div>
        {openMenu === "systeme" && (
          <div className="absolute mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {systemes.map((s, idx) => (
              <div
                key={idx}
                className="px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white"
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

      {/* FREQUENCE */}
      <div className="w-[90%] md:w-[80%]">
        <label className="block font-bold mb-2">
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
        <div className="text-sm mt-1">1 jour — 7 jours / semaine</div>
      </div>

      {/* Bouton final */}
      <Button
        color="secondary"
        text="Lancer une recherche"
        className="w-[90%] md:w-[80%] h-12 py-2 rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
