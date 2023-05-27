export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brand: string;
  categoryId: number;
  image: File;
}
