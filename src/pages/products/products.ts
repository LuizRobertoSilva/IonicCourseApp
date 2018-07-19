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
  items: ProductDTO[] = [];

  page: number = 0;

  linesPerPage: number = 10;
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
    this.items = [];
    this.page = 0;
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  getImageIfExists(start: number, end: number) {
    for (var i = start; i < end; i++) {
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
    this.productService
      .findByCategory(categoryId, this.page, this.linesPerPage)
      .subscribe(
        response => {
          let start = this.items.length;
          this.items = this.items.concat(response["content"]);
          let end = this.items.length - 1;
          loader.dismiss();
          this.getImageIfExists(start, end);
        },
        err => {
          loader.dismiss();
        }
      );
  }
}
