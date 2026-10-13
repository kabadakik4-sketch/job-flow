import JobCard from "../features/jobs/JobCard";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api/jobsApi";
import { useState } from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import JobCardSkeleton from "@/features/jobs/JobCardSkeleton";

function Jobs() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}

  if (isError) {
    return <p>Somthing went wrong.</p>;
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = filterType === "all" || job.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>

        <p className="mt-2 text-slate-500">
          Find and track your next opportunity.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          className="w-full sm:max-w-md"
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Job type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">all Jobs</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredJobs.length === 0 ? (
          <p className="text-slate-500">No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              id={job.id}
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              salary={job.salary}
              category={job.category}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;
