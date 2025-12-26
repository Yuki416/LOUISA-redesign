export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  coldPrice?: number;
  hotPrice?: number;
  categoryId: string;
  image: string;
  tags?: ('hot' | 'ice' | 'new')[];
}

export type ImageSize = '1K' | '2K' | '4K';

export interface GeneratedImage {
  url: string;
  prompt: string;
  size: ImageSize;
}