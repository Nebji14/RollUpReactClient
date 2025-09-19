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
  const [loading, setLoading] = useState(true);

  const { userConnected } = useAuth();

  console.log({ tables });

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
      console.log("Context: Ajout d'une table...", values);
      const newTable = await addTableApi(values);
      console.log("Context: Table reçue de l'API:", newTable);
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
    <TableContext.Provider value={{ tables, addTable, removeTable, loading }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
