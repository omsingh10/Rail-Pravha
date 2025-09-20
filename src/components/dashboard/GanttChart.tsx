import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const trainSchedules = [
  {
    id: "12034",
    name: "Rajdhani Express",
    type: "Express",
    scheduled: "12:30",
    actual: "12:35",
    status: "delayed",
    delay: 5
  },
  {
    id: "40125",
    name: "Local Passenger",
    type: "Passenger",
    scheduled: "12:45",
    actual: "12:44",
    status: "early",
    delay: -1
  },
  {
    id: "9087",
    name: "Freight Service",
    type: "Freight",
    scheduled: "13:00",
    actual: "13:00",
    status: "ontime",
    delay: 0
  },
  {
    id: "12456",
    name: "Shatabdi Express",
    type: "Express",
    scheduled: "13:15",
    actual: "13:30",
    status: "delayed",
    delay: 15
  }
];

export function GanttChart() {
  return (
    <Card className="control-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Train Schedule Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Time Header */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
            <span>Train</span>
            <div className="flex gap-8">
              <span>12:30</span>
              <span>12:45</span>
              <span>13:00</span>
              <span>13:15</span>
              <span>13:30</span>
            </div>
          </div>
          
          {/* Train Rows */}
          {trainSchedules.map((train) => (
            <div key={train.id} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0">
                <div className="text-sm font-medium">{train.name}</div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      train.type === 'Express' ? 'default' :
                      train.type === 'Passenger' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {train.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">#{train.id}</span>
                </div>
              </div>
              
              <div className="flex-1 relative h-8 bg-accent/20 rounded">
                {/* Scheduled Time Bar */}
                <div 
                  className="absolute top-1 h-2 bg-muted rounded-sm"
                  style={{
                    left: `${((parseInt(train.scheduled.split(':')[0]) - 12) * 60 + parseInt(train.scheduled.split(':')[1])) / 60 * 20}%`,
                    width: '15px'
                  }}
                />
                
                {/* Actual Time Bar */}
                <div 
                  className={`absolute top-4 h-2 rounded-sm ${
                    train.status === 'delayed' ? 'bg-destructive' :
                    train.status === 'early' ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{
                    left: `${((parseInt(train.actual.split(':')[0]) - 12) * 60 + parseInt(train.actual.split(':')[1])) / 60 * 20}%`,
                    width: '15px'
                  }}
                />
              </div>
              
              <div className="w-20 text-right">
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span className={
                    train.status === 'delayed' ? 'text-destructive' :
                    train.status === 'early' ? 'text-success' : 'text-muted-foreground'
                  }>
                    {train.delay > 0 ? '+' : ''}{train.delay}m
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-muted rounded"></div>
            <span>Scheduled</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-primary rounded"></div>
            <span>On Time</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-destructive rounded"></div>
            <span>Delayed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}