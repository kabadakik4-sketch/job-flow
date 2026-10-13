import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addApplication } from "@/api/applicationsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ApplicationForm({ job }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      company: job?.company || "",
      position: job?.title || "",
      date: "",
      status: "Applied",
    },

    onSubmit: async ({ value }) => {
      addApplicationMutation.mutate(value);
    },
  });

  const addApplicationMutation = useMutation({
    mutationFn: addApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      navigate("/applications");
    },

    onError: (error) => {
      console.error("Failed to add application:", error);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <form.Field
              name="company"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "Company is required" : undefined,

                onSubmit: ({ value }) =>
                  !value.trim() ? "Company is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>

                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Company name"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="position"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "Position is required" : undefined,

                onSubmit: ({ value }) =>
                  !value.trim() ? "Position is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position</label>

                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Job position"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="date"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Date is required" : undefined,

                onSubmit: ({ value }) =>
                  !value ? "Date is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Application Date
                  </label>

                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>

                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>

                      <SelectItem value="Interview">Interview</SelectItem>

                      <SelectItem value="Offer">Offer</SelectItem>

                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          {addApplicationMutation.isError && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-700"
            >
              {addApplicationMutation.error?.message ||
                "Failed to add application. Please try again."}
            </p>
          )}
          <div className="mt-6 flex justify-end border-t pt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={addApplicationMutation.isPending}
            >
              {addApplicationMutation.isPending
                ? "Adding..."
                : "Add Application"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ApplicationForm;
