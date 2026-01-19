import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <p>{post.content}</p>
    </article>
  );
}
