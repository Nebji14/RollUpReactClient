import { BASE_URL } from "../utils/url";

// Fonction d'inscription qui envoie les données utilisateur au backend
export async function signUp(values) {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST", // Requête HTTP de type POST pour créer un nouvel utilisateur
      body: JSON.stringify(values), // Données envoyées en JSON
      headers: {
        "Content-type": "application/json", // Indique au serveur le format des données
      },
    });

    // Récupération et retour de la réponse du serveur
    const newUserMessage = await response.json();
    return newUserMessage;
  } catch (error) {
    // Gestion des erreurs
    console.log(error);
  }
}
