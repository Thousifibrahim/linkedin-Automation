import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import type { TrendingTopic } from "@shared/schema";

export default function TrendingTopics() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: topics, isLoading } = useQuery<TrendingTopic[]>({
    queryKey: ["/api/trending-topics"],
  });

  const refreshTopicsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/research-trends", {});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trending-topics"] });
      toast({
        title: "Topics Refreshed",
        description: "Latest trending topics have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh topics. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-success text-success-foreground";
      case "rising":
        return "bg-accent text-accent-foreground";
      case "emerging":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "hot":
        return "Hot";
      case "rising":
        return "Rising";
      case "emerging":
        return "Emerging";
      default:
        return "Active";
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">AI-Discovered Trending Topics</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => refreshTopicsMutation.mutate()}
          disabled={refreshTopicsMutation.isPending}
          data-testid="button-refresh-topics"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshTopicsMutation.isPending ? 'animate-spin' : ''}`} />
          {refreshTopicsMutation.isPending ? "Refreshing..." : "Refresh Topics"}
        </Button>
      </div>

      <div className="space-y-4">
        {topics?.slice(0, 3).map((topic: TrendingTopic) => (
          <div 
            key={topic.id} 
            className="glass p-4 rounded-xl hover:backdrop-blur-lg transition-all duration-300"
            data-testid={`topic-${topic.id}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getStatusColor(topic.status)}>
                    {getStatusLabel(topic.status)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{topic.category}</span>
                </div>
                <h4 className="font-medium text-foreground mb-1" data-testid={`topic-title-${topic.id}`}>
                  {topic.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`topic-description-${topic.id}`}>
                  {topic.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span data-testid={`topic-score-${topic.id}`}>📈 Trending Score: {topic.trendingScore}</span>
                  <span data-testid={`topic-engagement-${topic.id}`}>💬 Engagement Est: {topic.engagementEstimate}</span>
                  <span data-testid={`topic-peak-time-${topic.id}`}>⏱️ Peak Time: {topic.peakTime}</span>
                </div>
              </div>
              <Button 
                size="sm"
                className="ml-4 bg-primary text-primary-foreground"
                data-testid={`button-use-topic-${topic.id}`}
              >
                Use Topic
              </Button>
            </div>
          </div>
        ))}

        {(!topics || topics.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No trending topics available. Click "Refresh Topics" to discover new trends.</p>
          </div>
        )}
      </div>
    </div>
  );
}
