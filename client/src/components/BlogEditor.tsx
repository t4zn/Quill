import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, Sparkles } from "lucide-react";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    console.log('Saving blog:', { title, content, category });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold"
            data-testid="input-title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g., Technology, Design, Writing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-testid="input-category"
          />
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="edit" data-testid="tab-edit">Edit</TabsTrigger>
          <TabsTrigger value="preview" data-testid="tab-preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-6">
          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea
              id="content"
              placeholder="Start writing your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] font-mono text-base"
              data-testid="textarea-content"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-6">
          <Card className="p-8 min-h-[400px]">
            {title && <h1 className="text-4xl font-bold mb-6">{title}</h1>}
            {category && (
              <Badge variant="secondary" className="mb-6">
                {category}
              </Badge>
            )}
            <div className="prose prose-lg max-w-none">
              {content ? (
                <p className="whitespace-pre-wrap">{content}</p>
              ) : (
                <p className="text-muted-foreground italic">No content yet. Start writing to see the preview.</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3">
        <Button onClick={handleSave} size="lg" data-testid="button-save">
          <Save className="h-5 w-5 mr-2" />
          Save Draft
        </Button>
        <Button variant="outline" size="lg" data-testid="button-publish">
          <Eye className="h-5 w-5 mr-2" />
          Publish
        </Button>
        <Button variant="outline" size="lg" data-testid="button-ai-assist">
          <Sparkles className="h-5 w-5 mr-2" />
          AI Assist
        </Button>
      </div>
    </div>
  );
}
