import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { Post } from "@shared/schema";

export default function RecentPosts() {
  const { data: recentPosts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/recent"],
  });

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="glass-card rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Demo posts if no real posts exist
  const demoPost1 = {
    id: "demo-1",
    content: `🚀 Just implemented AI-driven customer service automation that reduced response time by 75%. The key wasn't replacing human touch—it was amplifying it.

Our AI handles routine inquiries instantly, freeing our team to focus on complex problem-solving and building genuine relationships.

What's your experience with AI in customer service? 

#CustomerService #AI #Automation #Innovation`,
    engagement: { likes: 47, comments: 12, shares: 8 },
    publishedAt: "2 hours ago",
    aiGenerated: true,
  };

  const demoPost2 = {
    id: "demo-2", 
    content: `🎯 Remote work isn't just about location flexibility—it's about outcome flexibility.

After managing distributed teams for 3 years, I've learned that the best remote cultures focus on results, not hours logged. Our team's productivity increased 30% when we shifted from time-tracking to goal-tracking.

Key insight: Trust scales better than surveillance.

How do you measure success in your remote team?

#RemoteWork #Leadership #Productivity #TeamManagement`,
    engagement: { likes: 89, comments: 23, shares: 15 },
    publishedAt: "1 day ago",
    aiGenerated: true,
  };

  const posts = recentPosts?.length > 0 ? recentPosts : [demoPost1, demoPost2];

  const calculateEngagementRate = (engagement: any) => {
    if (!engagement) return "0%";
    const total = (engagement.likes || 0) + (engagement.comments || 0) + (engagement.shares || 0);
    // Simplified calculation - would be based on total reach in real scenario
    return `${Math.min(15, Math.max(5, total * 0.1)).toFixed(1)}%`;
  };

  return (
    <div className="mt-8">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Recent AI-Generated Posts</h3>
          <Button variant="ghost" size="sm" data-testid="button-view-all-posts">
            View All Posts
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="glass rounded-xl p-5 hover:backdrop-blur-lg transition-all duration-300"
              data-testid={`recent-post-${post.id}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">JD</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <span className="text-xs text-muted-foreground">• {post.publishedAt}</span>
                    {post.aiGenerated && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <p 
                    className="text-sm text-foreground leading-relaxed mb-3 whitespace-pre-wrap"
                    data-testid={`post-content-${post.id}`}
                  >
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex space-x-4">
                      <span className="flex items-center space-x-1" data-testid={`post-likes-${post.id}`}>
                        <Heart className="w-3 h-3" />
                        <span>{post.engagement?.likes || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1" data-testid={`post-comments-${post.id}`}>
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.engagement?.comments || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1" data-testid={`post-shares-${post.id}`}>
                        <Repeat2 className="w-3 h-3" />
                        <span>{post.engagement?.shares || 0}</span>
                      </span>
                    </div>
                    <span data-testid={`post-engagement-rate-${post.id}`}>
                      Engagement: {calculateEngagementRate(post.engagement)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
