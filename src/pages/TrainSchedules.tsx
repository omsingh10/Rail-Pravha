import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Train, Search, Filter, Clock, MapPin } from "lucide-react";

const schedules = [
  {
    trainNumber: "12034",
    name: "Rajdhani Express",
    type: "Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:55",
    arrival: "08:35",
    platform: "16",
    status: "On Time",
    delay: 0
  },
  {
    trainNumber: "12456",
    name: "Shatabdi Express",
    type: "Express", 
    from: "New Delhi",
    to: "Agra Cant",
    departure: "06:00",
    arrival: "09:50",
    platform: "2",
    status: "Delayed",
    delay: 15
  },
  {
    trainNumber: "40125",
    name: "Local Passenger",
    type: "Passenger",
    from: "Mumbai CST",
    to: "Thane",
    departure: "07:15",
    arrival: "08:05",
    platform: "8",
    status: "Early",
    delay: -3
  },
  {
    trainNumber: "9087",
    name: "Freight Service",
    type: "Freight",
    from: "Kanpur",
    to: "Allahabad", 
    departure: "14:30",
    arrival: "18:45",
    platform: "Yard",
    status: "On Time",
    delay: 0
  }
];

export default function TrainSchedules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Train Schedules</h1>
        <p className="text-muted-foreground">
          Manage and monitor train schedules across the network
        </p>
      </div>

      <Card className="control-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="h-5 w-5 text-primary" />
            Schedule Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search trains, routes, or stations..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="freight">Freight</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead>Train Details</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.trainNumber} className="hover:bg-accent/20">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{schedule.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            schedule.type === 'Express' ? 'default' :
                            schedule.type === 'Passenger' ? 'secondary' : 'outline'
                          }>
                            {schedule.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{schedule.trainNumber}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{schedule.from}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{schedule.to}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Dep: {schedule.departure}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Arr: {schedule.arrival}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{schedule.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={
                          schedule.status === 'On Time' ? 'secondary' :
                          schedule.status === 'Delayed' ? 'destructive' : 'default'
                        }>
                          {schedule.status}
                        </Badge>
                        {schedule.delay !== 0 && (
                          <div className={`text-xs ${
                            schedule.delay > 0 ? 'text-destructive' : 'text-success'
                          }`}>
                            {schedule.delay > 0 ? '+' : ''}{schedule.delay}m
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}