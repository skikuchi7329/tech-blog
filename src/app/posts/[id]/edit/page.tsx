import { notFound } from "next/navigation";
import { postService } from "@/services/postService";
import { EditPostForm } from "@/components/features/post/EditPostForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const post = await postService.getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">記事の編集</h1>
      <EditPostForm post={post} />
    </main>
  );
}
