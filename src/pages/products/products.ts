import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ProductDTO } from "../../models/product.dto";
import { ProductService } from "../../services/domain/product.service";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: "page-products",
  templateUrl: "products.html"
})
export class ProductsPage {
  items: ProductDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public loadingController: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getImageIfExists() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.id
          }-small.jpg`;
        },
        err => {}
      );
    }
  }
  showProductDetail(id: string) {
    this.navCtrl.push("ProductDetailPage", { productId: id });
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Waiting..."
    });
    loader.present();
    return loader;
  }

  loadData() {
    let categoryId = this.navParams.get("categoryId");
    let loader = this.presentLoading();
    this.productService.findByCategory(categoryId).subscribe(
      response => {
        this.items = response["content"];
        loader.dismiss();
        this.getImageIfExists();
      },
      err => {
        loader.dismiss();
      }
    );
  }
}
