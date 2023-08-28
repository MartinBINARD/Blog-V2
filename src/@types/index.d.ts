export interface CategoryInterface {
  id: number;
  slug: string;
  name: string;
}

export interface PostInterface {
  id: number;
  categoryId: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: CategoryInterface;
}
