import OpenAI from "openai";
import { type GenerateContentRequest } from "@shared/schema";

// Validate API key
const apiKey = process.env.XAI_API_KEY;
if (!apiKey || apiKey === "default_key") {
  console.warn("⚠️  XAI_API_KEY not configured properly. AI features will use fallback content.");
}

// Using xAI's Grok API with OpenAI-compatible interface
const openai = new OpenAI({ 
  baseURL: "https://api.x.ai/v1",
  apiKey: apiKey || "placeholder"
});

export interface GeneratedContent {
  content: string;
  engagementPrediction: string;
  bestTime: string;
  hashtags: string[];
}

export interface TrendResearch {
  topics: Array<{
    title: string;
    description: string;
    category: string;
    trendingScore: number;
    engagementEstimate: string;
    peakTime: string;
    status: string;
  }>;
}

export async function generateLinkedInContent(request: GenerateContentRequest): Promise<GeneratedContent> {
  try {
    // Fallback content if API is not configured
    if (!apiKey || apiKey === "placeholder") {
      return {
        content: `🚀 ${request.keywords} is transforming how we work in ${request.targetAudience}.\n\nKey insights:\n• Innovation drives success\n• Collaboration enhances productivity\n• Future-focused thinking wins\n\nWhat's your experience with ${request.keywords}? Share your thoughts!\n\n#Innovation #${request.keywords.replace(/\s+/g, '')} #ProfessionalGrowth #FutureOfWork`,
        engagementPrediction: "High - Questions drive engagement",
        bestTime: "2:00 PM",
        hashtags: ["Innovation", request.keywords.replace(/\s+/g, ''), "ProfessionalGrowth", "FutureOfWork"]
      };
    }

    const prompt = `Generate a professional LinkedIn post based on the following requirements:
    - Content Type: ${request.contentType}
    - Target Audience: ${request.targetAudience}
    - Keywords/Topic: ${request.keywords}
    
    Requirements:
    - Write an engaging, professional LinkedIn post
    - Include relevant emojis but don't overuse them
    - Add appropriate hashtags (4-6 relevant ones)
    - Keep it authentic and valuable
    - Length should be 2-4 paragraphs
    - Include a call-to-action or question to encourage engagement
    
    Respond with JSON in this format:
    {
      "content": "the LinkedIn post content with emojis and hashtags",
      "engagementPrediction": "High/Medium/Low with brief reason",
      "bestTime": "optimal posting time like '2:00 PM' or '9:00 AM'",
      "hashtags": ["array", "of", "hashtags", "without", "hash", "symbol"]
    }`;

    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: "You are a LinkedIn content expert who creates engaging professional posts that drive high engagement rates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
      temperature: 0.8,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      content: result.content || "Failed to generate content",
      engagementPrediction: result.engagementPrediction || "Medium",
      bestTime: result.bestTime || "2:00 PM",
      hashtags: result.hashtags || [],
    };
  } catch (error) {
    console.error("Error generating LinkedIn content:", error);
    
    // Return fallback content on error
    return {
      content: `🚀 Exploring ${request.keywords} in the ${request.targetAudience} space.\n\nKey takeaways:\n• Innovation is key to staying competitive\n• Continuous learning drives growth\n• Networking opens new opportunities\n\nWhat's your take on ${request.keywords}? Let's discuss!\n\n#Innovation #Growth #Networking #${request.keywords.replace(/\s+/g, '')}`,
      engagementPrediction: "Medium - Engaging content with question",
      bestTime: "2:00 PM",
      hashtags: ["Innovation", "Growth", "Networking", request.keywords.replace(/\s+/g, '')]
    };
  }
}

export async function researchTrendingTopics(industry?: string): Promise<TrendResearch> {
  try {
    const prompt = `Research current trending topics for LinkedIn content creation${industry ? ` in the ${industry} industry` : ""}.
    
    Find 5-8 trending topics that would be great for LinkedIn posts. For each topic, analyze:
    - Current relevance and discussion volume
    - Engagement potential
    - Best times to post about this topic
    - What makes it trending right now
    
    Focus on:
    - Professional development topics
    - Industry innovations
    - Leadership insights
    - Technology trends
    - Business strategy
    - Remote work trends
    - AI and automation
    - Sustainability in business
    
    Respond with JSON in this format:
    {
      "topics": [
        {
          "title": "concise topic title",
          "description": "detailed description of why this topic is trending and valuable for posts",
          "category": "category like 'Tech Industry', 'Leadership', 'Innovation'",
          "trendingScore": number from 0-100,
          "engagementEstimate": "percentage like '8.5%'",
          "peakTime": "optimal time range like '2-4 PM' or '9-11 AM'",
          "status": "hot/rising/emerging"
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: "You are a social media trend analyst who identifies high-engagement topics for LinkedIn content creators."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      topics: result.topics || [],
    };
  } catch (error) {
    console.error("Error researching trending topics:", error);
    throw new Error("Failed to research trending topics: " + (error as Error).message);
  }
}

export async function generateOptimizationRecommendations(
  engagementData: Array<{ date: string; engagement: number; contentType: string; time: string }>
): Promise<string[]> {
  try {
    const prompt = `Analyze this LinkedIn engagement data and provide actionable optimization recommendations:
    
    Data: ${JSON.stringify(engagementData)}
    
    Based on this data, provide 3-5 specific, actionable recommendations to improve LinkedIn content performance.
    Focus on:
    - Optimal posting times
    - Content types that perform best
    - Engagement patterns
    - Areas for improvement
    
    Respond with JSON in this format:
    {
      "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
    }`;

    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: "You are a LinkedIn analytics expert who provides data-driven recommendations for content optimization."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return result.recommendations || [];
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate optimization recommendations: " + (error as Error).message);
  }
}
