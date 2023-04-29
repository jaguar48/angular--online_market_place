// export interface Cart {
//     id: number;
//     items: CartItem[];
//     cartId:number;
// }  
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
