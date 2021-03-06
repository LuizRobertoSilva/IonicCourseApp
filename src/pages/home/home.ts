import { Component } from "@angular/core";
import { NavController, IonicPage, MenuController } from "ionic-angular";

import { CredentialDTO } from "../../models/Credential.dto";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  creds: CredentialDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {}
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
      },
      err => {}
    );
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(
      res => {
        this.auth.successfulLogin(res.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
      },
      err => {}
    );
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
}
