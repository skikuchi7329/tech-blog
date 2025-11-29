// カテゴリの定義
export interface Category {
  id: string;
  name: string;
}

// タグの定義
export interface Tag {
  id: string;
  name: string;
}

// 記事の定義
export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  status: "draft" | "published";
  category_id: string;
  created_at: string;
  updated_at: string;
}
