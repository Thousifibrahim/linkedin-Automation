import { type User, type InsertUser, type Post, type InsertPost, type TrendingTopic, type InsertTrendingTopic, type Analytics, type InsertAnalytics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Posts
  getPosts(userId: string): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, updates: Partial<Post>): Promise<Post | undefined>;
  getScheduledPosts(userId: string): Promise<Post[]>;
  getRecentPosts(userId: string, limit?: number): Promise<Post[]>;

  // Trending Topics
  getTrendingTopics(): Promise<TrendingTopic[]>;
  createTrendingTopic(topic: InsertTrendingTopic): Promise<TrendingTopic>;

  // Analytics
  getAnalytics(userId: string): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getLatestAnalytics(userId: string): Promise<Analytics | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;
  private trendingTopics: Map<string, TrendingTopic>;
  private analytics: Map<string, Analytics>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.trendingTopics = new Map();
    this.analytics = new Map();

    // Initialize with demo user
    this.initializeDemoData();
  }

  private async initializeDemoData() {
    const demoUser = await this.createUser({
      username: "johndoe",
      email: "john@example.com",
      linkedinHandle: "@johndoe_ai",
      isLinkedinConnected: true,
    });

    // Add some sample trending topics
    await this.createTrendingTopic({
      title: "Remote Work Tools Evolution",
      description: "Discussion around new collaboration platforms and their impact on team productivity. High engagement potential.",
      category: "Tech Industry",
      trendingScore: 94,
      engagementEstimate: "8.7%",
      peakTime: "2-4 PM",
      status: "hot",
    });

    await this.createTrendingTopic({
      title: "AI Ethics in Business Decision Making",
      description: "Growing conversations about responsible AI implementation in corporate environments. Perfect for thought leadership.",
      category: "Leadership",
      trendingScore: 87,
      engagementEstimate: "7.2%",
      peakTime: "9-11 AM",
      status: "rising",
    });

    await this.createTrendingTopic({
      title: "Quantum Computing Breakthroughs",
      description: "Recent advances in quantum technology and their potential business applications. Early adoption topic.",
      category: "Innovation",
      trendingScore: 72,
      engagementEstimate: "6.1%",
      peakTime: "11-1 PM",
      status: "emerging",
    });

    // Add sample analytics
    await this.createAnalytics({
      userId: demoUser.id,
      date: new Date(),
      engagementRate: "8.4%",
      followerGrowth: 127,
      postsPublished: 5,
      bestPerformingTime: "2:00 PM",
      topContentType: "Insights",
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      linkedinHandle: insertUser.linkedinHandle || null,
      isLinkedinConnected: insertUser.isLinkedinConnected || null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getPosts(userId: string): Promise<Post[]> {
    return Array.from(this.posts.values()).filter(post => post.userId === userId);
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      ...insertPost,
      id,
      createdAt: new Date(),
      publishedAt: null,
      keywords: insertPost.keywords || null,
      status: insertPost.status || 'draft',
      scheduledAt: insertPost.scheduledAt || null,
      engagement: insertPost.engagement || null,
      aiGenerated: insertPost.aiGenerated || null,
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async getScheduledPosts(userId: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId && post.status === 'scheduled')
      .sort((a, b) => {
        if (!a.scheduledAt || !b.scheduledAt) return 0;
        return a.scheduledAt.getTime() - b.scheduledAt.getTime();
      });
  }

  async getRecentPosts(userId: string, limit: number = 10): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId && post.status === 'published')
      .sort((a, b) => {
        if (!a.publishedAt || !b.publishedAt) return 0;
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
      .slice(0, limit);
  }

  async getTrendingTopics(): Promise<TrendingTopic[]> {
    return Array.from(this.trendingTopics.values())
      .sort((a, b) => b.trendingScore - a.trendingScore);
  }

  async createTrendingTopic(topic: InsertTrendingTopic): Promise<TrendingTopic> {
    const id = randomUUID();
    const trendingTopic: TrendingTopic = {
      ...topic,
      id,
      createdAt: new Date(),
      status: topic.status || 'active',
    };
    this.trendingTopics.set(id, trendingTopic);
    return trendingTopic;
  }

  async getAnalytics(userId: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => analytics.userId === userId);
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      followerGrowth: insertAnalytics.followerGrowth || null,
      postsPublished: insertAnalytics.postsPublished || null,
      bestPerformingTime: insertAnalytics.bestPerformingTime || null,
      topContentType: insertAnalytics.topContentType || null,
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getLatestAnalytics(userId: string): Promise<Analytics | undefined> {
    const userAnalytics = await this.getAnalytics(userId);
    return userAnalytics.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  }
}

export const storage = new MemStorage();
