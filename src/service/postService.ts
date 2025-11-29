import { supabase } from "@/lib/supabase";
import { Post } from "@/types";

export class PostService {
  async getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as Post[];
  }

  // 特定の記事を1つ取得するメソッド
  async getPostById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Post;
  }
}

export const postService = new PostService();
