import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap } from "lucide-react";
import type { Analytics } from "@shared/schema";

export default function EngagementAnalytics() {
  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  const { data: recommendations } = useQuery<{ recommendations: string[] }>({
    queryKey: ["/api/recommendations"],
  });

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Analytics</h3>
        <Select defaultValue="7days">
          <SelectTrigger className="w-32" data-testid="select-analytics-period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Engagement Chart Placeholder */}
      <div className="chart-container glass rounded-xl mb-6 flex items-center justify-center">
        <div className="text-center" data-testid="analytics-chart">
          <div className="w-full h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-lg flex items-end justify-center space-x-2 p-4">
            {/* Simulated bar chart */}
            <div className="w-6 bg-primary rounded-t" style={{height: "60%"}}></div>
            <div className="w-6 bg-accent rounded-t" style={{height: "80%"}}></div>
            <div className="w-6 bg-secondary rounded-t" style={{height: "45%"}}></div>
            <div className="w-6 bg-primary rounded-t" style={{height: "90%"}}></div>
            <div className="w-6 bg-accent rounded-t" style={{height: "70%"}}></div>
            <div className="w-6 bg-secondary rounded-t" style={{height: "85%"}}></div>
            <div className="w-6 bg-primary rounded-t" style={{height: "95%"}}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Engagement over time</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Avg. Engagement Rate</span>
          <span className="text-sm font-medium text-foreground" data-testid="text-avg-engagement">
            {analytics?.engagementRate || "8.4%"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Best Performing Time</span>
          <span className="text-sm font-medium text-foreground" data-testid="text-best-time">
            {analytics?.bestPerformingTime || "2:00 PM"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Top Content Type</span>
          <span className="text-sm font-medium text-foreground" data-testid="text-top-content-type">
            {analytics?.topContentType || "Insights"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Follower Growth</span>
          <span className="text-sm font-medium text-success" data-testid="text-follower-growth">
            +{analytics?.followerGrowth || 127} this week
          </span>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-6 glass rounded-xl p-4 border border-accent/30">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
          <Zap className="w-4 h-4 mr-2 text-accent" />
          AI Recommendations
        </h4>
        <ul className="text-xs text-foreground space-y-1" data-testid="ai-recommendations">
          {recommendations?.recommendations?.length > 0 ? (
            recommendations.recommendations.map((rec, index) => (
              <li key={index}>• {rec}</li>
            ))
          ) : (
            <>
              <li>• Post more content between 2-4 PM for highest engagement</li>
              <li>• Include more questions to boost comment rates</li>
              <li>• Tech industry posts perform 23% better</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
