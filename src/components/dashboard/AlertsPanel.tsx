import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Train, Zap } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "delay",
    severity: "high",
    title: "Train 12456 delayed at Junction A",
    description: "Signal failure causing 15-minute delay",
    time: "2 mins ago",
    icon: Clock
  },
  {
    id: 2,
    type: "conflict",
    severity: "critical",
    title: "Platform conflict at Station B",
    description: "Express and freight trains scheduled simultaneously",
    time: "5 mins ago",
    icon: AlertTriangle
  },
  {
    id: 3,
    type: "maintenance",
    severity: "medium",
    title: "Track maintenance block active",
    description: "Section C-D under maintenance until 14:00",
    time: "1 hour ago",
    icon: Zap
  }
];

export function AlertsPanel() {
  return (
    <Card className="control-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
            <div className={`p-2 rounded-full ${
              alert.severity === 'critical' ? 'bg-destructive/20' :
              alert.severity === 'high' ? 'bg-warning/20' : 'bg-muted'
            }`}>
              <alert.icon className={`h-4 w-4 ${
                alert.severity === 'critical' ? 'text-destructive' :
                alert.severity === 'high' ? 'text-warning' : 'text-muted-foreground'
              }`} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <Badge variant={
                  alert.severity === 'critical' ? 'destructive' :
                  alert.severity === 'high' ? 'secondary' : 'outline'
                }>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              Resolve
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}