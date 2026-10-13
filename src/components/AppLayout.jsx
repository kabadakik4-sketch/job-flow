import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;