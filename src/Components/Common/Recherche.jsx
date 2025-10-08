import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../utils/url";

export default function Recherche({ onClose, onSearch }) {
  const [openMenu, setOpenMenu] = useState(null);

  // États pour les champs
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Sélectionner");
  const [niveau, setNiveau] = useState("Sélectionner");
  const [systeme, setSysteme] = useState("Sélectionner");

  // Options de sélection
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

  // Fonction de recherche (appel API)
  const handleSearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tables`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erreur lors du chargement des tables");
      const data = await response.json();

      // Filtrage partiel (insensible à la casse)
      const filtered = data.filter((table) => {
        const matchSearch =
          !search.trim() ||
          table.titre.toLowerCase().includes(search.toLowerCase()) ||
          table.description?.toLowerCase().includes(search.toLowerCase());

        const matchGenre = genre === "Sélectionner" || table.genre === genre;
        const matchNiveau =
          niveau === "Sélectionner" || table.niveau === niveau;
        const matchSysteme =
          systeme === "Sélectionner" || table.systeme === systeme;

        return matchSearch && matchGenre && matchNiveau && matchSysteme;
      });

      if (onSearch) onSearch(filtered);
    } catch (error) {
      console.error("Erreur recherche:", error);
      alert("Erreur lors de la recherche des tables.");
    }
  };

  return (
    <div className="relative w-full max-w-md sm:max-w-2xl p-6 sm:p-8 rounded-2xl shadow-xl bg-[#F2EEE8] text-[#111827] flex flex-col gap-5 sm:gap-6 items-center">
      {/* Bouton de fermeture */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 sm:right-6 text-2xl text-[#111827] hover:text-[#6c5ebf]"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Titre */}
      <h2 className="text-lg sm:text-xl text-[#31255b] font-bold mb-2 text-center">
        Chercher une Table de Jeu
      </h2>

      {/* Barre de recherche texte */}
      <div className="w-full sm:w-[80%] flex flex-col gap-2">
        <label className="font-bold mb-1 block text-sm sm:text-base">
          Recherche
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nom, description..."
          className="h-10 sm:h-12 px-4 rounded-full bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] focus:outline-none text-sm sm:text-base"
        />
      </div>

      {/* GENRE */}
      <div className="w-full sm:w-[80%] relative">
        <label className="font-bold mb-1 sm:mb-2 block text-sm sm:text-base">
          Par Genre
        </label>
        <div
          className="flex items-center h-10 sm:h-12 px-4 sm:px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "genre" ? null : "genre")}
        >
          <span className="flex-grow">{genre}</span>
          <FontAwesomeIcon
            icon={openMenu === "genre" ? faChevronUp : faChevronDown}
            className="absolute right-4 sm:right-5 text-[#111827]"
          />
        </div>
        {openMenu === "genre" && (
          <div className="absolute mt-1 sm:mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {genres.map((g, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white text-sm sm:text-base"
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
      <div className="w-full sm:w-[80%] relative">
        <label className="font-bold mb-1 sm:mb-2 block text-sm sm:text-base">
          Niveau en JDR
        </label>
        <div
          className="flex items-center h-10 sm:h-12 px-4 sm:px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "niveau" ? null : "niveau")}
        >
          <span className="flex-grow">{niveau}</span>
          <FontAwesomeIcon
            icon={openMenu === "niveau" ? faChevronUp : faChevronDown}
            className="absolute right-4 sm:right-5 text-[#111827]"
          />
        </div>
        {openMenu === "niveau" && (
          <div className="absolute mt-1 sm:mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {niveaux.map((n, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white text-sm sm:text-base"
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
      <div className="w-full sm:w-[80%] relative">
        <label className="font-bold mb-1 sm:mb-2 block text-sm sm:text-base">
          Par Système
        </label>
        <div
          className="flex items-center h-10 sm:h-12 px-4 sm:px-5 pr-10 rounded-full border border-[#111827] bg-[#E9E4DA] cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-sm sm:text-base"
          onClick={() => setOpenMenu(openMenu === "systeme" ? null : "systeme")}
        >
          <span className="flex-grow">{systeme}</span>
          <FontAwesomeIcon
            icon={openMenu === "systeme" ? faChevronUp : faChevronDown}
            className="absolute right-4 sm:right-5 text-[#111827]"
          />
        </div>
        {openMenu === "systeme" && (
          <div className="absolute mt-1 sm:mt-2 w-full rounded-xl bg-[#E9E4DA] border border-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10">
            {systemes.map((s, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2 cursor-pointer rounded-xl hover:bg-[#6c5ebf] hover:text-white text-sm sm:text-base"
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

      {/* BOUTON FINAL */}
      <Button
        color="secondary"
        text="Lancer une recherche"
        className="w-full sm:w-auto h-10 sm:h-12 py-2 rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
        onClick={handleSearch}
      />
    </div>
  );
}
