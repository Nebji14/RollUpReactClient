import { BASE_URL } from "../utils/url";

// Récupérer toutes les tables
export async function getTablesFromApi() {
  try {
    const response = await fetch(`${BASE_URL}/tables`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des tables");
    }

    const tables = await response.json();
    return tables;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Ajouter une nouvelle table
export async function addTable(values) {
  try {
    const response = await fetch(`${BASE_URL}/tables`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la table");
    }

    const newTable = await response.json();
    return newTable;
  } catch (error) {
    console.error(error);
  }
}
