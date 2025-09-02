import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

export default function SchedulingCalendar() {
  const { data: scheduledPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts/scheduled"],
  });

  // Generate calendar grid for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(currentYear, currentMonth, 0 - (startingDayOfWeek - 1 - i));
    calendarDays.push({
      day: prevMonthDay.getDate(),
      isCurrentMonth: false,
      date: prevMonthDay,
    });
  }
  
  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date,
    });
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const hasScheduledPost = (date: Date) => {
    if (!scheduledPosts) return false;
    return scheduledPosts.some((post) => {
      if (!post.scheduledAt) return false;
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const getTodaysScheduledPosts = () => {
    if (!scheduledPosts) return [];
    return scheduledPosts.filter((post) => {
      if (!post.scheduledAt) return false;
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === today.toDateString();
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Content Schedule</h3>
        <Button variant="ghost" size="sm" data-testid="button-view-all-schedule">
          View All
        </Button>
      </div>

      {/* Mini Calendar */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                p-2 text-center relative cursor-pointer hover:bg-muted rounded
                ${day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                ${isToday(day.date) ? 'bg-primary text-primary-foreground rounded' : ''}
              `}
              data-testid={`calendar-day-${day.day}-${day.isCurrentMonth ? 'current' : 'other'}`}
            >
              {day.day}
              {hasScheduledPost(day.date) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Today's Schedule</h4>
        
        {getTodaysScheduledPosts().length > 0 ? (
          getTodaysScheduledPosts().map((post: any) => {
            const scheduleTime = new Date(post.scheduledAt);
            return (
              <div 
                key={post.id} 
                className="bg-background p-3 rounded-lg border border-border"
                data-testid={`scheduled-post-${post.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground" data-testid={`post-time-${post.id}`}>
                      {scheduleTime.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`post-type-${post.id}`}>
                      {post.contentType?.replace('_', ' ') || 'LinkedIn post'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Scheduled
                  </Badge>
                </div>
              </div>
            );
          })
        ) : (
          <>
            {/* Placeholder scheduled posts */}
            <div className="bg-background p-3 rounded-lg border border-border" data-testid="demo-post-1">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">2:00 PM</p>
                  <p className="text-xs text-muted-foreground">AI Automation post</p>
                </div>
                <Badge variant="secondary" className="text-xs">Scheduled</Badge>
              </div>
            </div>

            <div className="bg-background p-3 rounded-lg border border-border" data-testid="demo-post-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">4:30 PM</p>
                  <p className="text-xs text-muted-foreground">Industry insights</p>
                </div>
                <Badge variant="outline" className="text-xs">Draft</Badge>
              </div>
            </div>

            <div className="bg-background p-3 rounded-lg border border-border" data-testid="demo-post-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">7:00 PM</p>
                  <p className="text-xs text-muted-foreground">Personal reflection</p>
                </div>
                <Badge className="text-xs bg-success text-success-foreground">Auto-post</Badge>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
