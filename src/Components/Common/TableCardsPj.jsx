import { useState } from "react";
import Button from "./Button";
import { useTable } from "../../context/TableContext";

export default function TableCard({
  table,
  buttonText,
  onButtonClick,
  isCoinDesMj,
}) {
  const [isJoined, setIsJoined] = useState(false);

  const handleToggle = () => {
    if (onButtonClick) {
      onButtonClick(table);
    } else {
      setIsJoined(!isJoined);
    }
  };
  const { removeTable } = useTable();

  return (
    <div className="flex flex-col md:flex-row overflow-hidden shadow-xl bg-[#F2EEE8] text-[#111827] rounded-[20px] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* IMAGE */}
      <div className="w-full md:w-1/2">
        <div className="h-full w-full rounded-t-[20px] md:rounded-t-none md:rounded-l-[20px] border-2 border-[#3E3A4D] overflow-hidden flex items-center justify-center">
          <img
            src={table.image || "/placeholder.jpg"}
            alt={table.titre}
            className="min-h-full min-w-full object-cover"
          />
        </div>
      </div>

      {/* CONTENU */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{table.titre}</h2>
          <ul className="text-sm mb-4 space-y-1">
            <li>
              <a
                href={table.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lien Discord
              </a>
            </li>
            <li>
              <a
                href={table.roll20}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lien Roll20
              </a>
            </li>
            <li>Joueurs : {table.nbJoueurs}/10</li>
            <li>{table.niveau}</li>
            <li>{table.systeme}</li>
            <li>{table.frequence} fois / semaine</li>
          </ul>

          {/* LABEL SYNOPSIS */}
          <p className="text-sm font-semibold mb-1">Synopsis</p>
          <div className="rounded-[10px] p-2 text-sm bg-[#E9E4DA] whitespace-pre-wrap break-words h-40 overflow-y-auto">
            {table.synopsis}
          </div>
        </div>

        {/* BOUTONS */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button
            color="secondary"
            text={
              buttonText ||
              (isJoined ? "Quitter la table" : "Rejoindre la table")
            }
            className="w-full sm:w-auto"
            onClick={handleToggle}
          />

          {/* BOUTON SUPPRIMER UNIQUEMENT SUR CoinDesMj */}
          {isCoinDesMj && (
            <Button
              color="secondary"
              text="Supprimer cette table"
              className="w-full sm:w-auto"
              onClick={() => removeTable(table._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
