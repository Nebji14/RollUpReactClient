import { createContext, useContext, useEffect, useState } from "react";
import {
  getTablesFromApi,
  addTable as addTableApi,
  deleteTable as deleteTableApi,
} from "../api/table.api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [allMyTables, setallMyTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userConnected } = useAuth();

  useEffect(() => {
    setallMyTables(
      tables.filter((t) => t.user.pseudo === userConnected.pseudo)
    );
  }, [tables, userConnected]);

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

  // Ajouter une table et met à jour instantanément
  const addTable = async (values) => {
    try {
      const newTable = await addTableApi(values); // appel à l'API
      setTables((prevTables) => [newTable, ...prevTables]); // ajout instantané
    } catch (error) {
      console.error("Erreur lors de l'ajout de la table :", error);
    }
  };

  //Supprimer une Table

  const removeTable = async (id) => {
    try {
      await deleteTableApi(id); //Appel API
      setTables((prevTables) => prevTables.filter((t) => t._id !== id)); // mise à jour instantanée
      toast.success("La table a été supprimée");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <TableContext.Provider
      value={{ tables, addTable, removeTable, loading, allMyTables }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
