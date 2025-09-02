import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateContentSchema, type GenerateContentRequest, type User } from "@shared/schema";
import { generateLinkedInContent, researchTrendingTopics, generateOptimizationRecommendations } from "./services/grok";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      xaiConfigured: !!process.env.XAI_API_KEY && process.env.XAI_API_KEY !== "default_key"
    });
  });

  // Get current user (demo user for now)
  app.get("/api/user", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Get the demo user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Generate AI content
  app.post("/api/generate-content", async (req, res) => {
    try {
      const validatedData = generateContentSchema.parse(req.body);
      const generatedContent = await generateLinkedInContent(validatedData);
      res.json(generatedContent);
    } catch (error) {
      console.error("Content generation error:", error);
      res.status(500).json({ message: "Failed to generate content: " + (error as Error).message });
    }
  });

  // Research trending topics
  app.post("/api/research-trends", async (req, res) => {
    try {
      const { industry } = req.body;
      const trendResearch = await researchTrendingTopics(industry);
      
      // Store discovered topics in storage
      for (const topic of trendResearch.topics) {
        await storage.createTrendingTopic(topic);
      }
      
      res.json(trendResearch);
    } catch (error) {
      console.error("Trend research error:", error);
      res.status(500).json({ message: "Failed to research trends: " + (error as Error).message });
    }
  });

  // Get trending topics
  app.get("/api/trending-topics", async (req, res) => {
    try {
      const topics = await storage.getTrendingTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trending topics" });
    }
  });

  // Create post
  app.post("/api/posts", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      
      const postData = {
        ...req.body,
        userId: user.id,
      };
      
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // Get user posts
  app.get("/api/posts", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      const posts = await storage.getPosts(user.id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get posts" });
    }
  });

  // Get scheduled posts
  app.get("/api/posts/scheduled", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      const scheduledPosts = await storage.getScheduledPosts(user.id);
      res.json(scheduledPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get scheduled posts" });
    }
  });

  // Get recent posts
  app.get("/api/posts/recent", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      const recentPosts = await storage.getRecentPosts(user.id, 10);
      res.json(recentPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recent posts" });
    }
  });

  // Get analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      const analytics = await storage.getLatestAnalytics(user.id);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to get analytics" });
    }
  });

  // Update post status (for scheduling/publishing)
  app.patch("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedPost = await storage.updatePost(id, updates);
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // Get AI recommendations
  app.get("/api/recommendations", async (req, res) => {
    try {
      const users = Array.from((storage as any).users.values()) as User[];
      const user = users[0] as User; // Use demo user
      
      // Mock engagement data for demonstration
      const mockEngagementData = [
        { date: "2025-08-20", engagement: 8.5, contentType: "insight", time: "2:00 PM" },
        { date: "2025-08-21", engagement: 6.2, contentType: "news", time: "9:00 AM" },
        { date: "2025-08-22", engagement: 9.1, contentType: "insight", time: "3:00 PM" },
        { date: "2025-08-23", engagement: 7.8, contentType: "question", time: "11:00 AM" },
      ];
      
      const recommendations = await generateOptimizationRecommendations(mockEngagementData);
      res.json({ recommendations });
    } catch (error) {
      console.error("Recommendations error:", error);
      res.status(500).json({ message: "Failed to get recommendations: " + (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
