import React from "react";
import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import { NavLink } from "react-router-dom";

// Page ForgotPass
export default function ChangePass() {
  return (
    <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden flex items-center justify-center flex-col p-4 space-y-10">
      <h1 className="text-[2rem] font-bold mb-6 text-center text-[#f3cc7a] font-rye ">
        Modifiez le Mot de passe
      </h1>

      <form className="flex flex-col space-y-2">
        {" "}
        {/* Espacement réduit */}
        <Input
          label="Nouveau mot de passe"
          className="sm:w-[350px] w-full sm:h-[48px]"
          type="email"
          placeholder="Saisissez votre mot de passe..."
        />
        <Input
          label="Confirmez le mot de passse"
          className="sm:w-[350px] w-full sm:h-[48px]"
          type="email"
          placeholder="Saisissez votre mot de passe..."
        />
        <div className="flex flex-col gap-6">
          {/* Texte informatif avec marge réduite */}
          <p className="text-xs text-[#F2EEE8] text-left max-w-[320px] mx-auto leading-tight mb-5 ">
            En appuyant sur confirmer vous réinitialiserez votre mot de passe.
          </p>
        </div>
        {/* Boutons avec marge personnalisée */}
        <div className="flex flex-col gap-3 items-center">
          <NavLink to="/">
            <Button
              color="primary"
              text="Confirmer"
              className="!px-6 !py-2 w-full max-w-[200px]"
            />
          </NavLink>

          <NavLink to="/">
            <Button
              color="primary"
              text="Retour"
              className="!px-6 !py-2 w-full max-w-[200px]"
            />
          </NavLink>
        </div>
      </form>
    </section>
  );
}
