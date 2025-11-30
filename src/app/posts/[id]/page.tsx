import { notFound } from "next/navigation";
import { postService } from "@/services/postService";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostActions } from "@/components/features/post/PostActions";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await postService.getPostById(id);

  return {
    title: post ? `${post.title} | Tech Blog` : "記事が見つかりません",
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;

  const post = await postService.getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="secondary" className="mb-4">
            ← TOP
          </Button>
        </Link>

        <PostActions postId={post.id} />

        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

        <div className="flex gap-4 text-gray-500 text-sm">
          <time>{new Date(post.created_at).toLocaleDateString()}</time>
          {post.category?.name && <span>Category: {post.category?.name}</span>}
        </div>
      </div>

      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
