import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Train, 
  AlertTriangle, 
  Search, 
  FileText,
  Map,
  Activity
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Train Schedules", url: "/schedules", icon: Train },
  { title: "Conflicts & Alerts", url: "/conflicts", icon: AlertTriangle },
  { title: "Network Map", url: "/network", icon: Map },
  { title: "What-if Simulation", url: "/simulation", icon: Search },
  { title: "Performance", url: "/performance", icon: Activity },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const getNavClasses = (path: string) =>
    isActive(path) 
      ? "bg-primary text-primary-foreground glow-effect" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Control Center
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}