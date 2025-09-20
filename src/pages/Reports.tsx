import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, Download, BarChart3, TrendingUp, CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";

const reports = [
  {
    id: 1,
    title: "Daily Operations Summary",
    description: "Comprehensive overview of train operations, delays, and performance metrics",
    type: "Operations",
    frequency: "Daily",
    lastGenerated: "2 hours ago",
    size: "2.3 MB"
  },
  {
    id: 2,
    title: "Performance Analytics",
    description: "KPI analysis including punctuality, throughput, and efficiency metrics",
    type: "Analytics",
    frequency: "Weekly",
    lastGenerated: "1 day ago", 
    size: "5.7 MB"
  },
  {
    id: 3,
    title: "Conflict Resolution Report",
    description: "Analysis of conflicts, their resolution times, and improvement opportunities",
    type: "Conflicts",
    frequency: "Weekly",
    lastGenerated: "3 days ago",
    size: "1.8 MB"
  },
  {
    id: 4,
    title: "AI Recommendations Impact",
    description: "Effectiveness analysis of AI-powered recommendations and their outcomes",
    type: "AI Analytics",
    frequency: "Monthly",
    lastGenerated: "1 week ago",
    size: "4.2 MB"
  }
];

const metrics = [
  { label: "Reports Generated", value: "247", change: "+12%" },
  { label: "Data Points Analyzed", value: "1.2M", change: "+8%" },
  { label: "Export Downloads", value: "89", change: "+23%" },
  { label: "Automated Reports", value: "156", change: "+15%" }
];

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate insights and export operational data for analysis
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="control-card">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className="text-xs text-success">{metric.change} vs last month</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="control-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Generate Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations Summary</SelectItem>
                  <SelectItem value="performance">Performance Analytics</SelectItem>
                  <SelectItem value="conflicts">Conflict Analysis</SelectItem>
                  <SelectItem value="ai-impact">AI Impact Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Export format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Export</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="control-button primary w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card className="control-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Available Reports
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-4 bg-accent/20 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge variant="secondary">{report.frequency}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {report.size} • Generated {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <Card className="control-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-accent/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="text-muted-foreground">
                Interactive performance charts and analytics visualization
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}