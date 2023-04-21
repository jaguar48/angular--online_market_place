import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './../../_interfaces/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Cart } from 'src/app/_interfaces/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product;
  quantity: number = 1;
  errorMessage: string = '';

  constructor(
    private repository: OwnerRepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getProductDetails();
  }

  private getProductDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];

    console.log('Product ID: ', id);

    const detailsUrl: string = `marketplace/Products/${id}`;

    console.log('Details URL: ', detailsUrl);

    this.repository.getProduct(detailsUrl).subscribe({
      next: (product: Product) => {
        console.log('Product details: ', product);
        this.product = product;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error while fetching product details: ', err);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  };
  

  
}





// onAddToCart() {
//   const token = localStorage.getItem('token');
//   const authToken = `Bearer ${token}`;
//   console.log('Auth Token: ', authToken);

//   // Create a cart item object that implements the CartItem interface
//   const cartItem: Cart = {
//     productId: this.product.id,
//     quantity: this.quantity,
//   };

//   this.repository.addToCart('/marketplace/products/add-to-cart', cartItem, authToken).subscribe({
//     next: () => {
//       console.log("Product added to cart successfully");

//       // You can do something else here like redirecting to the cart page
//       this.router.navigateByUrl('')
//     },
//     error: (err: HttpErrorResponse) => {
//       console.log('Error while adding product to cart: ', err);
//       this.errorHandler.handleError(err);
//       this.errorMessage = this.errorHandler.errorMessage;
//     }
//   });
// }

// this is my endpoint.
// /marketplace/products/add-to-cart
// and below is the logic code.

//  public async Task<bool> AddToCartAsync(int productId, int quantity)
//         {

//             var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

//             var buyer = await _buyerRepo.GetSingleByAsync(b => b.UserId == userId);

//             if (buyer == null)
//             {
//                 throw new Exception("Buyer not found");
//             }

//             var product = await _productRepo.GetByIdAsync(productId);

//             if (product == null)
//             {
//                 throw new Exception("Product not found");
//             }

//             if (quantity <= 0)
//             {
//                 throw new ArgumentException("Invalid quantity.");
//             }

//             var cart = await _cartRepo.GetSingleByAsync(c => c.BuyerId == buyer.Id, include: q => q.Include(c => c.CartItems));

//             if (cart == null)
//             {
//                 cart = new Cart { BuyerId = buyer.Id };
//                 await _cartRepo.AddAsync(cart);

//             }

//             if (cart.CartItems == null)
//             {
//                 cart.CartItems = new List<CartItem>();
//             }

//             var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

//             if (cartItem != null)
//             {
//                 cartItem.Quantity += quantity;
//             }
//             else
//             {
//                 cartItem = new CartItem
//                 {
//                     ProductId = productId,
//                     Quantity = quantity
//                 };
//                 cart.CartItems.Add(cartItem);
//             }

//             await _cartRepo.UpdateAsync(cart);

//             _logger.LogInfo($"Added product with ID {productId} to cart of buyer with ID {buyer.Id}");

//             return true;

//         }

// this is my checkout endpoint

// /marketplace/Orders/checkout/{cartId}

// and  below is the logic
//   public async Task<bool> CheckoutAsync(int cartId, ShippingMethod shippingMethod)
//         {

//             var cart = await _cartRepo.GetSingleByAsync(
//                 c => c.Id == cartId,
//                 include: q => q.Include(c => c.CartItems).ThenInclude(ci => ci.Product)
//             );

//             if (cart == null)
//             {
//                 throw new Exception("Cart not found");
//             }

//             if (cart.CartItems == null || !cart.CartItems.Any())
//             {
//                 throw new Exception("Cart is empty");
//             }

//             var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

//             var buyer = await _buyerRepo.GetSingleByAsync(b => b.UserId == userId);

//             if (buyer == null)
//             {
//                 throw new Exception("Buyer not found");
//             }

//             var orderReference = OrderReferenceGenerator.GenerateOrderReference();

//             var order = new Order
//             {
//                 BuyerId = buyer.Id,
//                 Reference = orderReference,
//                 OrderDate = DateTime.UtcNow,
//                 OrderStatus = OrderStatus.Pending,

//             };


//             var (shippingCost, estimatedDeliveryDate) = await ShippingCalculator.CalculateShippingCostAsync(shippingMethod);
//             order.ShippingCost = shippingCost;
//             order.shippingmethod = shippingMethod.ToString();
//             order.EstimateDeliveryDate = estimatedDeliveryDate;

//             order.TotalAmount = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity) + shippingCost;

//             await _orderRepo.AddAsync(order);

//             var orderItems = cart.CartItems.Select(ci => new OrderItem
//             {
//                 ProductId = ci.ProductId,
//                 Quantity = ci.Quantity,
//                 Price = ci.Product.Price,
//                 OrderId = order.Id
//             }).ToList();

//             await _orderitemRepo.AddRangeAsync(orderItems);

//             await _cartRepo.DeleteAsync(cart);

//             _logger.LogInfo($"Checked out cart with ID {cart.Id}");

//             var paymentRequest = new PaymentRequestDto
//             {
//                 Amount = order.TotalAmount,
//                 Email = buyer.Email,
//                 Reference = Guid.NewGuid().ToString(),
//                 CallbackUrl = "https://localhost:7258/marketplace/Products/verifypayment"
//             };

//             var transaction = await MakePayment(paymentRequest);

//             order.TransactionReference = transaction.Data.Reference;
//             order.PaymentGateway = "paystack";
//             order.OrderStatus = OrderStatus.PendingPayment;

//             await _orderRepo.UpdateAsync(order);

//             _logger.LogInfo($"Payment initiated for order with ID {order.Id}");

//             return true;

//         }