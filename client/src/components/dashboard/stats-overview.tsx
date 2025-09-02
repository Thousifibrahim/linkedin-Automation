import { useQuery } from "@tanstack/react-query";
import { Edit, TrendingUp, Clock, Lightbulb } from "lucide-react";
import type { Analytics, Post, TrendingTopic } from "@shared/schema";

export default function StatsOverview() {
  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  const { data: scheduledPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts/scheduled"],
  });

  const { data: trendingTopics } = useQuery<TrendingTopic[]>({
    queryKey: ["/api/trending-topics"],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Posts Generated</p>
            <p className="text-3xl font-bold text-foreground" data-testid="text-posts-generated">147</p>
            <p className="text-xs text-success mt-1">↗ 23% this week</p>
          </div>
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-primary/20">
            <Edit className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
            <p className="text-3xl font-bold text-foreground" data-testid="text-engagement-rate">
              {analytics?.engagementRate || "8.4%"}
            </p>
            <p className="text-xs text-success mt-1">↗ 1.2% increase</p>
          </div>
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-accent/20">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Scheduled Posts</p>
            <p className="text-3xl font-bold text-foreground" data-testid="text-scheduled-posts">
              {scheduledPosts?.length || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Next: Today 2:00 PM</p>
          </div>
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-secondary/20">
            <Clock className="w-6 h-6 text-secondary" />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">AI Research</p>
            <p className="text-3xl font-bold text-foreground" data-testid="text-ai-research-topics">
              {trendingTopics?.length || 0}
            </p>
            <p className="text-xs text-success mt-1">Active topics found</p>
          </div>
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-success/20">
            <Lightbulb className="w-6 h-6 text-success" />
          </div>
        </div>
      </div>
    </div>
  );
}
