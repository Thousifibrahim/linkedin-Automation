import Navigation from "@/components/dashboard/navigation";
import StatsOverview from "@/components/dashboard/stats-overview";
import ContentCreator from "@/components/dashboard/content-creator";
import TrendingTopics from "@/components/dashboard/trending-topics";
import SchedulingCalendar from "@/components/dashboard/scheduling-calendar";
import EngagementAnalytics from "@/components/dashboard/engagement-analytics";
import AccountStatus from "@/components/dashboard/account-status";
import RecentPosts from "@/components/dashboard/recent-posts";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative blur-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-4xl font-bold premium-text-gradient mb-2">GoLinked.io</h2>
                <p className="text-lg text-muted-foreground">Automate your LinkedIn presence with AI-powered content creation</p>
              </div>
              <div className="mt-6 sm:mt-0 flex space-x-4">
                <button 
                  className="premium-gradient text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg backdrop-blur-sm"
                  data-testid="button-generate-content"
                >
                  ✨ Generate Content
                </button>
                <button 
                  className="glass px-6 py-3 rounded-xl font-semibold text-foreground hover:scale-105 transform transition-all duration-200 border-linkedin/20"
                  data-testid="button-connect-linkedin"
                >
                  🔗 Connect LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Content Creation and AI Research */}
          <div className="lg:col-span-2 space-y-8">
            <ContentCreator />
            <TrendingTopics />
          </div>

          {/* Right Column: Schedule and Analytics */}
          <div className="space-y-8">
            <SchedulingCalendar />
            <EngagementAnalytics />
            <AccountStatus />
          </div>
        </div>

        <RecentPosts />

        {/* Footer */}
        <footer className="mt-16 py-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Developed and maintained by <span className="premium-text-gradient font-semibold">SmdSpace</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
