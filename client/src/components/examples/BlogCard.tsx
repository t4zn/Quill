import BlogCard from '../BlogCard'

export default function BlogCardExample() {
  return (
    <div className="max-w-4xl p-6">
      <BlogCard
        id="1"
        title="The Future of AI in Content Creation"
        excerpt="Exploring how artificial intelligence is revolutionizing the way we create and consume content in the digital age."
        author="Sarah Chen"
        date="Oct 1, 2024"
        readTime="5 min read"
        category="AI & Technology"
        imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"
        isAiGenerated={true}
      />
    </div>
  )
}
