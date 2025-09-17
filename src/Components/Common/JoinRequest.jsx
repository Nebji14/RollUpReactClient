import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

export default function JoinRequest() {
  const [pseudo, setPseudo] = useState("");

  // Simulation d'une requête backend
  useEffect(() => {
    // Exemple : fetch("/api/user")
    setPseudo("BRUNHILDE La Gueuse");
  }, []);

  const handleAccept = () => {
    console.log("Validé !");
  };

  const handleReject = () => {
    console.log("Refusé !");
  };

  return (
    <div className="shadow-[0_5px_5px_rgba(0,0,0,0.65)] bg-[#E9E4DA] text-[#111827] rounded-xl p-4 sm:p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-center break-words">
        {pseudo}
      </h2>
      <p className="text-center mt-1 text-sm sm:text-base">
        Demande a rejoindre la table :
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
        <Button
          color="secondary"
          text="Accepter"
          icon={<FontAwesomeIcon icon={faCheck} />}
          className="w-full sm:w-auto"
          onClick={handleAccept}
        />

        <Button
          color="secondary"
          text="Refuser"
          icon={<FontAwesomeIcon icon={faTimes} />}
          className="w-full sm:w-auto"
          onClick={handleReject}
        />
      </div>
    </div>
  );
}
