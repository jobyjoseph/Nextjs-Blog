import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMetadata {
  title: string;
  date: string;
  slug: string; // Add the slug field
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

const articlesDirectory = path.join(process.cwd(), "articles");

// Helper function to get all markdown files recursively
function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getMarkdownFiles(fullPath) : fullPath;
  });
}

export function getAllPosts(): Post[] {
  const filePaths = getMarkdownFiles(articlesDirectory).filter((file) =>
    file.endsWith(".mdx")
  );

  return filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    if (!data.slug) {
      throw new Error(`Missing 'slug' in frontmatter of ${filePath}`);
    }

    return {
      slug: data.slug, // Use slug from frontmatter
      metadata: data as PostMetadata,
      content,
    };
  });
}

export function getPostBySlug(slug: string): Post {
  const filePaths = getMarkdownFiles(articlesDirectory);

  const filePath = filePaths.find((file) => {
    const fileContents = fs.readFileSync(file, "utf8");
    const { data } = matter(fileContents);
    return data.slug === slug;
  });

  if (!filePath) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as PostMetadata,
    content,
  };
}
