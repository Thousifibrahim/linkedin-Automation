import { Bell } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-linkedin-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold premium-text-gradient">GoLinked</h1>
                <p className="text-xs text-muted-foreground">LinkedIn Automation Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-foreground hover:text-primary font-medium border-b-2 border-primary pb-4"
              data-testid="link-dashboard"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground font-medium"
              data-testid="link-content-creator"
            >
              Content Creator
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground font-medium"
              data-testid="link-analytics"
            >
              Analytics
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground font-medium"
              data-testid="link-settings"
            >
              Settings
            </a>
          </div>

          {/* User Profile and Actions */}
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="status-indicator text-success" data-testid="status-ai-active">AI Active</span>
            </div>
            
            {/* Notifications */}
            <button 
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            
            {/* Profile Avatar */}
            <div className="w-8 h-8 premium-gradient rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <span className="text-sm font-semibold text-white">SS</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
