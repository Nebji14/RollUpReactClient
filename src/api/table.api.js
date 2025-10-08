import { BASE_URL } from "../utils/url";

// Récupérer toutes les tables
export async function getTablesFromApi() {
  try {
    const response = await fetch(`${BASE_URL}/tables`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include", // important pour envoyer le cookie JWT
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

// Ajouter une table
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
    throw error;
  }
}

// Supprimer une table
export async function deleteTable(id) {
  try {
    const response = await fetch(`${BASE_URL}/tables/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la table");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Mettre à jour une table
export async function updateTable(id, values) {
  try {
    const response = await fetch(`${BASE_URL}/tables/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(
        err?.message || "Erreur lors de la mise à jour de la table"
      );
    }

    const updatedTable = await response.json();
    return updatedTable;
  } catch (error) {
    console.error("API updateTable:", error);
    throw error;
  }
}

// Rechercher des tables avec filtres
export async function searchTables(filters) {
  try {
    const queryParams = new URLSearchParams();

    // On ajoute uniquement les filtres renseignés
    if (filters.genre && filters.genre !== "Sélectionner") {
      queryParams.append("genre", filters.genre);
    }
    if (filters.niveau && filters.niveau !== "Sélectionner") {
      queryParams.append("niveau", filters.niveau);
    }
    if (filters.systeme && filters.systeme !== "Sélectionner") {
      queryParams.append("systeme", filters.systeme);
    }
    if (filters.frequence) {
      queryParams.append("frequence", filters.frequence);
    }

    const response = await fetch(`${BASE_URL}/tables/search?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la recherche des tables");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erreur API searchTables:", error);
    return [];
  }
}
