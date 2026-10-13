import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function ApplicationCardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-24" />
      </CardContent>
    </Card>
  );
}

export default ApplicationCardSkeleton;