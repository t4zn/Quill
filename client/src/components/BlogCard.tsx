import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  isAiGenerated?: boolean;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  imageUrl,
  isAiGenerated = false,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -4 }}
        className="group cursor-pointer" 
        data-testid={`card-blog-${id}`}
      >
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl hover-elevate active-elevate-2 transition-all border border-transparent hover:border-border/50">
          {imageUrl && (
            <div className="relative md:w-72 w-full h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-lg">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                data-testid={`img-blog-${id}`}
              />
              {isAiGenerated && (
                <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-accent-border shadow-lg" data-testid={`badge-ai-${id}`}>
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" data-testid={`badge-category-${id}`}>{category}</Badge>
            </div>
            
            <h3 className="text-2xl font-semibold mb-3 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2" data-testid={`title-blog-${id}`}>
              {title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed" data-testid={`excerpt-blog-${id}`}>
              {excerpt}
            </p>
            
            <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground" data-testid={`author-blog-${id}`}>{author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
