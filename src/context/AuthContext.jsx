import { useContext, useState } from "react";
import { createContext } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte, englobe l'application ou certaines parties
export function AuthProvider({ children }) {
  const [userConnected, setUserConnected] = useState(null); // État pour stocker l'utilisateur connecté

  console.log(userConnected);

  // Fonction de connexion qui enregistre les infos de l'utilisateur
  const login = async (values) => {
    setUserConnected(values);
  };

  // Fonction de déconnexion qui réinitialise l'état
  const logout = () => {
    setUserConnected(null); // correction : "nul" → "null"
  };

  return (
    <AuthContext.Provider
      value={{
        userConnected,
        login,
        logout,
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
