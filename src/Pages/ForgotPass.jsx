import React, { useState } from "react";
import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import toast from "react-hot-toast";

export default function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.message) {
        toast.success(data.message, { duration: 7000 }); //message backend affiché 7 sec
        setEmail(""); // on vide le champ email
      }
    } catch (error) {
      toast.error("Erreur lors de l’envoi du mail.", { duration: 7000 });
    }
  };

  return (
    <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden flex items-center justify-center flex-col p-4 space-y-10">
      <h1 className="text-[2rem] font-bold mb-6 text-center text-[#f3cc7a] font-rye">
        Mot de passe oublié ?
      </h1>

      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Saisissez votre adresse mail"
          className="sm:w-[350px] w-full sm:h-[48px]"
          type="email"
          placeholder="Saisissez votre adresse mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="text-xs text-[#F2EEE8] text-left max-w-[320px] mx-auto leading-tight mb-4">
          En appuyant sur envoyer vous recevrez par mail un lien pour
          réinitialiser votre mot de passe.
        </p>

        <div className="flex flex-col gap-3 items-center">
          <Button
            color="primary"
            text="Envoyer"
            className="!px-6 !py-2 w-full max-w-[150px]"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
}
