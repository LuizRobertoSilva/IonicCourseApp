import { Injectable } from "@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findByCategory(categoryId: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/products/?categories=${categoryId}`
    );
  }
  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
}
