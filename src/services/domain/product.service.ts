import { Injectable } from "@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findByCategory(categoryId: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/products/?categories=${categoryId}`
    );
  }
  findById(id: string): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(
      `${API_CONFIG.baseUrl}/products/${id}`
    );
  }
  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
}
