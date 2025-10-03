import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AIGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    console.log('Generating', quantity, 'blog(s) about:', topic);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setTopic("");
    }, 2000);
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
            disabled={!topic || isGenerating}
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
        </div>
      </div>
    </Card>
  );
}
