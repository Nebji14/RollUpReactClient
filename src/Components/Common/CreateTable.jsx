import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faChevronUp,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addTable } from "../../api/table.api";

const schema = yup.object().shape({
  titre: yup.string().required("Le titre est obligatoire"),
  discord: yup
    .string()
    .url("Lien invalide")
    .required("Le lien Discord est obligatoire"),
  roll20: yup
    .string()
    .url("Lien invalide")
    .required("Le lien Roll20 est obligatoire"),
  nbJoueurs: yup
    .mixed()
    .test(
      "required",
      "Le nombre de joueurs est obligatoire",
      (value) => value !== "Sélectionner"
    ),
  niveau: yup
    .mixed()
    .test(
      "required",
      "Le niveau est obligatoire",
      (value) => value !== "Sélectionner"
    ),
  systeme: yup
    .mixed()
    .test(
      "required",
      "Le système est obligatoire",
      (value) => value !== "Sélectionner"
    ),
  frequence: yup.number().required("La fréquence est obligatoire"),
  synopsis: yup.string().required("Le synopsis est obligatoire"),
});

export default function CreerTable({ onClose }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titre: "",
      discord: "",
      roll20: "",
      nbJoueurs: "Sélectionner",
      niveau: "Sélectionner",
      systeme: "Sélectionner",
      frequence: 3,
      synopsis: "",
    },
  });

  // watch the frequence so we can display its current value and keep the slider fully functional
  const frequenceValue = watch("frequence");

  const joueurs = Array.from({ length: 10 }, (_, i) => i + 1);
  const niveaux = ["Débutant", "Intermédiaire", "Expert"];
  const systemes = [
    "D&D 5e",
    "Pathfinder",
    "Call of Cthulhu",
    "Shadowrun",
    "Vampire: La Mascarade",
  ];

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const newTable = await addTable(data);
      console.log(newTable);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[95%] sm:w-[42rem] md:max-w-2xl p-4 sm:p-8 rounded-2xl shadow-xl border border-[#E9E4DA] bg-donjon bg-center bg-cover text-[#F2EEE8] flex flex-col gap-5 items-center sm:max-h-[75vh] max-h-[70vh] overflow-y-auto mt-10 sm:mt-0"
    >
      {/* Croix pour fermer */}
      <button
        type="button"
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
          {...register("titre")}
          placeholder="Ex: La campagne de l'éternel"
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
        {errors.titre && (
          <p className="text-red-500 text-xs mt-1">{errors.titre.message}</p>
        )}
      </div>

      {/* Lien Discord */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Lien vers le salon Discord
        </label>
        <input
          type="url"
          {...register("discord")}
          placeholder="https://discord.gg/..."
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
        {errors.discord && (
          <p className="text-red-500 text-xs mt-1">{errors.discord.message}</p>
        )}
      </div>

      {/* Lien Roll20 */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Lien vers la table Roll20
        </label>
        <input
          type="url"
          {...register("roll20")}
          placeholder="https://app.roll20.net/join/..."
          className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-full bg-[#E9E4DA] text-[#111827] shadow-[0_5px_5px_rgba(0,0,0,0.5)] border border-[#111827] focus:outline-none text-sm sm:text-base"
        />
        {errors.roll20 && (
          <p className="text-red-500 text-xs mt-1">{errors.roll20.message}</p>
        )}
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
          <span className="flex-grow">{watch("nbJoueurs")}</span>
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
                  setValue("nbJoueurs", j);
                  setOpenMenu(null);
                }}
              >
                {j}
              </div>
            ))}
          </div>
        )}
        {errors.nbJoueurs && (
          <p className="text-red-500 text-xs mt-1">
            {errors.nbJoueurs.message}
          </p>
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
          <span className="flex-grow">
            <span className="flex-grow">{watch("niveau")}</span>
          </span>
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
                  setValue("niveau", n);
                  setOpenMenu(null);
                }}
              >
                {n}
              </div>
            ))}
          </div>
        )}
        {errors.niveau && (
          <p className="text-red-500 text-xs mt-1">{errors.niveau.message}</p>
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
          <span className="flex-grow">
            <span className="flex-grow">{watch("systeme")}</span>
          </span>
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
                  setValue("systeme", s);
                  setOpenMenu(null);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
        {errors.systeme && (
          <p className="text-red-500 text-xs mt-1">{errors.systeme.message}</p>
        )}
      </div>

      {/* Fréquence (CORRIGÉ) */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Fréquence ({Number(frequenceValue)} / semaine)
        </label>
        <input
          type="range"
          min="1"
          max="7"
          {...register("frequence")}
          value={frequenceValue}
          onChange={(e) => setValue("frequence", Number(e.target.value))}
          className="w-full accent-[#3E3A4D]"
        />
        <div className="text-xs sm:text-sm mt-1">
          1 jour — 7 jours / semaine
        </div>
        {errors.frequence && (
          <p className="text-red-500 text-xs mt-1">
            {errors.frequence.message}
          </p>
        )}
      </div>

      {/* Synopsis */}
      <div className="w-full sm:w-[90%]">
        <label className="block font-bold mb-1 text-sm sm:text-base">
          Synopsis
        </label>
        <textarea
          {...register("synopsis")}
          placeholder="Décrivez votre campagne..."
          rows={3}
          className="w-full p-2 sm:p-4 rounded-xl bg-[#E9E4DA] text-[#111827] border border-[#111827] focus:outline-none text-xs sm:text-sm"
        />
        {errors.synopsis && (
          <p className="text-red-500 text-xs mt-1">{errors.synopsis.message}</p>
        )}
      </div>

      {/* Bouton final */}
      <Button
        type="submit"
        color="secondary"
        text="Créer une table"
        className="py-2 rounded-full text-sm sm:text-base"
      />
    </form>
  );
}
