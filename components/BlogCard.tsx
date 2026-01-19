import Link from "next/link";

export default function BlogCard({ post }: any) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border p-4 hover:bg-gray-50">
        <h2 className="font-semibold">{post.title}</h2>
        <p className="text-sm text-gray-600">{post.date}</p>
        <p className="text-sm mt-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
