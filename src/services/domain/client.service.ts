import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClientDTO } from "../../models/client.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClientService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtlService: ImageUtilService
  ) {}

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/email?email=${email}`);
  }
  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
  insert(obj: ClientDTO) {
    console.log(obj);
    return this.http.post(`${API_CONFIG.baseUrl}/clients`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  uploadPicture(picture) {
    let pictureblob = this.imageUtlService.dataUriToBlob(picture);

    let formdDate: FormData = new FormData();
    formdDate.set("file", pictureblob, "file.png");

    return this.http.post(`${API_CONFIG.baseUrl}/clients/picture`, formdDate, {
      observe: "response",
      responseType: "text"
    });
  }
}
