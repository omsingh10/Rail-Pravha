import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Settings, TrendingUp, Clock } from "lucide-react";

export default function Simulation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">What-if Simulation</h1>
        <p className="text-muted-foreground">
          Test scenarios and optimize train operations before implementation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Configuration */}
        <Card className="control-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Scenario Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input id="scenario-name" placeholder="Peak Hour Optimization" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-window">Time Window</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">Next 1 Hour</SelectItem>
                  <SelectItem value="2hours">Next 2 Hours</SelectItem>
                  <SelectItem value="4hours">Next 4 Hours</SelectItem>
                  <SelectItem value="8hours">Next 8 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="train-delay">Introduce Delay</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Train" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12034">12034 - Rajdhani</SelectItem>
                    <SelectItem value="12456">12456 - Shatabdi</SelectItem>
                    <SelectItem value="40125">40125 - Local</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="15 min" className="w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="optimization">Optimization Goal</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimize-delay">Minimize Total Delay</SelectItem>
                  <SelectItem value="maximize-throughput">Maximize Throughput</SelectItem>
                  <SelectItem value="balance">Balanced Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="control-button primary flex-1">
                <Play className="h-4 w-4 mr-2" />
                Run Simulation
              </Button>
              <Button variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Visualization */}
        <Card className="control-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Simulation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">12.3</div>
                    <div className="text-sm text-muted-foreground">Avg Delay (mins)</div>
                    <div className="text-xs text-success">-23% improvement</div>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">19.2</div>
                    <div className="text-sm text-muted-foreground">Throughput/hour</div>
                    <div className="text-xs text-success">+15% improvement</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Recommendations</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="font-medium text-sm">Reroute Train 40125</div>
                      <div className="text-xs text-muted-foreground">Use Platform 6 instead of 3 to avoid conflict</div>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="font-medium text-sm">Delay Freight 9087</div>
                      <div className="text-xs text-muted-foreground">5-minute delay improves express train flow</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <div className="relative h-64 bg-accent/10 rounded-lg p-4">
                  <div className="text-center text-muted-foreground text-sm">
                    Interactive timeline visualization
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline">
                      Speed: 2x
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">On-time Performance</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Platform Utilization</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Energy Efficiency</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Impact Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Express</Badge>
                        <span className="text-sm">-5.2 min avg delay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Passenger</Badge>
                        <span className="text-sm">-2.1 min avg delay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Freight</Badge>
                        <span className="text-sm">+3.5 min avg delay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Saved Scenarios */}
      <Card className="control-card">
        <CardHeader>
          <CardTitle>Saved Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Peak Hour Rush", date: "Today 14:30", status: "Completed" },
              { name: "Signal Failure Recovery", date: "Yesterday 09:15", status: "Completed" },
              { name: "Weather Delay Scenario", date: "2 days ago", status: "Completed" },
            ].map((scenario) => (
              <div key={scenario.name} className="p-4 bg-accent/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{scenario.name}</h4>
                  <Badge variant="outline">{scenario.status}</Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {scenario.date}
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Load Scenario
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}