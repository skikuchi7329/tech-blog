import { supabase } from "@/lib/supabase";
import { Post, CreatePostInput } from "@/types";

export class PostService {
  /**
   * 記事取得メソッド
   */
  async getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*, category:categories(*)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as Post[];
  }

  /**
   * 特定の記事を取得するメソッド
   * @param id
   * @returns
   */
  async getPostById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        category:categories(*) 
      `
      )
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Post;
  }

  /**
   * 記事を保存するメソッド
   * @param input
   * @returns
   */
  async createPost(input: CreatePostInput): Promise<Post | null> {
    const { data, error } = await supabase
      .from("posts")
      .insert(input)
      .select()
      .single();

    if (error) {
      console.error("保存エラー:", error);
      throw new Error(error.message);
    }

    return data as Post;
  }

  /**
   * 記事をアップデートするメソッド
   * @params id, input
   */
  async updatePost(
    id: string,
    input: Partial<CreatePostInput>
  ): Promise<Post | null> {
    const { data, error } = await supabase
      .from("posts")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("更新エラー:", error);
      throw new Error(error.message);
    }

    return data as Post;
  }

  /**
   * 記事を削除するメソッド
   */
  async deletePost(id: string): Promise<void> {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("削除エラー:", error);
      throw new Error(error.message);
    }
  }
}

export const postService = new PostService();
