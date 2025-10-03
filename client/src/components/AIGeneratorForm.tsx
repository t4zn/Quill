import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

export default function AIGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  const { token, isAuthenticated } = useAuth();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    if (!isAuthenticated || !token) {
      setError("Please log in to use AI content generation");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    setSuccess("");
    setGeneratedContent([]);

      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topic: topic.trim(),
          quantity: parseInt(quantity)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      if (data.success && data.content) {
        setGeneratedContent(data.content);
        setSuccess(`Successfully generated ${data.content.length} blog post${data.content.length > 1 ? 's' : ''}!`);
        setTopic("");
      } else {
        throw new Error('No content generated');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Blog Generator
          </h2>
          <p className="text-muted-foreground">
            Enter a topic and let AI create engaging blog content for you
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Blog Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., The future of artificial intelligence"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              data-testid="input-topic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Blogs</Label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger id="quantity" data-testid="select-quantity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Blog</SelectItem>
                <SelectItem value="3">3 Blogs</SelectItem>
                <SelectItem value="5">5 Blogs</SelectItem>
                <SelectItem value="10">10 Blogs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="w-full"
            size="lg"
            data-testid="button-generate"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Blog{quantity !== "1" ? "s" : ""}
              </>
            )}
          </Button>

          {/* Status Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Generated Content Display */}
        {generatedContent.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Generated Content</h3>
            {generatedContent.map((content, index) => (
              <Card key={content.id || index} className="p-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">{content.title}</h4>
                  <p className="text-muted-foreground text-sm">{content.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>By {content.author}</span>
                    <span>{content.readTime}</span>
                    {content.isAIGenerated && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{content.content.substring(0, 300)}...</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Copy Content
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
