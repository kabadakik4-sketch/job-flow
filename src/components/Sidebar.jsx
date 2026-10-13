import { NavLink } from "react-router-dom";

function Sidebar() {

  const linkStyle = ({ isActive }) => 
    `rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="w-full border-b bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <h2 className="mb-4 text-2xl font-bold md:mb-8">JobFlow</h2>

      <nav className="flex flex-row flex-wrap gap-2 md:flex-col">
        <NavLink to="/" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/jobs" className={linkStyle}>
          Jobs
        </NavLink>
        <NavLink to="/applications" className={linkStyle}>
          Applications
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
