import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { ClientService } from "../../services/domain/client.service";
import { ClientDTO } from "../../models/client.dto";
import { API_CONFIG } from "../../config/api.config";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  client: ClientDTO;

  picture: string;
  cameraOn: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public service: ClientService,
    private camera: Camera
  ) {}

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.service.findByEmail(localUser.email).subscribe(
        response => {
          this.client = response as ClientDTO;
          this.getImageIfExists();
        },
        err => {
          if (err.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }
  ionViewDidLoad() {
    this.loadData();
  }

  getImageIfExists() {
    this.service.getImageFromBucket(this.client.id).subscribe(
      response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${
          this.client.id
        }.jpg`;
      },
      err => {}
    );
  }
  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        // Handle error
      }
    );
  }
  getGaleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        // Handle error
      }
    );
  }

  sendPicture() {
    this.service.uploadPicture(this.picture).subscribe(
      x => {
        this.picture = null;
        this.loadData();
      },
      err => {}
    );
  }
  cancel() {
    this.picture = null;
  }
}
