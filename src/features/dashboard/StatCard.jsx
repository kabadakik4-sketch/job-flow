import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatCard({ title, value}) {
    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}

export default StatCard;