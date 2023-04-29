export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brand: string;
  images: string[];// use an array of files instead of a single file
  categoryId: number;
}
