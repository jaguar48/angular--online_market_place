export interface Order {
    id: number;
    orderDate: Date;
    orderStatus: string;
    paymentGateway?: string;
    transactionReference?: string;
    email?: string;
    shippingMethod?: string;
    shippingCost: number;
    estimateDeliveryDate: Date;
    total: number;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    total: number;
  }