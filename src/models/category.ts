export interface Category {
  categoryId: number;
  name: string;
  type: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface CreateCategoryDto
{
  name: string;
  type: string;
  icon: string;
  color: string;
}