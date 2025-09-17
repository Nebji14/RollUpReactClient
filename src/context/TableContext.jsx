import { createContext, useContext, useEffect, useState } from "react";
import { getTablesFromApi, addTable as addTableApi } from "../api/table.api";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Ajouter une table et mettre à jour instantanément
  const addTable = async (values) => {
    try {
      const newTable = await addTableApi(values); // appel à l'API
      setTables((prevTables) => [newTable, ...prevTables]); // ajout instantané
    } catch (error) {
      console.error("Erreur lors de l'ajout de la table :", error);
    }
  };

  return (
    <TableContext.Provider value={{ tables, addTable, loading }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
