import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Zap, Clock } from "lucide-react";
import type { User } from "@shared/schema";

export default function AccountStatus() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Account Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linkedin rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-linkedin-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">LinkedIn Account</p>
              <p className="text-xs text-muted-foreground" data-testid="text-linkedin-handle">
                {user?.linkedinHandle || "@johndoe_ai"}
              </p>
            </div>
          </div>
          <span 
            className={`status-indicator text-sm ${user?.isLinkedinConnected ? 'text-success' : 'text-destructive'}`}
            data-testid="status-linkedin-connection"
          >
            {user?.isLinkedinConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">AI Engine</p>
              <p className="text-xs text-muted-foreground">GPT-5 + Custom Models</p>
            </div>
          </div>
          <span className="status-indicator text-success text-sm" data-testid="status-ai-engine">Active</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
              <Clock className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Posting</p>
              <p className="text-xs text-muted-foreground">Next post in 3 hours</p>
            </div>
          </div>
          <span className="status-indicator text-success text-sm" data-testid="status-auto-posting">Enabled</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4"
        data-testid="button-account-settings"
      >
        Account Settings
      </Button>
    </div>
  );
}
