import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { signUp } from "../../../api/auth.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Register({ active, onBack }) {
  const [open, setOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu déroulant "niveau"
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const message = params.get("message");

  useEffect(() => {
    if (message === "error") {
      toast.error("Délai dépassé. Veuillez vous réinscrire");
      navigate("/", { replace: true });
    }
  }, [message, navigate]);

  // Définition du schéma de validation avec Yup
  const schema = yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire"),
    pseudo: yup
      .string()
      .min(5, "Le pseudo doit contenir au moins 5 caractères")
      .required("Le pseudo est obligatoire"),
    niveau: yup.string().oneOf(["Débutant", "Intermédiaire", "Expert"]),
    email: yup
      .string()
      .email("Email invalide")
      .required("L'email est obligatoire")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Format email non valide"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas"
      )
      .required("La confirmation est obligatoire"),
    consent: yup
      .boolean()
      .oneOf([true], "Vous devez accepter le traitement de vos informations"),
  });

  //  Valeurs par défaut du formulaire
  const defaultValues = {
    nom: "",
    pseudo: "",
    niveau: "Débutant",
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
  };

  //  Configuration du formulaire avec react-hook-form + Yup
  const {
    register, // permet de lier les inputs au formulaire
    handleSubmit, // fonction qui gère la soumission
    setValue, // permet de modifier manuellement une valeur (utile pour le select custom)
    reset, // réinitialise le formulaire
    watch, // observe en temps réel une valeur du formulaire
    formState: { errors }, // contient toutes les erreurs de validation
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  // On "observe" le champ niveau pour afficher la valeur sélectionnée
  const selected = watch("niveau");
  //  Fonction déclenchée lors de la soumission du formulaire
  async function submit(values) {
    try {
      const responseFromBackend = await signUp(values);

      if (responseFromBackend.message) {
        // Affiche le message avec toast pendant 7 secondes
        toast.success(responseFromBackend.message, { duration: 7000 });

        // Si l'utilisateur n'existe pas déjà, on réinitialise le formulaire et redirige
        if (responseFromBackend.message !== "Déjà inscrit") {
          reset(defaultValues);
          onBack();
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`absolute w-full top-0 h-full flex flex-col justify-start px-10 gap-[clamp(6px,1.5vh,16px)] overflow-y-auto scrollbar-hide transition-all duration-700 ease-in-out bg-jdr-texture bg-cover bg-center sm:rounded-[60%/10%] rounded-none pb-[80px] sm:pb-[100px] ${
        active
          ? "z-[3] opacity-100 translate-y-0" // Formulaire visible
          : "z-[1] opacity-0 translate-y-full" // Formulaire masqué
      }`}
    >
      <form
        onSubmit={handleSubmit(submit)} // Liaison avec la fonction submit
        className="flex flex-col sm:space-y-2 space-y-1"
      >
        {/* TITRE */}
        <h2 className="font-cinzel text-[2em] font-bold cursor-default flex justify-center text-[#31255b] mt-6 mb-4 sm:my-[clamp(5px,1vh,15px)]">
          Inscription
        </h2>

        {/* NOM */}
        {/* Champ texte pour le nom de l'utilisateur */}
        <label className="font-montserrat font-bold text-[#111827] block">
          Nom
        </label>
        <input
          type="text"
          placeholder="Saisissez votre nom..."
          {...register("nom")}
          className="w-full h-[clamp(36px,5vh,48px)] bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-[clamp(0.85rem,2vh,1rem)] text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.nom && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.nom.message}
          </p>
        )}

        {/* PSEUDO */}
        {/* Champ texte pour le pseudo */}
        <label className="font-montserrat font-bold text-[#111827] block">
          Pseudo
        </label>
        <input
          type="text"
          placeholder="Saisissez votre pseudo..."
          {...register("pseudo")}
          className="w-full h-[clamp(36px,5vh,48px)] bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-[clamp(0.85rem,2vh,1rem)] text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.pseudo && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.pseudo.message}
          </p>
        )}

        {/* NIVEAU */}
        {/* Menu déroulant custom pour sélectionner le niveau en JDR */}
        <label className="font-montserrat font-bold text-[#111827] block">
          Niveau en JDR
        </label>
        <div className="relative w-full font-montserrat">
          {/* Élément cliquable pour ouvrir/fermer le menu */}
          <div
            className={`flex items-center h-12 px-5 pr-10 rounded-full bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] cursor-pointer relative transition ${
              open ? "bg-[#f2eee8] text-[#31255b]" : "text-[#111827]"
            }`}
            onClick={() => setOpen(!open)}
          >
            <span className="flex-grow">{selected}</span>
            {/* Flèche d'ouverture */}
            <span
              className={`absolute right-5 w-2.5 h-2.5 border-l-2 border-b-2 ${
                open
                  ? "border-[#6c5ebf] -translate-y-1 rotate-[135deg]"
                  : "border-[#111827] -translate-y-1/2 rotate-[-45deg]"
              }`}
            ></span>
          </div>

          {/* Liste des options */}
          {open && (
            <div className="absolute top-[60px] left-0 right-0 bg-[#e9e4da] rounded-[15px] shadow-[0_10px_15px_rgba(0,0,0,0.3)] max-h-[200px] overflow-y-auto z-10">
              {["Débutant", "Intermédiaire", "Expert"].map((lvl) => (
                <span
                  key={lvl}
                  className={`block px-5 py-3 cursor-pointer rounded-[15px] ${
                    selected === lvl
                      ? "bg-[#6c5ebf] text-[#f2eee8]"
                      : "text-[#111827] hover:bg-[#6c5ebf] hover:text-[#f2eee8]"
                  }`}
                  onClick={() => {
                    setValue("niveau", lvl);
                    setOpen(false);
                  }}
                >
                  {lvl}
                </span>
              ))}
            </div>
          )}
        </div>
        {errors.niveau && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.niveau.message}
          </p>
        )}

        {/* EMAIL */}
        {/* Champ email avec validation */}
        <label className="font-montserrat font-bold text-[#111827] block">
          E-Mail
        </label>
        <input
          type="email"
          placeholder="Saisissez votre email..."
          {...register("email")}
          className="w-full h-[clamp(36px,5vh,48px)] bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-[clamp(0.85rem,2vh,1rem)] text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.email && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.email.message}
          </p>
        )}

        {/* PASSWORD */}
        {/* Champ mot de passe */}
        <label className="font-montserrat font-bold text-[#111827] block">
          Mot de passe
        </label>
        <input
          type="password"
          placeholder="Saisissez votre mot de passe..."
          {...register("password")}
          className="w-full h-[clamp(36px,5vh,48px)] bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-[clamp(0.85rem,2vh,1rem)] text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.password && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.password.message}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        {/* Confirmation du mot de passe */}
        <label className="font-montserrat font-bold text-[#111827] block">
          Confirmez votre mot de passe
        </label>
        <input
          type="password"
          placeholder="Confirmez votre mot de passe..."
          {...register("confirmPassword")}
          className="w-full h-[clamp(36px,5vh,48px)] bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-[clamp(0.85rem,2vh,1rem)] text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* CONSENT */}
        {/* Case à cocher pour valider le traitement des données personnelles */}
        <div className="mt-2 mb-3">
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="consent"
              {...register("consent")}
              className="w-5 h-5 rounded border-2 border-[#6c5ebf] bg-[#e9e4da] appearance-none cursor-pointer relative checked:before:content-['✔'] checked:before:absolute checked:before:inset-0 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-[#6c5ebf] checked:before:text-sm"
            />
            <label
              htmlFor="consent"
              className="text-xs text-[#111827] font-montserrat"
            >
              Accepter le traitement de mes informations.
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-600 font-semibold text-sm">
              {errors.consent.message}
            </p>
          )}

          <p className="text-[10px] text-[#4b4b4b] font-montserrat leading-4 mt-1">
            En renseignant vos informations personnelles, vous acceptez notre{" "}
            <a href="#" className="text-[#6c5ebf] underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>

        {/* BUTTONS */}
        {/* Boutons "Créer mon compte" et "Retour" */}
        <div className="flex justify-center gap-[clamp(8px,1.5vh,20px)] mt-2 mb-2 sm:mt-[clamp(10px,2vh,30px)]">
          <button
            type="submit"
            className="w-[120px] h-12 bg-[#3e3a4d] text-[#f2eee8] font-bold rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] hover:text-[#f3cc7a] transition"
          >
            Créer mon compte
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-[120px] h-12 bg-[#3e3a4d] text-[#f2eee8] font-bold rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] hover:text-[#f3cc7a] transition"
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
