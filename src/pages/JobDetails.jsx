import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../api/jobsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function JobDetails() {
  const { id } = useParams();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
  });

  if (isLoading) {
    return <p> Loading job ...</p>;
  }

  if (isError) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
        <p className="mt-2 text-slate-500">{job.company}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <span className="font-medium">Location:</span> {job.location}
          </p>

          <p>
            <span className="font-medium">Type:</span> {job.type}
          </p>

          <p>
            <span className="font-medium">Category:</span> {job.category}
          </p>

          <p>
            <span className="font-medium">Salary:</span> {job.salary}
          </p>

          <div>
            <h2 className="mb-2 font-medium">Description</h2>

            <p className="text-slate-600">{job.description}</p>
          </div>

          <Link to={`/applications/new?jobId=${job.id}`}>
            <Button className="mt-4">Apply for this job</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobDetails;
