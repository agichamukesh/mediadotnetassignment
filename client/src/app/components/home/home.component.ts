import { Component, OnInit } from '@angular/core';
import { forkJoin, concat } from 'rxjs';
import {HomeService} from '../../services/home.services'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private homeService : HomeService) { }

  slot1 = {
    _id : '',
    name : '',
    cost : 0,
    clicks : 0
  };
  slot2 = {
    _id : '',
    name : '',
    cost : 0,
    clicks : 0
  };
  errorMessage ="";
  allAds = [];
  apierror = false;
  ngOnInit() {
   this.updateAds(); 
  }  


  selectAdds(ads) {
    ads.sort(this.sortByCost);
    if(ads[0]){
      this.slot1 = ads[0]
    }

    if(ads[1]){
      this.slot2 = ads[1]
    }
    console.log(this.slot1);
    console.log(this.slot2);
    console.log(ads,'ads');
  }

  sortByCost(a,b){
    if(a.cost > b.cost){
      return -1
    } else if(a.cost < b.cost){
      return 1
    } 
    return 0;
  }

  updateAds(){
    forkJoin(
      this.homeService.getAds('advertiser1'),
      this.homeService.getAds('advertiser2'),
      this.homeService.getAds('advertiser3'),
      this.homeService.getAds('advertiser4'),
    )
    .subscribe(([res1, res2, res3, res4]) => {
      if( !res1['status'] || !res2['status'] || !res3['status'] || !res4['status']){
        this.apierror = true;
        this.errorMessage ="Something went wrong while fethcing ads";
      } else {
        const allAds = [].concat(res1['data'].ads,res2['data'].ads,res3['data'].ads,res4['data'].ads);
        this.selectAdds(allAds);
        this.allAds = allAds;
      }
    });
  }

  addClick(id){
    this.homeService.addClick(id).subscribe(response => {
      if(response['status']){
        this.updateAds();
      } else{
        this.apierror = true;
        this.errorMessage ="Something went wrong while adding click";
      }
    });
  }

  updateCost(id){
    const cost = document.getElementById('ad_' + id)['value'];
    this.homeService.updateCost(id,cost).subscribe( response =>{
      if(response['status']){
        this.updateAds();
      } else {
        this.apierror = true;
        this.errorMessage ="Something went wrong while updating cost";
      }
    });
  }

}
