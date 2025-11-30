import { supabase } from "@/lib/supabase";
import { Category } from "@/types";

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) {
      console.error(error);
      return [];
    }

    return data as Category[];
  }
}

export const categoryService = new CategoryService();
