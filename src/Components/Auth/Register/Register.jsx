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

  // Affiche les notifications en fonction du paramètre "message"
  useEffect(() => {
    if (message === "error") {
      toast.error("Délai dépassé. Veuillez vous réinscrire");
      navigate("/", { replace: true });
    } else if (message === "success") {
      toast.success("Inscription validée");
      navigate("/");
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

  // Valeurs par défaut du formulaire
  const defaultValues = {
    nom: "",
    pseudo: "",
    niveau: "Débutant",
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
  };

  // Configuration du formulaire avec react-hook-form + Yup
  const {
    register, // lie les inputs au formulaire
    handleSubmit, // gère la soumission
    setValue, // modifie manuellement une valeur (utile pour le select custom)
    reset, // réinitialise le formulaire
    watch, // observe les valeurs en temps réel
    formState: { errors }, // contient les erreurs de validation
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const selected = watch("niveau"); // observe le champ "niveau"

  // Fonction déclenchée lors de la soumission du formulaire
  async function submit(values) {
    try {
      const responseFromBackend = await signUp(values);

      if (responseFromBackend.message) {
        // Affiche le message avec toast
        toast.success(responseFromBackend.message, { duration: 7000 });

        // Si l'utilisateur n'existe pas déjà, réinitialise le formulaire et redirige
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
        />
        {errors.nom && <p>{errors.nom.message}</p>}

        {/* PSEUDO */}
        {/* Champ texte pour le pseudo */}
        <label>Pseudo</label>
        <input
          type="text"
          placeholder="Saisissez votre pseudo..."
          {...register("pseudo")}
        />
        {errors.pseudo && <p>{errors.pseudo.message}</p>}

        {/* NIVEAU */}
        {/* Menu déroulant custom pour sélectionner le niveau */}
        <label>Niveau en JDR</label>
        <div>
          <div onClick={() => setOpen(!open)}>
            <span>{selected}</span>
          </div>

          {/* Liste des options */}
          {open &&
            ["Débutant", "Intermédiaire", "Expert"].map((lvl) => (
              <span
                key={lvl}
                onClick={() => {
                  setValue("niveau", lvl);
                  setOpen(false);
                }}
              >
                {lvl}
              </span>
            ))}
        </div>
        {errors.niveau && <p>{errors.niveau.message}</p>}

        {/* EMAIL */}
        {/* Champ email avec validation */}
        <label>E-Mail</label>
        <input
          type="email"
          placeholder="Saisissez votre email..."
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}

        {/* PASSWORD */}
        {/* Champ mot de passe */}
        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Saisissez votre mot de passe..."
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        {/* CONFIRM PASSWORD */}
        {/* Confirmation du mot de passe */}
        <label>Confirmez votre mot de passe</label>
        <input
          type="password"
          placeholder="Confirmez votre mot de passe..."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        {/* CONSENT */}
        {/* Case à cocher pour valider le traitement des données */}
        <div>
          <input type="checkbox" id="consent" {...register("consent")} />
          <label htmlFor="consent">
            Accepter le traitement de mes informations.
          </label>
          {errors.consent && <p>{errors.consent.message}</p>}
        </div>

        {/* BUTTONS */}
        {/* Boutons "Créer mon compte" et "Retour" */}
        <div>
          <button type="submit">Créer mon compte</button>
          <button type="button" onClick={onBack}>
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
