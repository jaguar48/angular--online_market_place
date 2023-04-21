export interface Cart {
    
    cartItems: CartItem[];
}  


export interface CartItem {
    
    id: number;
    productId: number;
    name: string;
    quantity: number;
    price: number;
  }
  