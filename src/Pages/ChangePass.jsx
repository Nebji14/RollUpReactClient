import React from "react";
import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schéma Yup
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(6, "Au moins 6 caractères"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmation requise"),
});

export default function ChangePass() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      const resData = await res.json();

      if (res.ok) {
        toast.success(resData.message || "Mot de passe réinitialisé !");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(resData.message || "Erreur lors de la réinitialisation");
      }
    } catch (error) {
      toast.error("Erreur serveur, réessayez plus tard.");
    }
  };

  return (
    <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden flex items-center justify-center flex-col p-4 space-y-10">
      <h1 className="text-[2rem] font-bold mb-6 text-center text-[#f3cc7a] font-rye ">
        Modifiez le Mot de passe
      </h1>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Champ mot de passe */}
        <div>
          <Input
            label="Nouveau mot de passe"
            className="sm:w-[350px] w-full sm:h-[48px]"
            type="password"
            placeholder="Saisissez votre mot de passe..."
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Champ confirmation */}
        <div>
          <Input
            label="Confirmez le mot de passe"
            className="sm:w-[350px] w-full sm:h-[48px]"
            type="password"
            placeholder="Confirmez votre mot de passe..."
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <p className="text-xs text-[#F2EEE8] text-left max-w-[320px] mx-auto leading-tight mb-4">
          En appuyant sur confirmer vous réinitialiserez votre mot de passe.
        </p>

        <div className="flex flex-col gap-3 items-center">
          <Button
            color="primary"
            text="Confirmer"
            className="!px-6 !py-2 w-full max-w-[200px]"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
}
