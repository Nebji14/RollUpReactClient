import React from "react";
import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import { NavLink } from "react-router-dom";

// Page ForgotPass
export default function ForgotPass() {
  return (
    <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden flex items-center justify-center flex-col p-4 space-y-10">
      <h2 className="text-[2rem] font-bold mb-6 text-center text-[#f3cc7a] font-rye ">
        Mot de passe oublié ?
      </h2>

      <form className="flex flex-col space-y-4">
        {/* Input en premier */}
        <Input
          label="Saisissez votre adresse mail"
          className="sm:w-[350px] w-full sm:h-[48px]"
          type="email"
          placeholder="Votre adresse email"
        />

        {/* Boutons en dessous, organisés verticalement */}
        <div className="flex flex-col space-y-1 items-center">
          <NavLink to="/">
            <Button color="primary" text="Envoyer" className="px-1 py-1 mt-2" />
          </NavLink>

          <NavLink to="/">
            <Button color="primary" text="Retour" className="px-1 py-1 mt-2" />
          </NavLink>
        </div>
      </form>
    </section>
  );
}
