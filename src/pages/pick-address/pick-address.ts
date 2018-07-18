import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClientService } from "../../services/domain/client.service";
import { AddressDTO } from "../../models/address.dto";
import { StorageService } from "../../services/storage.service";
import { OrderDTO } from "../../models/order.dto";
import { CartService } from "../../services/domain/cart.service";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html"
})
export class PickAddressPage {
  items: AddressDTO[];

  order: OrderDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientService,
    public storage: StorageService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        response => {
          this.items = response["addresses"];

          let cart = this.cartService.getCart();

          this.order = {
            client: { id: response["id"] },
            deliveryAddress: null,
            payment: null,
            items: cart.items.map(x => {
              return { quantity: x.quantity, product: { id: x.product.id } };
            })
          };
        },
        err => {}
      );
    }
  }

  nextPage(item: AddressDTO) {
    this.order.deliveryAddress = { id: item.id };
    this.navCtrl.push("PaymentPage", { order: this.order });
  }
}
