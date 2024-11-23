import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1>Backbencher.dev</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post?.metadata?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
