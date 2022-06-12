import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingTimeSource = new BehaviorSubject(null);
  private submitLoading: any;
  private hideloadingTime = this.loadingTimeSource.asObservable();

  constructor(
    private loadingController: LoadingController,
  ) { }

  public async showLoading() {
    this.hideloadingTime.subscribe(async (loadTime: any) => {
      this.submitLoading = await this.loadingController.create({
        spinner: 'lines',
        // duration: loadTime,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      this.submitLoading.duration = loadTime;
      return await this.submitLoading.present();
    });
  }

  public async hideLoading() {
    if (this.submitLoading && this.submitLoading !== true) {
      this.submitLoading = await this.loadingController.dismiss();
    }
  }
}
