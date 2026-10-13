import StatCard from "../features/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "../api/applicationsApi";
import RecentApplication from "../features/dashboard/RecentApplication";
import DashboardSkeleton from "@/features/dashboard/DashboardSkeleton";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 text-center">
      <h2 className="text-xl font-semibold text-slate-900">
        Unable to load dashboard
      </h2>

      <p role="alert" className="text-sm text-slate-500">
        {error?.message || "Something went wrong. Please try again."}
      </p>

      <Button onClick={() => refetch()}>
        Try Again
      </Button>
    </div>
  );
}

  const appliedCount = applications.filter(
    (application) => application.status === "Applied",
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  const recentApplications = applications.slice().reverse().slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">Track your job search progress.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Applied" value={appliedCount} />
        <StatCard title="Interviews" value={interviewCount} />
        <StatCard title="Offers" value={offerCount} />
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Recent Applications
        </h2>

        {recentApplications.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500">No recent applications.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentApplications.map((application) => (
              <RecentApplication
                key={application.id}
                company={application.company}
                position={application.position}
                date={application.date}
                status={application.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
