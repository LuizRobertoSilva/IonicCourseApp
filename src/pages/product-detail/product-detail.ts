import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProductService } from "../../services/domain/product.service";
import { ProductDTO } from "../../models/product.dto";
import { API_CONFIG } from "../../config/api.config";
import { CartService } from "../../services/domain/cart.service";

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html"
})
export class ProductDetailPage {
  item: ProductDTO;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let productId = this.navParams.get("productId");
    this.productService.findById(productId).subscribe(
      response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      err => {}
    );
  }
  getImageUrlIfExists() {
    this.productService.getImageFromBucket(this.item.id).subscribe(
      response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
          this.item.id
        }.jpg`;
      },
      err => {}
    );
  }
  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.setRoot("CartPage");
  }
}
