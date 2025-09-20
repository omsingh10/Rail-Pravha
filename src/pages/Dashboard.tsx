import { KPICards } from "@/components/dashboard/KPICards";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { NetworkMap } from "@/components/dashboard/NetworkMap";
import { NetworkMapSimple } from "@/components/dashboard/NetworkMapSimple";
import { GanttChart } from "@/components/dashboard/GanttChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Control Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time railway traffic control and optimization
        </p>
      </div>
      
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-4 border-primary p-2">
          {/* Use the simplified version for debugging */}
          <NetworkMapSimple />
          {/* Original component commented out for debugging */}
          {/* <NetworkMap /> */}
        </div>
        <AlertsPanel />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GanttChart />
        <AIRecommendations />
      </div>
    </div>
  );
}