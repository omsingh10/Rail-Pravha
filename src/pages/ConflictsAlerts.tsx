import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, Zap, Train, MapPin, CheckCircle } from "lucide-react";

const activeConflicts = [
  {
    id: 1,
    severity: "critical",
    type: "Platform Conflict",
    title: "Platform 3 Double Booking",
    description: "Express Train 12034 and Local 40125 both scheduled for Platform 3 at 14:30",
    location: "Mumbai Central",
    time: "2 mins ago",
    trains: ["12034", "40125"],
    estimatedResolution: "5 mins"
  },
  {
    id: 2,
    severity: "high",
    type: "Signal Failure",
    title: "Signal Down at Junction B",
    description: "Automatic signaling system failure affecting 4 incoming trains",
    location: "Junction B",
    time: "8 mins ago",
    trains: ["12456", "9087", "40126", "12345"],
    estimatedResolution: "15 mins"
  }
];

const alerts = [
  {
    id: 3,
    severity: "medium",
    type: "Delay Propagation",
    title: "Cascade Delay Warning",
    description: "Train 12456 delay may affect 3 connecting services",
    location: "New Delhi",
    time: "15 mins ago",
    trains: ["12456"],
    impact: "Medium"
  },
  {
    id: 4,
    severity: "low",
    type: "Weather Alert",
    title: "Heavy Rain Warning",
    description: "Reduced visibility reported in Zone C, speed restrictions advised",
    location: "Zone C",
    time: "1 hour ago",
    trains: [],
    impact: "Low"
  }
];

const resolvedIssues = [
  {
    id: 5,
    type: "Track Maintenance",
    title: "Emergency Track Repair Completed",
    description: "Track 2 between Station A-B restored to normal operation",
    location: "Section A-B",
    resolvedTime: "30 mins ago",
    duration: "2 hours"
  }
];

export default function ConflictsAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Conflicts & Alerts</h1>
        <p className="text-muted-foreground">
          Monitor and resolve operational conflicts and system alerts
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Conflicts
            <Badge variant="destructive" className="ml-1">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            System Alerts
            <Badge variant="secondary" className="ml-1">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Resolved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeConflicts.map((conflict) => (
            <Card key={conflict.id} className="control-card border-destructive/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">{conflict.severity}</Badge>
                      <Badge variant="outline">{conflict.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{conflict.title}</CardTitle>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {conflict.time}
                    </div>
                    <div className="mt-1">ETA: {conflict.estimatedResolution}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{conflict.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{conflict.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Train className="h-3 w-3 text-muted-foreground" />
                    <span>Trains: {conflict.trains.join(', ')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="control-button primary">
                    Resolve Conflict
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                  <Button variant="outline">
                    Escalate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="control-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'secondary' : 'outline'
                      }>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">{alert.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </div>
                    <div className="mt-1">Impact: {alert.impact}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{alert.location}</span>
                  </div>
                  {alert.trains.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Train className="h-3 w-3 text-muted-foreground" />
                      <span>Trains: {alert.trains.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    Acknowledge
                  </Button>
                  <Button variant="outline">
                    View Impact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedIssues.map((issue) => (
            <Card key={issue.id} className="control-card border-success/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <Badge variant="outline" className="border-success text-success">
                        Resolved
                      </Badge>
                      <Badge variant="outline">{issue.type}</Badge>
                    </div>
                    <h3 className="font-medium">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Resolved {issue.resolvedTime}</span>
                      </div>
                      <span>Duration: {issue.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}