import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ThumbsUp, ThumbsDown, Clock } from "lucide-react";

const recommendations = [
  {
    id: 1,
    priority: "high",
    title: "Prioritize Express Train 12034",
    description: "Give precedence over Freight 9087 at Junction B to reduce overall delay by 8 minutes",
    confidence: 94,
    impact: "High",
    timeframe: "Next 10 minutes"
  },
  {
    id: 2,
    priority: "medium",
    title: "Reroute Local Train 40125",
    description: "Use alternate platform at Station C to avoid conflict with incoming express",
    confidence: 87,
    impact: "Medium",
    timeframe: "Next 15 minutes"
  },
  {
    id: 3,
    priority: "low",
    title: "Optimize freight scheduling",
    description: "Delay Freight 9023 by 5 minutes to improve overall section throughput",
    confidence: 76,
    impact: "Low",
    timeframe: "Next 30 minutes"
  }
];

export function AIRecommendations() {
  return (
    <Card className="control-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary glow-effect" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold">{rec.title}</h4>
                  <Badge variant={
                    rec.priority === 'high' ? 'destructive' :
                    rec.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div>Confidence: {rec.confidence}%</div>
                <div>Impact: {rec.impact}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {rec.timeframe}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-7 px-2">
                  <ThumbsDown className="h-3 w-3" />
                </Button>
                <Button size="sm" className="control-button primary h-7 px-3">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}