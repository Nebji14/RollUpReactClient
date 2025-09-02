import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// Icône réutilisable affichée à droite de chaque item d'accordéon
// Elle pivote (rotation de 180°) si l'item est ouvert
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

// Composant représentant un item unique d'accordéon
// - id : identifiant unique de l'item
// - open : indique quel item est actuellement ouvert
// - handleOpen : fonction pour ouvrir/fermer l'item
// - title : titre affiché dans l'entête
// - content : contenu affiché dans le body quand ouvert
function AccordionItem({ id, open, handleOpen, title, content }) {
  return (
    <Accordion
      open={open === id}
      icon={<Icon id={id} open={open} />}
      className="bg-[#E9E4DA]"
    >
      {/* Entête de l'accordéon, cliquable pour ouvrir/fermer */}
      <AccordionHeader
        onClick={() => handleOpen(id)}
        className="px-4 text-[#111827] bg-[#E9E4DA]"
      >
        <p>{title}</p>
      </AccordionHeader>

      {/* Corps du contenu, visible uniquement si l'item est ouvert */}
      <AccordionBody className="px-4 pb-4 text-[#111827] bg-[#E9E4DA]">
        <p>{content}</p>
      </AccordionBody>
    </Accordion>
  );
}

// Composant conteneur principal de l'accordéon
// - items : tableau d'objets { title, content } pour générer chaque item
export function DefaultAccordion({ items }) {
  const [open, setOpen] = React.useState(0); // état de l'item actuellement ouvert (0 = aucun)

  // Fonction pour ouvrir ou fermer un item
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="border-2 border-[#3E3A4D] rounded-[20px] overflow-hidden bg-[#E9E4DA]">
      {/* Mapping des items reçus en props */}
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={index + 1} // identifiant basé sur l'index (commence à 1)
          open={open}
          handleOpen={handleOpen}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
}
