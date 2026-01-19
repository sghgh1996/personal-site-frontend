import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Travel Blog | Your Name",
};

export default function BlogPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Travel Blog</h1>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
