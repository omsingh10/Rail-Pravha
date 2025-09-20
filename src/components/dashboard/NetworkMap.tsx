import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, Train, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define line colors similar to Mumbai railway map
const RAIL_LINES = {
  western: "#0D397F", // Western - Dark Blue
  central: "#C30F15", // Central - Red
  harbour: "#008E56", // Harbour - Green
  thaneVashi: "#732E88", // Thane-Vashi - Purple
  metroRail: "#0A84FF", // Metro Rail - Light Blue
  monoRail: "#FF9F0A", // Mono Rail - Orange
  neruUran: "#F7AD19", // Neru-Uran - Yellow
  indianRail: "#63D2FF", // Indian Rail - Light Blue
};

type StationType = "major" | "minor" | "junction" | "terminal";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  type: StationType;
  status: "normal" | "congested" | "delayed" | "incident";
  lines: (keyof typeof RAIL_LINES)[];
  connections?: string[];
  distanceKm?: number;
}

interface TrainLine {
  id: keyof typeof RAIL_LINES;
  name: string;
  color: string;
  path: string;
  stations: string[];
}

// Train representation for animation
interface TrainPosition {
  id: string;
  lineId: keyof typeof RAIL_LINES;
  position: number; // 0-1 position along the path
  direction: 1 | -1; // 1 = forward, -1 = backward
  speed: number; // Movement speed
  status: "onTime" | "delayed" | "stopped";
}

