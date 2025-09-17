import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { TableProvider } from "./context/TableContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TableProvider>
          <div className="h-screen flex flex-col items-center">
            <Outlet />
          </div>
        </TableProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
