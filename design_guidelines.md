# Design Guidelines: AI-Powered Blogging Platform

## Design Approach

**Selected Approach:** Reference-Based (Medium/Substack/Linear-inspired) with Design System Foundation

This blogging platform prioritizes **readability and content clarity** while maintaining a modern, premium feel. Drawing inspiration from Medium's reading experience, Substack's creator focus, and Linear's precision, we create a distraction-free environment for both writers and readers.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Background: 0 0% 100% (pure white)
- Surface: 0 0% 98% (off-white for cards/elevated surfaces)
- Text Primary: 0 0% 10% (near black for maximum readability)
- Text Secondary: 0 0% 45% (medium gray for metadata)
- Border: 0 0% 90% (subtle borders)
- Primary: 220 90% 56% (deep blue for CTAs, links)
- Accent: 162 73% 46% (teal for AI-generated indicators)

**Dark Mode:**
- Background: 0 0% 7% (rich dark)
- Surface: 0 0% 12% (elevated surfaces)
- Text Primary: 0 0% 95% (off-white)
- Text Secondary: 0 0% 65% (muted white)
- Border: 0 0% 20% (subtle dark borders)
- Primary: 220 90% 60% (brighter blue for dark)
- Accent: 162 73% 55% (vibrant teal)

### B. Typography

**Font Stack:** Geist (primary for all text)

- **Display (Hero Headlines):** 56px/64px, weight 700, tracking -0.02em
- **H1 (Blog Titles):** 40px/48px, weight 600, tracking -0.01em
- **H2 (Section Headers):** 32px/40px, weight 600
- **H3 (Subsections):** 24px/32px, weight 600
- **Body (Reading):** 18px/32px, weight 400, max-width 680px
- **UI Text:** 15px/24px, weight 500
- **Metadata/Captions:** 14px/20px, weight 400, text-secondary color

### C. Layout System

**Spacing Scale:** Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistency.

- **Page Containers:** max-w-7xl for dashboards, max-w-4xl for blog reading
- **Section Padding:** py-16 md:py-24 for major sections
- **Component Gaps:** space-y-8 for vertical stacks, gap-6 for grids
- **Card Padding:** p-6 md:p-8 for content cards

---

## Component Library

### Navigation

**Primary Navbar:**
- Fixed top, backdrop-blur with subtle border-bottom
- Logo left, navigation center (Home, Explore, Dashboard), auth/profile right
- Height: h-16
- On scroll: add shadow-sm transition

**Mobile Navigation:**
- Hamburger menu (top-right) sliding from right
- Full-screen overlay with large text links

### Hero Section (Homepage)

**Layout:** Single column, centered, 80vh minimum height

**Content:**
- Large headline: "Create, Generate, Publish" (display typography)
- Subheading: Describe AI-powered blogging capabilities
- Two CTAs: "Start Writing" (primary button) + "Explore Blogs" (outline button with blur background)
- Below CTAs: Small trust indicator ("Join 10,000+ writers")
- Background: Subtle gradient from background to surface color, top to bottom

**Hero Image:** Include a large, hero image showcasing a clean blog editor interface or abstract representation of AI-powered writing (positioned right of text on desktop, below text on mobile)

### Blog Reading Interface

**Layout:**
- Article header: Title (H1), author info, date, reading time, tags
- Featured image (if available): Full-width, 16:9 ratio, rounded corners
- Article content: Contained in max-w-prose, generous line-height
- Sidebar (desktop only): Table of contents, related posts, share buttons
- Bottom section: Author bio card, comment section placeholder

**Typography Hierarchy:**
- All Markdown elements styled with ample whitespace
- Block quotes: left border-accent, italic, pl-6
- Code blocks: Surface color background, rounded, p-4

### Dashboard

**Layout:** Sidebar + main content area (two-column on desktop)

**Sidebar Navigation:**
- Profile section at top with avatar
- Menu items: Overview, My Blogs, AI Generator, Analytics, Settings
- "New Blog" primary button at bottom

**Main Content:**
- **Overview:** Stats cards in 3-column grid (Total Blogs, AI Generated, Total Views)
- **My Blogs:** Table/card view toggle, search bar, filter by category
- **AI Generator:** Clean form with topic input, quantity selector, preview area

### Blog Cards (Explore/Dashboard)

**Design:**
- Horizontal card layout on desktop (image left, content right)
- Vertical stack on mobile
- Image: 300px wide, 200px tall, rounded-lg
- Content: Title (H3), excerpt (2 lines), author + date, category tag
- Hover: Subtle shadow increase, smooth transition
- AI-generated badge: Small teal badge "AI Generated" top-right

### Forms & Inputs

**Blog Editor:**
- Split view: Markdown editor left, live preview right (desktop)
- Tabbed view on mobile (Edit/Preview toggle)
- Toolbar: Bold, italic, headings, links, images, code
- Auto-save indicator

**Authentication:**
- Centered card, max-w-md
- Social login buttons first (Google), divider, then email/password
- Clean input fields with floating labels
- Remember me checkbox, forgot password link

### Buttons

**Primary:** bg-primary, text-white, px-6 py-3, rounded-lg, hover:brightness-110
**Secondary:** bg-surface, text-primary, border, hover:bg-opacity-80
**Outline on Images:** bg-white/10, backdrop-blur-md, border-white/20

---

## Page-Specific Guidelines

### Homepage
- Hero section with large headline and CTA
- "Featured Blogs" section (3-column grid)
- "How It Works" (3 steps with icons)
- "AI-Powered Creation" feature highlight
- Final CTA section

### Blog Reading Page
- Clean, distraction-free layout
- Sticky progress bar at top showing read progress
- Floating share buttons (left side, desktop)
- Related articles at bottom

### Dashboard
- Quick stats overview
- Recent blogs table
- Quick actions (New Blog, Generate with AI)
- Activity feed

### Explore/All Blogs
- Hero search bar
- Category filter pills
- Blog grid (2-column on tablet, 3 on desktop)
- Infinite scroll or pagination

---

## Animations & Interactions

**Minimal Approach:**
- Fade-in on page load (opacity 0 to 1, 300ms)
- Smooth hover transitions (200ms ease)
- No auto-playing animations
- Skeleton loaders for async content

---

## Accessibility & Polish

- All interactive elements have focus states (ring-2 ring-primary)
- Color contrast ratio minimum 4.5:1
- Dark mode toggle in navbar (smooth theme transition)
- Keyboard navigation fully supported
- Loading states for AI generation (animated dots)

---

## Images

**Hero Image:** Large illustration or screenshot of the blog editor interface with AI suggestions panel visible, positioned on the right side of hero text (desktop) or below (mobile). Image should convey modern, clean interface.

**Blog Cards:** Each blog card includes a featured image (300x200px) that represents the blog content.

**Dashboard:** Optional: Small illustration in empty states (when no blogs exist yet).

**AI Generator Page:** Illustration showing AI concept, positioned above or beside the generation form.