import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient  } from '@angular/common/http';

const API_URL = environment.apiBase ;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient : HttpClient
  ) { }
  
  public getAds(advertiser) {
    let params = {name : advertiser}
    return this.httpClient.get(API_URL + 'slots/', {params : params});
  }

  public addClick(id){
    return this.httpClient.put(API_URL + 'slots/interaction/' + id,{}); 
  }
  public updateCost(id,cost){
    return this.httpClient.put(API_URL + 'slots/updatecost/' + id,{cost : cost}); 
  }
}
