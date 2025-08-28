import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col items-center">
        <Outlet />
      </div>
    </>
  );
}

export default App;
