export type LikeStatus = 'neutral' | 'like' | 'dislike';

export interface Ingredient {
  name: string;
  status: LikeStatus;
}

export interface FoodItem {
  name: string;
  price: string;
  ingredients: Ingredient[];
}
