import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="h-screen flex flex-col items-center">
          <Outlet />
        </div>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
