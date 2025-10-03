import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  readTime: number;
  views: number;
  likes: mongoose.Types.ObjectId[];
  isAIGenerated: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featuredImage: {
    type: String,
    default: null
  },
  readTime: {
    type: Number,
    default: 1
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isAIGenerated: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    maxlength: 60
  },
  seoDescription: {
    type: String,
    maxlength: 160
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create slug from title
BlogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate read time based on content
BlogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

export default mongoose.model<IBlog>('Blog', BlogSchema);