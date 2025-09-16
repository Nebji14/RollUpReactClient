import { BASE_URL } from "../utils/url";

// Fonction d'inscription qui envoie les données utilisateur au backend
export async function addTable(values) {
  try {
    const response = await fetch(`${BASE_URL}/tables`, {
      method: "POST", // Requête pour créer un nouvel utilisateur
      body: JSON.stringify(values), // Données utilisateur converties en JSON
      headers: {
        "Content-type": "application/json", // Indique le format des données
      },
      credentials: "include",
    });

    // Récupération de la réponse du serveur
    const newTable = await response.json();
    return newTable;
  } catch (error) {
    // Gestion des erreurs de requête
    console.log(error);
  }
}
