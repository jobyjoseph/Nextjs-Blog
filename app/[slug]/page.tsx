import { Metadata } from "next";
import markdownIt from "markdown-it";
import { getAllPosts, getPostBySlug } from "../../lib/posts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug, // Use slug from frontmatter
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post.metadata.title };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const md = new markdownIt();
  const htmlContent = md.render(post.content);

  return (
    <article>
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.date.toString()}</p>

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}
