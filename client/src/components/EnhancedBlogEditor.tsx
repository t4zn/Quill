import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, Eye, Sparkles, Bold, Italic, List, ListOrdered, 
  Link as LinkIcon, Image as ImageIcon, Code, Heading1, Heading2 
} from "lucide-react";
import { motion } from "framer-motion";

export default function EnhancedBlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (format: string) => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = "";
    
    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "italic text"}*`;
        break;
      case "h1":
        newText = `# ${selectedText || "Heading 1"}`;
        break;
      case "h2":
        newText = `## ${selectedText || "Heading 2"}`;
        break;
      case "link":
        newText = `[${selectedText || "link text"}](url)`;
        break;
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`;
        break;
      case "code":
        newText = `\`${selectedText || "code"}\``;
        break;
      case "ul":
        newText = `- ${selectedText || "list item"}`;
        break;
      case "ol":
        newText = `1. ${selectedText || "list item"}`;
        break;
    }
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleImageUpload = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertFormatting("image");
      setContent(content.replace("image-url", url));
    }
  };

  const handleSave = () => {
    console.log('Saving blog:', { title, content, category, imageUrl });
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-semibold mb-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full" />')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold h-14"
            data-testid="input-title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Technology, Design"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="input-category"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input
              id="image"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              data-testid="input-image-url"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="edit" data-testid="tab-edit">Edit</TabsTrigger>
            <TabsTrigger value="preview" data-testid="tab-preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="mt-0">
          <Card className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2 pb-3 border-b">
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("bold")} data-testid="button-bold">
                <Bold className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("italic")} data-testid="button-italic">
                <Italic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("h1")} data-testid="button-h1">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("h2")} data-testid="button-h2">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("link")} data-testid="button-link">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleImageUpload} data-testid="button-image">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("code")} data-testid="button-code">
                <Code className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("ul")} data-testid="button-ul">
                <List className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => insertFormatting("ol")} data-testid="button-ol">
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              ref={textareaRef}
              placeholder="Start writing your blog content... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[500px] font-mono text-base resize-none"
              data-testid="textarea-content"
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <Card className="p-8 min-h-[500px]">
            {imageUrl && (
              <img src={imageUrl} alt="Featured" className="w-full h-64 object-cover rounded-lg mb-6" />
            )}
            {title && <h1 className="text-4xl font-bold mb-6">{title}</h1>}
            {category && <Badge variant="secondary" className="mb-6">{category}</Badge>}
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content ? renderPreview(content) : '<p class="text-muted-foreground italic">No content yet. Start writing to see the preview.</p>' }}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-3">
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
    </motion.div>
  );
}
