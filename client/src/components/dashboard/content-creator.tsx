import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateContentSchema, type GenerateContentRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Zap, Heart, ArrowRight } from "lucide-react";

interface GeneratedContent {
  content: string;
  engagementPrediction: string;
  bestTime: string;
  hashtags: string[];
}

export default function ContentCreator() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<GenerateContentRequest>({
    resolver: zodResolver(generateContentSchema),
    defaultValues: {
      contentType: "",
      targetAudience: "",
      keywords: "",
    },
  });

  const generateContentMutation = useMutation({
    mutationFn: async (data: GenerateContentRequest) => {
      const response = await apiRequest("POST", "/api/generate-content", data);
      return await response.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data);
      toast({
        title: "Content Generated Successfully",
        description: "Your AI-powered LinkedIn content is ready for review.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const researchTrendsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/research-trends", {});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trending-topics"] });
      toast({
        title: "Trends Researched",
        description: "New trending topics have been discovered and added.",
      });
    },
    onError: () => {
      toast({
        title: "Research Failed",
        description: "Failed to research trends. Please try again.",
        variant: "destructive",
      });
    },
  });

  const schedulePostMutation = useMutation({
    mutationFn: async (content: string) => {
      const scheduleTime = new Date();
      scheduleTime.setHours(14, 0, 0, 0); // 2:00 PM today
      
      const postData = {
        content,
        contentType: form.getValues("contentType"),
        targetAudience: form.getValues("targetAudience"),
        keywords: form.getValues("keywords"),
        status: "scheduled",
        scheduledAt: scheduleTime.toISOString(),
        aiGenerated: true,
      };
      
      const response = await apiRequest("POST", "/api/posts", postData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts/scheduled"] });
      toast({
        title: "Post Scheduled",
        description: "Your content has been scheduled for optimal engagement time.",
      });
      setGeneratedContent(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Scheduling Failed",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GenerateContentRequest) => {
    generateContentMutation.mutate(data);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">AI Content Creator</h3>
        <div className="flex items-center space-x-2">
          <span className="status-indicator text-success text-sm">AI Ready</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-content-type">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional_insight">Professional Insight</SelectItem>
                      <SelectItem value="industry_news">Industry News</SelectItem>
                      <SelectItem value="personal_story">Personal Story</SelectItem>
                      <SelectItem value="question_to_community">Question to Community</SelectItem>
                      <SelectItem value="achievement_update">Achievement Update</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-target-audience">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tech_professionals">Tech Professionals</SelectItem>
                      <SelectItem value="business_leaders">Business Leaders</SelectItem>
                      <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                      <SelectItem value="industry_peers">Industry Peers</SelectItem>
                      <SelectItem value="general_network">General Network</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic or Keywords</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., AI automation, leadership, remote work trends..."
                    {...field}
                    data-testid="input-keywords"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit" 
              className="premium-gradient text-white hover:scale-105 transform transition-all duration-200 shadow-lg backdrop-blur-sm font-semibold"
              disabled={generateContentMutation.isPending}
              data-testid="button-generate-ai-content"
            >
              <Zap className="w-5 h-5 mr-2" />
              {generateContentMutation.isPending ? "✨ Generating..." : "✨ Generate AI Content"}
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="glass text-foreground hover:scale-105 transform transition-all duration-200 border-accent/30 font-semibold"
              onClick={() => researchTrendsMutation.mutate()}
              disabled={researchTrendsMutation.isPending}
              data-testid="button-research-trends"
            >
              <Heart className="w-5 h-5 mr-2" />
              {researchTrendsMutation.isPending ? "🔍 Researching..." : "🔍 Research Trends"}
            </Button>
          </div>

          {/* AI-Generated Content Preview */}
          {generatedContent && (
            <div className="glass rounded-xl p-4 border-l-4 border-accent/50 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 premium-gradient rounded-full flex items-center justify-center mt-1 shadow-lg">
                  <Zap className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1" data-testid="content-preview">
                  <h4 className="font-semibold text-foreground mb-2">AI-Generated Content Preview</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-3">
                    {generatedContent.content}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span data-testid="text-engagement-prediction">📊 Projected Engagement: {generatedContent.engagementPrediction}</span>
                      <span data-testid="text-best-time">⏰ Best time: {generatedContent.bestTime}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setGeneratedContent(null)}
                        data-testid="button-edit-content"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        className="premium-gradient text-white hover:scale-105 transform transition-all duration-200 shadow-lg font-semibold"
                        onClick={() => schedulePostMutation.mutate(generatedContent.content)}
                        disabled={schedulePostMutation.isPending}
                        data-testid="button-schedule-post"
                      >
                        {schedulePostMutation.isPending ? "📅 Scheduling..." : "📅 Schedule"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
