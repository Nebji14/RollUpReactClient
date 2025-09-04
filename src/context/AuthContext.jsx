import { useContext, useState } from "react";
import { createContext } from "react";
import { useLoaderData } from "react-router-dom";

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte qui englobe l'application ou certaines parties
export function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  const [userConnected, setUserConnected] = useState(initialUser); // Stocke l'utilisateur connecté

  console.log(userConnected);

  // Met à jour l'état avec l'utilisateur connecté
  const login = async (values) => {
    setUserConnected(values);
  };

  // Réinitialise l'état pour déconnecter l'utilisateur
  const logout = () => {
    setUserConnected(nul);
  };

  return (
    <AuthContext.Provider
      value={{
        userConnected, // Données de l'utilisateur connecté
        login, // Méthode pour connecter l'utilisateur
        logout, // Méthode pour déconnecter l'utilisateur
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour accéder facilement au contexte
export function useAuth() {
  return useContext(AuthContext);
}
