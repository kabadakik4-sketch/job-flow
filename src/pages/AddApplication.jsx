import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchJobById} from "../api/jobsApi";
import ApplicationForm from "@/features/applications/ApplicationForm.jsx";

function AddApplication() {
  const [searchParams] = useSearchParams();

  const jobId = searchParams.get("jobId");

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: ()=> fetchJobById(jobId),
    enabled: !!jobId,
  });

  if (jobId && isLoading){
    return <p>Loading job...</p>;
  }

  if (jobId && isError){
    return <p>Job not found</p>;
  }

  return (
    <div classNamer="max-auto w-full max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Add Application
        </h1>

        <p className="mt-2 text-slate-500">
          Track a new job application.
        </p>
      </div>
      <ApplicationForm job={job}/>
    </div>
  );
}

export default AddApplication;
