import { Bell, User, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 control-card rounded-none">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center glow-effect">
            <Train className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Rail-Pravah</h1>
          <Badge variant="secondary" className="ml-2">
            Control Center
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-xs text-destructive-foreground">3</span>
          </div>
        </Button>
        
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span>Controller - Zone A</span>
        </div>
      </div>
    </header>
  );
}