import { Injectable } from '@angular/core';
// import { LoadingController } from '@ionic/angular';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // private loadingTimeSource = new BehaviorSubject(null);
  // private submitLoading: any;
  // private hideloadingTime = this.loadingTimeSource.asObservable();

  constructor(
    // private loadingController: LoadingController,
  ) { }

  public async showLoading() {
    // this.hideloadingTime.subscribe(async (loadTime: any) => {
    //   this.submitLoading = await this.loadingController.create({
    //     spinner: 'lines',
    //     // duration: loadTime,
    //     message: 'Please wait...',
    //     translucent: true,
    //     cssClass: 'custom-class custom-loading'
    //   });
    //   this.submitLoading.duration = loadTime;
    //   return await this.submitLoading.present();
    // });
  }

  public async hideLoading() {
    // if (this.submitLoading !== true) {
    //   this.submitLoading = await this.loadingController.dismiss();
    // }
  }

  // public async showLoading() {
  //   this.loadingStatus = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     spinner: 'lines',
  //     translucent: true,
  //     message: 'Please wait...',
  //   });
  //   await this.loadingStatus.present();
  // }

  // public async hideLoading() {
  //   const loadingExist = document.getElementsByTagName('ion-loading')[0];
  //   if (loadingExist) {
  //     await this.loadingStatus.dismiss();
  //   }
  // }
}
