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
    <div className="shadow-[0_5px_5px_rgba(0,0,0,0.65)]  bg-[#E9E4DA] text-[#111827] rounded-xl p-4  w-fit">
      <h2 className="text-lg font-bold text-center">{pseudo}</h2>
      <p className="text-center mt-1">Demande a rejoindre la table :</p>

      <div className="flex justify-center gap-4 mt-3">
        <Button
          color="secondary"
          text="Accepter"
          icon={<FontAwesomeIcon icon={faCheck} />}
          className="w-[250px] sm:w-auto"
          onClick={handleAccept}
        />

        <Button
          color="secondary"
          text="Refuser"
          icon={<FontAwesomeIcon icon={faTimes} />}
          className="w-[250px] sm:w-auto"
          onClick={handleReject}
        />
      </div>
    </div>
  );
}
