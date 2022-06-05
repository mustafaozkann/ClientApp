import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, Product } from './Model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:5000/api/";
  model = new Model();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProductById(id: number) {
    return this.model.products.find(i => i.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == 0) {
      this.model.products.push(product);
    }
    else {
      const p = this.getProductById(product.id);
      p.name = product.name;
      p.price = product.price;
      p.isActive = product.isActive;
    }
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.baseUrl + 'products/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + 'products/' + product.id);
  }
}
