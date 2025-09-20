import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { useState } from "react";

export function NetworkMapSimple() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  
  console.log("Rendering NetworkMapSimple component");
  
  return (
    <Card className="col-span-2 row-span-2 h-[500px] border-4 border-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-blue-500" />
          Mumbai Rail Network (Simple Debug Version)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] bg-blue-100 border-2 border-red-500 flex items-center justify-center">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 400 400" 
            style={{ border: "3px solid purple" }}
          >
            {/* Western Line (Blue) */}
            <path 
              d="M90,80 L90,350" 
              stroke="#0D397F" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
              onClick={() => setSelectedLine(selectedLine === "western" ? null : "western")}
              style={{ 
                cursor: 'pointer',
                strokeWidth: selectedLine === "western" ? 12 : 8
              }}
            />
            
            {/* Central Line (Red) */}
            <path 
              d="M330,60 L290,160 L250,210 L180,260 L140,280 L150,350" 
              stroke="#C30F15" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
              onClick={() => setSelectedLine(selectedLine === "central" ? null : "central")}
              style={{ 
                cursor: 'pointer',
                strokeWidth: selectedLine === "central" ? 12 : 8  
              }}
            />
            
            {/* Harbour Line (Green) */}
            <path 
              d="M310,330 L280,300 L260,280 L170,310 L150,350" 
              stroke="#008E56" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
              onClick={() => setSelectedLine(selectedLine === "harbour" ? null : "harbour")}
              style={{ 
                cursor: 'pointer',
                strokeWidth: selectedLine === "harbour" ? 12 : 8
              }}
            />
            
            {/* Major stations as circles */}
            <circle cx="90" cy="80" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="90" cy="150" r="8" fill="#F59E0B" stroke="#000" strokeWidth="2" />
            <circle cx="90" cy="190" r="8" fill="#F59E0B" stroke="#000" strokeWidth="2" />
            <circle cx="90" cy="350" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="330" cy="60" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="150" cy="350" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="310" cy="330" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            
            {/* Junction stations as squares */}
            <rect x="92" y="242" width="16" height="16" fill="#EAB308" stroke="#000" strokeWidth="2" transform="translate(-100, -242) translate(100, 242) translate(8, 8) rotate(45) translate(-8, -8)" />
            <rect x="132" y="282" width="16" height="16" fill="#F59E0B" stroke="#000" strokeWidth="2" transform="translate(-140, -282) translate(140, 282) translate(8, 8) rotate(45) translate(-8, -8)" />
            <rect x="172" y="312" width="16" height="16" fill="#EF4444" stroke="#000" strokeWidth="2" transform="translate(-180, -312) translate(180, 312) translate(8, 8) rotate(45) translate(-8, -8)" />
            
            {/* Train animation example */}
            <rect 
              x="90" 
              y="120" 
              width="16" 
              height="8" 
              fill="blue" 
              rx="2"
            >
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="translate" 
                values="0,0; 0,50; 0,0" 
                dur="5s" 
                repeatCount="indefinite"
              />
            </rect>
          </svg>
          
          <div className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-md border shadow-sm">
            <div className="text-sm font-medium mb-1">Rail Lines</div>
            <div className="grid grid-cols-1 gap-y-1">
              <div 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSelectedLine(selectedLine === "western" ? null : "western")}
              >
                <div className="w-4 h-3 rounded-sm bg-[#0D397F]" />
                <span className={selectedLine === "western" ? 'font-bold' : ''}>Western</span>
              </div>
              <div 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSelectedLine(selectedLine === "central" ? null : "central")}
              >
                <div className="w-4 h-3 rounded-sm bg-[#C30F15]" />
                <span className={selectedLine === "central" ? 'font-bold' : ''}>Central</span>
              </div>
              <div 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSelectedLine(selectedLine === "harbour" ? null : "harbour")}
              >
                <div className="w-4 h-3 rounded-sm bg-[#008E56]" />
                <span className={selectedLine === "harbour" ? 'font-bold' : ''}>Harbour</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}