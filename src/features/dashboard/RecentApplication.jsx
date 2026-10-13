import {Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/features/applications/StatusBadge";

function RecentApplication({ company, position, date, status,}) {

    return (
        <Card>
            <CardContent className="flex items-center justify-between p-4">
                <div>
                    <h3 className="font-semibold text-slate-900">
                        {position}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {company}
                    </p>
                </div>

                <div className="text-right">
                    <StatusBadge status={status} />

                    <p className="text-xs text-slate-500">
                        {date}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default RecentApplication;