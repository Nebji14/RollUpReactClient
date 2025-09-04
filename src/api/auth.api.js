import { BASE_URL } from "../utils/url";

// Fonction d'inscription qui envoie les données utilisateur au backend
export async function signUp(values) {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST", // Requête pour créer un nouvel utilisateur
      body: JSON.stringify(values), // Données utilisateur converties en JSON
      headers: {
        "Content-type": "application/json", // Indique le format des données
      },
    });

    // Récupération de la réponse du serveur
    const newUserMessage = await response.json();
    return newUserMessage;
  } catch (error) {
    // Gestion des erreurs de requête
    console.log(error);
  }
}

// Fonction de connexion qui envoie les identifiants au backend
export async function signIn(values) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST", // Requête pour authentifier l'utilisateur
      body: JSON.stringify(values), // Identifiants convertis en JSON
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include", // Permet l'envoi et la réception des cookies
    });

    // Récupération des données de l'utilisateur connecté
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour récupérer l'utilisateur courant à partir du token stocké en cookie
export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/user/current`, {
      method: "GET", // Requête pour obtenir les informations de l'utilisateur
      credentials: "include", // Envoie le cookie contenant le token
    });

    // Retourne l'utilisateur si la réponse est OK, sinon null
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  await fetch(`${BASE_URL}/user/deleteToken`, {
    method: "DELETE",
    credentials: "include",
  });
}
