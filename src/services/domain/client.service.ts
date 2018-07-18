import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClientDTO } from "../../models/client.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
  constructor(public http: HttpClient, public storage: StorageService) {}

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
}
