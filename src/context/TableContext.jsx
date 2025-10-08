import React, { createContext, useState, useContext, useEffect } from "react";
import { getTablesFromApi, searchTables } from "../api/table.api";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger toutes les tables au démarrage
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getTablesFromApi();
      setTables(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Lancer une recherche filtrée
  const rechercherTables = async (filters) => {
    setLoading(true);
    const data = await searchTables(filters);
    setTables(data);
    setLoading(false);
  };

  // Gérer le bouton "Rejoindre"
  const rejoindreTable = (id) => {
    setTables((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isJoined: true } : t))
    );
  };

  // Gérer le bouton "Quitter"
  const quitterTable = (id) => {
    setTables((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isJoined: false } : t))
    );
  };

  return (
    <TableContext.Provider
      value={{
        tables,
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

// Hook personnalisé pour consommer le contexte
export const useTable = () => {
  return useContext(TableContext);
};
