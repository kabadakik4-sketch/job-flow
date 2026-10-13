import {Badge} from "@/components/ui/badge";

const statusStyles = {
    Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function StatusBadge({ status }) {
    return (
        <Badge
            variant="secondary"
            className={statusStyles[status] || "bg-slate-100 text-slate-700"}
            >
            {status}
            </Badge>
    );
}

export default StatusBadge;