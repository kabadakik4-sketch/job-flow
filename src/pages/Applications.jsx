import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "../api/applicationsApi";
import ApplicationCard from "../features/applications/ApplicationCard";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ApplicationCardSkeleton from "@/features/applications/ApplicationCardSkeleton";

function Applications() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const {
    data: applications,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  if (isLoading) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <ApplicationCardSkeleton key={index} />
      ))}
    </div>
  );
}

  if (isError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          Unable to load applications
        </h2>

        <p className="text-sm text-slate-500">
          {error?.message || "Something went wrong. Please try again."}
        </p>

        <Button onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    )
  }

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      filterStatus === "all" ||
      application.status === filterStatus;

      const matchesSearch =
    application.company
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    application.position
      .toLowerCase()
      .includes(search.toLowerCase());

  return matchesStatus && matchesSearch;
  }); 

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>

        <p className="mt-2 text-slate-500">
          Track and manage your job applications.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input className="w-full sm:max=w-md"
        placeholder="Search applications..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />     

        <Select
          value={filterStatus}
          onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="filter by status"/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Applications
              </SelectItem>

              <SelectItem value="Applied">
                Applied
              </SelectItem>

              <SelectItem value="Interview">
                Interview
              </SelectItem>

              <SelectItem value="Offer">
                Offer
              </SelectItem>

              <SelectItem value="Rejected">
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
      </div>
        
      {filteredApplications.length === 0 ? (
        <p className="text-slate-500">No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              id={application.id}
              company={application.company}
              position={application.position}
              date={application.date}
              status={application.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
