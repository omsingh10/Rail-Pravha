import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Train, TrendingUp, Users } from "lucide-react";

const kpiData = [
  {
    title: "Avg. Delay",
    value: "4.2",
    unit: "mins",
    icon: Clock,
    trend: -12,
    status: "success"
  },
  {
    title: "Trains in Section",
    value: "23",
    unit: "active",
    icon: Train,
    trend: +3,
    status: "info"
  },
  {
    title: "Throughput",
    value: "18.5",
    unit: "trains/hr",
    icon: TrendingUp,
    trend: +8,
    status: "success"
  },
  {
    title: "Track Utilization",
    value: "78",
    unit: "%",
    icon: Users,
    trend: +5,
    status: "warning"
  }
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="control-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-foreground">
                {kpi.value}
              </div>
              <span className="text-sm text-muted-foreground">{kpi.unit}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-xs ${
                kpi.trend > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
              </span>
              <span className="text-xs text-muted-foreground">vs last hour</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}