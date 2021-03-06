import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CartItem } from "../../models/cart_item";
import { ProductService } from "../../services/domain/product.service";
import { API_CONFIG } from "../../config/api.config";
import { CartService } from "../../services/domain/cart.service";
import { ProductDTO } from "../../models/product.dto";
@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public productService: ProductService
  ) {}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.getImageIfExists();
  }
  getImageIfExists() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.product.id).subscribe(
        response => {
          item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.product.id
          }-small.jpg`;
        },
        err => {}
      );
    }
  }
  removeItem(produto: ProductDTO) {
    this.items = this.cartService.removeProduct(produto).items;
  }

  increaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.increaseProduct(produto).items;
  }

  decreaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.decreaseProduct(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot("CategoriesPage");
  }
  checkout(){
    this.navCtrl.push("PickAddressPage");
  }
}
