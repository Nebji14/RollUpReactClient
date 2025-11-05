// src/context/TableContext.jsx (ou .js)
import { createContext, useContext, useEffect, useState } from "react";
import {
  getTablesFromApi,
  addTable as addTableApi,
  deleteTable as deleteTableApi,
  updateTable as updateTableApi,
  searchTables, // <-- AJOUTÉ
} from "../api/table.api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userConnected } = useAuth();

  // Charger les tables au montage
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getTablesFromApi();
        setTables(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tables :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  // Ajouter une table
  const addTable = async (values) => {
    try {
      const newTable = await addTableApi(values);
      // on injecte les infos utilisateur côté client pour l'affichage immédiat
      setTables((prevTables) => [
        {
          ...newTable,
          user: {
            ...(newTable.user || {}),
            pseudo: userConnected.pseudo,
            email: userConnected.email,
          },
        },
        ...prevTables,
      ]);
    } catch (error) {
      console.error("Context: Erreur lors de l'ajout:", error);
      throw error;
    }
  };

  // Supprimer une table
  const removeTable = async (id) => {
    try {
      await deleteTableApi(id);
      setTables((prevTables) => prevTables.filter((t) => t._id !== id));
      toast.success("La table a été supprimée");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const updateTable = async (id, values) => {
    try {
      // Appel API pour mettre à jour la table
      const updated = await updateTableApi(id, values);

      //récupérer la liste complète depuis l'API pour être sûr que le state soit à jour
      const refreshed = await getTablesFromApi();
      setTables(refreshed);

      return updated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  // Lancer une recherche filtrée
  const rechercherTables = async (filters) => {
    setLoading(true); // Utilise la même logique de chargement
    try {
      const data = await searchTables(filters);
      setTables(data);
    } catch (error) {
      console.error("Erreur lors de la recherche des tables :", error);
      toast.error("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  // Gérer le bouton "Rejoindre" (logique client)
  const rejoindreTable = (id) => {
    setTables((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isJoined: true } : t))
    );
  };

  // Gérer le bouton "Quitter" (logique client)
  const quitterTable = (id) => {
    setTables((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isJoined: false } : t))
    );
  };

  return (
    <TableContext.Provider
      value={{
        tables,
        addTable,
        removeTable,
        updateTable,
        loading,
        rechercherTables,
        rejoindreTable,
        quitterTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
