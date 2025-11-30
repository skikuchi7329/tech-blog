import Link from "next/link";
import { postService } from "@/services/postService";
import { PostCard } from "@/components/features/post/PostCard";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const posts = await postService.getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tech Blog</h1>
        <Link href="/posts/create">
          <Button>記事を書く</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            記事がまだありません。
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </main>
  );
}
