"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postService } from "@/services/postService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types";
import { categoryService } from "@/services/categoryService";

type Props = {
  post: Post;
};

export const EditPostForm = ({ post }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const [categoryId, setCategoryId] = useState<string>(post.category_id || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoryService.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);

    try {
      await postService.updatePost(post.id, {
        title,
        content,
        category_id: categoryId,
      });

      alert("記事を更新しました！");
      router.push(`/posts/${post.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategoryId(value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" value={title} onChange={handleTitleChange} required />
      </div>

      <div className="space-y-2">
        <Label>カテゴリ</Label>
        <Select value={categoryId} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">本文 (Markdown)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          キャンセル
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "更新中..." : "更新内容を保存"}
        </Button>
      </div>
    </form>
  );
};
