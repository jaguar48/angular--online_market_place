export interface CartItem {
    id: number;
    productId: number;
    name: string;
    quantity: number;
    price: number;
    cartId:number;
  }

  export interface Carts {
    productId: number;
    quantity:number;
}  
