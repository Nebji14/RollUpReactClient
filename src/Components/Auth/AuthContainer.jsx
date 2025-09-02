import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function AuthContainer() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <section
      id="secForm"
      className="h-screen w-full bg-donjon bg-no-repeat bg-cover bg-center bg-fixed flex justify-center items-center box-border"
    >
      {/* Conteneur principal des formulaires (login et register) */}
      <div className="relative w-full h-full md:w-[450px] md:h-[95vh] max-h-[870px] bg-transparent overflow-hidden rounded-none md:rounded-[20px] shadow-[5px_20px_50px_#000]">
        {/* Composant Login (affiché si showRegister est false) */}
        <Login
          hidden={showRegister}
          onShowRegister={() => setShowRegister(true)}
        />

        {/* Composant Register (affiché si showRegister est true) */}
        <Register active={showRegister} onBack={() => setShowRegister(false)} />
      </div>
    </section>
  );
}
