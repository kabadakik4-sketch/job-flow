import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  updateApplicationStatus,
  deleteApplication,
} from "@/api/applicationsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "./StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ApplicationCard({ id, company, position, date, status }) {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },

    onError: (error) => {
      console.error("Status update failed:", error);
    },
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: deleteApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },

    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{position}</CardTitle>

        <p className="text-sm text-slate-500">{company}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-slate-600">Applied: {date}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Status</p>
            <StatusBadge status={status} />
          </div>

          <Select
            value={status}
            onValueChange={(newStatus) => {
              updateStatusMutation.mutate({
                id,
                status: newStatus,
              });
            }}
            disabled={updateStatusMutation.isPending}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>

              <SelectItem value="Interview">Interview</SelectItem>

              <SelectItem value="Offer">Offer</SelectItem>

              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {updateStatusMutation.isError && (
          <p role="alert" className="text-sm text-red-600">
            Failed to update status. Please try again.
          </p>
        )}

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="destructive"
                disabled={deleteApplicationMutation.isPending}
              />
            }
          >
            Delete
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Application?</AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to delete this application? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                disabled={deleteApplicationMutation.isPending}
                onClick={() => deleteApplicationMutation.mutate(id)}
              >
                {deleteApplicationMutation.isPending
                  ? "Deleting..."
                  : "Confirm Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {deleteApplicationMutation.isError && (
          <p role="alert" className="text-sm text-red-600">
            Failed to delete application. Please try again.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default ApplicationCard;
