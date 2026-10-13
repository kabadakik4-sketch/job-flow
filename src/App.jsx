import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./components/AppLayout.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Applications = lazy(() => import("./pages/Applications"));
const AddApplication = lazy(() => import("./pages/AddApplication"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">Loading...</div>
      }
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
