"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postService } from "@/services/postService";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
};

export const PostActions = ({ postId }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当にこの記事を削除しますか？")) return;

    setLoading(true);
    try {
      await postService.deletePost(postId);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("削除に失敗しました", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <Button
        onClick={() => router.push(`/posts/${postId}/edit`)}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        編集
      </Button>

      <Button
        variant="secondary"
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
      >
        {loading ? "削除中..." : "削除"}
      </Button>
    </div>
  );
};
