import { Link } from "react-router-dom";
import { BriefcaseBusiness, MapPin, Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  category,
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-lg bg-slate-100 p-3">
            <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
            {type}
          </span>
        </div>

        <CardTitle className="text-xl">
          {title}
        </CardTitle>

        <p className="text-sm text-slate-500">
          {company}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-xs text-slate-500">
            {category}
          </span>

          <Button asChild size="sm">
            <Link to={`/jobs/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default JobCard;