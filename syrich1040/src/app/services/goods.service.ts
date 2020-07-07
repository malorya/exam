import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoodsService extends HttpClientService {
  options: HttpHeaders;
  constructor(public http: HttpClient) {
    super(http);
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }
  async getGoods() {
    return this.get('goods', this.options).toPromise();
  }
  async getGoodById(id) {
    return this.get('goods/' + id, this.options).toPromise();
  }
  async postGood(data) {
    return this.post('goods', data, this.options).toPromise();
  }
  async putGoodById(id, data) {
    return this.put('goods/' + id, data, this.options).toPromise();
  }
  async deleteGoodById(id) {
    return this.delete('goods/' + id, this.options).toPromise();
  }
}
