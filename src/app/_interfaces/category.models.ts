import { Product } from "./product.model";

export interface Category {
    id : string;
    name: string;
  }
  

  export interface CategoryWithProducts {
    id: number;
    name: string;
    products: cateproduct[];
  }


  export interface cateproduct{
    id : string;
    name: string;
    description: string;
   
  }
  export interface createCategory {
   
    name: string;
  }
  
