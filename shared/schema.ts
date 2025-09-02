import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  linkedinHandle: text("linkedin_handle"),
  isLinkedinConnected: boolean("is_linkedin_connected").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  contentType: text("content_type").notNull(), // 'professional_insight', 'industry_news', etc.
  targetAudience: text("target_audience").notNull(),
  keywords: text("keywords"),
  status: text("status").notNull().default('draft'), // 'draft', 'scheduled', 'published'
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  engagement: jsonb("engagement"), // { likes: number, comments: number, shares: number }
  aiGenerated: boolean("ai_generated").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trendingTopics = pgTable("trending_topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'tech', 'leadership', 'innovation', etc.
  trendingScore: integer("trending_score").notNull(),
  engagementEstimate: text("engagement_estimate").notNull(), // percentage as string
  peakTime: text("peak_time").notNull(),
  status: text("status").notNull().default('active'), // 'hot', 'rising', 'emerging', 'active'
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  date: timestamp("date").notNull(),
  engagementRate: text("engagement_rate").notNull(),
  followerGrowth: integer("follower_growth").default(0),
  postsPublished: integer("posts_published").default(0),
  bestPerformingTime: text("best_performing_time"),
  topContentType: text("top_content_type"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
});

export const insertTrendingTopicSchema = createInsertSchema(trendingTopics).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

// Content generation request schema
export const generateContentSchema = z.object({
  contentType: z.string(),
  targetAudience: z.string(),
  keywords: z.string(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type TrendingTopic = typeof trendingTopics.$inferSelect;
export type InsertTrendingTopic = z.infer<typeof insertTrendingTopicSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type GenerateContentRequest = z.infer<typeof generateContentSchema>;