export function NetworkMap() {
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  
  console.log("NetworkMap component rendering");
  
  // Mumbai Railway Network Data (simplified version)
  const stations: Station[] = [
    // Western Line (North to South)
    { id: "dahanu", name: "Dahanu Rd", x: 90, y: 80, type: "terminal", status: "normal", lines: ["western"], distanceKm: 124 },
    { id: "virar", name: "Virar", x: 90, y: 110, type: "major", status: "normal", lines: ["western"], distanceKm: 60 },
    { id: "borivali", name: "Borivali", x: 90, y: 150, type: "major", status: "congested", lines: ["western"], distanceKm: 34 },
    { id: "andheri", name: "Andheri", x: 90, y: 190, type: "major", status: "congested", lines: ["western", "metroRail"], connections: ["metro1"] },
    { id: "bandra", name: "Bandra", x: 100, y: 240, type: "junction", status: "normal", lines: ["western", "harbour"] },
    { id: "dadar_w", name: "Dadar W", x: 130, y: 280, type: "junction", status: "congested", lines: ["western", "central"] },
    { id: "churchgate", name: "Churchgate", x: 140, y: 350, type: "terminal", status: "normal", lines: ["western"], distanceKm: 0 },
    
    // Central Line (North to South)
    { id: "kasara", name: "Kasara", x: 330, y: 60, type: "terminal", status: "normal", lines: ["central"], distanceKm: 120 },
    { id: "kalyan", name: "Kalyan", x: 290, y: 160, type: "junction", status: "normal", lines: ["central"], distanceKm: 53 },
    { id: "thane", name: "Thane", x: 250, y: 210, type: "junction", status: "delayed", lines: ["central", "thaneVashi"], distanceKm: 33 },
    { id: "kurla", name: "Kurla", x: 180, y: 260, type: "junction", status: "normal", lines: ["central", "harbour"] },
    { id: "dadar_c", name: "Dadar C", x: 140, y: 280, type: "junction", status: "congested", lines: ["central", "western"] },
    { id: "cst", name: "CSMT", x: 150, y: 350, type: "terminal", status: "normal", lines: ["central", "harbour"], distanceKm: 0 },
    
    // Harbour Line
    { id: "panvel", name: "Panvel", x: 310, y: 330, type: "junction", status: "normal", lines: ["harbour"], distanceKm: 60 },
    { id: "vashi", name: "Vashi", x: 260, y: 280, type: "major", status: "normal", lines: ["harbour", "thaneVashi"] },
    { id: "wadala", name: "Wadala", x: 170, y: 310, type: "junction", status: "incident", lines: ["harbour", "monoRail"] },
    
    // Additional lines
    { id: "nerul", name: "Nerul", x: 280, y: 300, type: "junction", status: "normal", lines: ["harbour", "neruUran"] },
    { id: "uran", name: "Uran", x: 330, y: 380, type: "terminal", status: "normal", lines: ["neruUran"] },
    { id: "khopoli", name: "Khopoli", x: 340, y: 240, type: "terminal", status: "normal", lines: ["central"], distanceKm: 114 },
    { id: "karjat", name: "Karjat", x: 330, y: 210, type: "junction", status: "normal", lines: ["central"], distanceKm: 100 },
  ];
  
  // Define the rail lines - SVG paths
  const railLines: TrainLine[] = [
    {
      id: "western",
      name: "Western",
      color: RAIL_LINES.western,
      path: "M90,80 L90,350",
      stations: ["dahanu", "virar", "borivali", "andheri", "bandra", "dadar_w", "churchgate"]
    },
    {
      id: "central",
      name: "Central",
      color: RAIL_LINES.central,
      path: "M330,60 L290,160 L250,210 L180,260 L140,280 L150,350",
      stations: ["kasara", "kalyan", "thane", "kurla", "dadar_c", "cst"]
    },
    {
      id: "harbour",
      name: "Harbour",
      color: RAIL_LINES.harbour,
      path: "M310,330 L280,300 L260,280 L170,310 L150,350",
      stations: ["panvel", "nerul", "vashi", "wadala", "cst"]
    },
    {
      id: "thaneVashi",
      name: "Thane-Vashi",
      color: RAIL_LINES.thaneVashi,
      path: "M250,210 L260,280",
      stations: ["thane", "vashi"]
    },
    {
      id: "neruUran",
      name: "Neru-Uran",
      color: RAIL_LINES.neruUran,
      path: "M280,300 L330,380",
      stations: ["nerul", "uran"]
    },
    {
      id: "monoRail",
      name: "Mono Rail",
      color: RAIL_LINES.monoRail,
      path: "M170,310 C180,260 200,230 220,220",
      stations: ["wadala"]
    }
  ];
  
  // Active trains on the network
  const activeTrains: TrainPosition[] = [
    { id: "train1", lineId: "western", position: 0.3, direction: 1, speed: 0.02, status: "onTime" },
    { id: "train2", lineId: "western", position: 0.6, direction: -1, speed: 0.015, status: "delayed" },
    { id: "train3", lineId: "central", position: 0.4, direction: -1, speed: 0.025, status: "onTime" },
    { id: "train4", lineId: "central", position: 0.7, direction: 1, speed: 0.02, status: "onTime" },
    { id: "train5", lineId: "harbour", position: 0.2, direction: -1, speed: 0.015, status: "onTime" },
    { id: "train6", lineId: "thaneVashi", position: 0.5, direction: 1, speed: 0.03, status: "delayed" },
  ];
  
  // Helper function to get station by ID
  const getStation = (id: string): Station | undefined => {
    return stations.find(station => station.id === id);
  };
  
  // Helper functions for station status colors
  const getStationStatusColor = (status: Station['status']): string => {
    switch (status) {
      case 'normal': return 'fill-[#22C55E]'; // Green
      case 'congested': return 'fill-[#F59E0B]'; // Amber
      case 'delayed': return 'fill-[#EAB308]'; // Yellow
      case 'incident': return 'fill-[#EF4444]'; // Red
      default: return 'fill-[#94A3B8]'; // Gray
    }
  };
  
  // Handle line selection
  const handleLineClick = (lineId: string) => {
    setSelectedLine(selectedLine === lineId ? null : lineId);
  };
  
  // Render station based on its type and status
  const renderStation = (station: Station) => {
    const isHighlighted = 
      hoveredStation?.id === station.id || 
      (selectedLine && station.lines.includes(selectedLine as keyof typeof RAIL_LINES));
    
    const baseRadius = station.type === "major" || station.type === "terminal" ? 8 : 6;
    const radius = isHighlighted ? baseRadius + 2 : baseRadius;
    
    // For junction stations, render a square
    if (station.type === "junction") {
      return (
        <rect
          key={station.id}
          x={station.x - radius}
          y={station.y - radius}
          width={radius * 2}
          height={radius * 2}
          className={cn(getStationStatusColor(station.status), isHighlighted ? 'stroke-2 stroke-background' : '')}
          onMouseEnter={() => setHoveredStation(station)}
          onMouseLeave={() => setHoveredStation(null)}
        />
      );
    }
    
    // For terminal stations, render a special shape
    if (station.type === "terminal") {
      return (
        <polygon
          key={station.id}
          points={`${station.x},${station.y-radius} ${station.x+radius},${station.y+radius} ${station.x-radius},${station.y+radius}`}
          className={cn(getStationStatusColor(station.status), isHighlighted ? 'stroke-2 stroke-background' : '')}
          onMouseEnter={() => setHoveredStation(station)}
          onMouseLeave={() => setHoveredStation(null)}
        />
      );
    }
    
    // For other stations, render a circle
    return (
      <circle
        key={station.id}
        cx={station.x}
        cy={station.y}
        r={radius}
        className={cn(getStationStatusColor(station.status), isHighlighted ? 'stroke-2 stroke-background' : '')}
        onMouseEnter={() => setHoveredStation(station)}
        onMouseLeave={() => setHoveredStation(null)}
      />
    );
  };

  // Count incidents on the network
  const incidentCount = stations.filter(s => s.status === "incident").length;
  const delayedCount = stations.filter(s => s.status === "delayed").length;
  
  // Debug logs
  console.log("NetworkMap rendering with:", { 
    stations: stations.length, 
    railLines: railLines.length,
    selectedLine,
    hoveredStation
  });
  
  return (
    <Card className="col-span-2 row-span-2 h-[500px] border-2 border-blue-500">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-500" />
            Mumbai Suburban Rail Network (Debug Mode)
          </CardTitle>
          <div className="flex gap-2">
            {incidentCount > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> {incidentCount} Incident{incidentCount > 1 ? "s" : ""}
              </Badge>
            )}
            {delayedCount > 0 && (
              <Badge variant="outline" className="flex items-center gap-1 bg-yellow-100 text-yellow-800 border-yellow-300">
                <Info className="h-3 w-3" /> {delayedCount} Delay{delayedCount > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-[400px] bg-yellow-100 dark:bg-slate-800 overflow-visible border-4 border-red-500">
          {/* Map SVG */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 400 400" 
            preserveAspectRatio="xMidYMid meet"
            style={{ 
              zIndex: 10, 
              background: "lightcyan",
              border: "3px solid green"
            }}>
            {/* Railway Lines */}
            {railLines.map((line) => (
              <path
                key={line.id}
                d={line.path}
                stroke={selectedLine ? (selectedLine === line.id ? line.color : '#333') : line.color}
                strokeWidth={selectedLine === line.id ? 8 : 6}
                fill="none"
                strokeLinecap="round"
                className="transition-colors duration-300"
                onClick={() => handleLineClick(line.id)}
                style={{ cursor: 'pointer' }}
              />
            ))}
            
            {/* Stations */}
            {stations.map((station) => renderStation(station))}
            
            {/* Station Labels - Only show for major stations or hovered */}
            {stations.map((station) => {
              const showLabel = station.type === "terminal" || 
                                station.type === "major" || 
                                hoveredStation?.id === station.id ||
                                (selectedLine && station.lines.includes(selectedLine as keyof typeof RAIL_LINES));
              
              if (!showLabel) return null;
              
              return (
                <text 
                  key={`label-${station.id}`}
                  x={station.x} 
                  y={station.y + 15} 
                  textAnchor="middle" 
                  className="text-[8px] fill-foreground font-medium"
                  style={{ pointerEvents: 'none' }}
                >
                  {station.name}
                  {station.distanceKm !== undefined && (
                    <tspan x={station.x} y={station.y + 24} className="text-[7px] fill-muted-foreground">
                      {station.distanceKm} km
                    </tspan>
                  )}
                </text>
              );
            })}
            
            {/* Moving Trains */}
            {activeTrains.map((train) => {
              // Find the corresponding line for this train
              const line = railLines.find(l => l.id === train.lineId);
              if (!line) return null;
              
              // For a real implementation, you'd calculate the exact position along the path
              // For this simplified example, we'll just place it along the path proportionally
              // This is a simplification - a real implementation would use more complex path calculations
              const trainSize = 4;
              
              // Simple linear interpolation for demo - in a real app, use path.getPointAtLength()
              const parts = line.path.split(' ');
              const points = [];
              
              for (let i = 1; i < parts.length; i++) {
                if (parts[i].match(/[ML]/)) {
                  const prev = parts[i-1].split(',');
                  const curr = parts[i+1].split(',');
                  if (prev.length === 2 && curr.length === 2) {
                    points.push({
                      x1: parseFloat(prev[0]), 
                      y1: parseFloat(prev[1]),
                      x2: parseFloat(curr[0]),
                      y2: parseFloat(curr[1])
                    });
                  }
                }
              }
              
              // Simplified position calculation - just take the first segment
              if (points.length === 0) return null;
              
              const point = points[0];
              const x = point.x1 + (point.x2 - point.x1) * train.position;
              const y = point.y1 + (point.y2 - point.y1) * train.position;
              
              // Color based on train status
              const colorClass = 
                train.status === 'delayed' ? 'fill-yellow-500' : 
                train.status === 'stopped' ? 'fill-red-500' : 'fill-primary';
              
              return (
                <g key={train.id}>
                  <rect
                    x={x - trainSize}
                    y={y - trainSize/2}
                    width={trainSize * 2}
                    height={trainSize}
                    className={cn("rounded-sm", colorClass)}
                  />
                </g>
              );
            })}

            {/* Animated Train Examples */}
            <g>
              <rect x="120" y="95" width="20" height="10" fill="#3B82F6" rx="2" className="glow-effect">
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="translate" 
                  values="0,0; 50,0; 0,0" 
                  dur="5s" 
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            
            <g>
              <rect x="180" y="115" width="20" height="10" fill="#F97316" rx="2">
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="translate" 
                  values="0,0; -30,0; 0,0" 
                  dur="4s" 
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>
          
          {/* Legend */}
          <div className="absolute top-2 left-2 p-2 bg-background/80 backdrop-blur-sm rounded-md border shadow-sm">
            <div className="text-xs font-medium mb-1">Rail Lines</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {Object.entries(RAIL_LINES).map(([key, color]) => (
                <div 
                  key={key} 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleLineClick(key)}
                >
                  <div 
                    className="w-3 h-2 rounded-sm" 
                    style={{ backgroundColor: color, opacity: selectedLine ? (selectedLine === key ? 1 : 0.3) : 1 }}
                  />
                  <span className={selectedLine === key ? 'font-bold' : ''}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Station Status Legend */}
          <div className="absolute bottom-2 left-2 p-2 bg-background/80 backdrop-blur-sm rounded-md border shadow-sm">
            <div className="text-xs font-medium mb-1">Station Status</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                <span>Congested</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#EAB308]"></div>
                <span>Delayed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                <span>Incident</span>
              </div>
            </div>
          </div>
          
          {/* Active Trains Count */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary flex items-center">
              <Train className="h-3 w-3 mr-1" />
              {activeTrains.length} Active Trains
            </Badge>
          </div>
          
          {/* Map caption */}
          <div className="absolute bottom-2 right-2 text-[8px] text-muted-foreground">
            Map not to scale | Distances shown in km from terminal
          </div>
        </div>
      </CardContent>
    </Card>
  );
}