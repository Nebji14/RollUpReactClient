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
  const [showConfirm, setShowConfirm] = useState(false); // contrôle la modal

  const handleToggle = () => {
    if (onButtonClick) onButtonClick(table);
    else setIsJoined(!isJoined);
  };

  const { removeTable } = useTable();

  const handleDelete = () => {
    removeTable(table._id);
    setShowConfirm(false);
  };

  return (
    <>
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
              <li>
                Joueurs : {table.nbJoueurs}/{table.nbJoueurs}
              </li>
              <li>{table.niveau}</li>
              <li>{table.systeme}</li>
              <li>{table.frequence} fois / semaine</li>
            </ul>

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

            {isCoinDesMj && (
              <Button
                color="secondary"
                text="Supprimer cette table"
                className="w-full sm:w-auto"
                onClick={() => setShowConfirm(true)} // ouvre la modal
              />
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMATION */}
      {showConfirm && (
        <div className="fixed rounded-[20px] inset-0 flex items-center justify-center z-[10000]">
          {/* Arrière-plan flouté */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          ></div>

          {/* Contenu modal */}
          <div className="relative bg-[#E9E4DA] text-[#111827] rounded-lg shadow-xl p-6 w-full max-w-md z-50">
            <p className="mb-4 text-center font-semibold text-lg">
              Êtes-vous sûr de vouloir supprimer la table "
              <span className="font-bold">{table.titre}</span>" ?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="secondary"
                text="Oui"
                className="w-full sm:w-auto"
                onClick={handleDelete}
              />
              <Button
                color="secondary"
                text="Non"
                className="w-full sm:w-auto"
                onClick={() => setShowConfirm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
