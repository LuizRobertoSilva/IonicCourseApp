import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CityService } from "../../services/domain/city.service";
import { StateService } from "../../services/domain/state.service";
import { StateDTO } from "../../models/state.dto";
import { CityDTO } from "../../models/city.dto";
import { ClientService } from "../../services/domain/client.service";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertCtrl: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      name: [
        "Teste",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120)
        ]
      ],
      email: ["teste@123.com.br", [Validators.required, Validators.email]],
      type: ["1", [Validators.required]],
      cpfOrCnpj: [
        "06134596280",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ]
      ],
      password: ["123", [Validators.required]],
      street: ["Rua Via", [Validators.required]],
      number: ["25", [Validators.required]],
      complement: ["Apto 3", []],
      neighbourhood: ["Copacabana", []],
      zipCode: ["10828333", [Validators.required]],
      telphone1: ["977261827", [Validators.required]],
      telphone2: ["", []],
      telphone3: ["", []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }
  ionViewDidLoad() {
    this.stateService.findAll().subscribe(
      response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      err => {}
    );
  }
  updateCities() {
    let stateId = this.formGroup.value.stateId;
    this.cityService.findAll(stateId).subscribe(
      response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      err => {}
    );
  }

  signupUser() {
    console.log("teste", this.formGroup.value);
    this.clientService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      err => {}
    );
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Success!!",
      message: "Success",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "ok",
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
