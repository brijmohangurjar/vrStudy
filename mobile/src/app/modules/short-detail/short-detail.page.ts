import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RecentShortService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';
import { ViewImageComponent } from '../shared-module/view-image/view-image.component';

@Component({
  selector: 'app-short-detail',
  templateUrl: './short-detail.page.html',
  styleUrls: ['./short-detail.page.scss'],
})
export class ShortDetailPage implements OnInit, OnDestroy {

  public shortDetail;
  public shortDetailLoading = true;
  public loopForImageLoading = new Array(1);

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    // private shortDetailService: ShortDetailService,
    private toastService: ToastService,
    private popoverCtrl: PopoverController,
    private recentShortService: RecentShortService
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getPageDetailByBookId(this.bookId);
      }
    });
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageDetailByBookId(bookId: string): void {
    this.shortDetailLoading = true;
    this.subscriptions.push(
      this.recentShortService.getRecentShortList()
        .subscribe((responseData: any) => {
          this.shortDetailLoading = false;
          if(responseData && responseData.length){
            const result = responseData.find(res => res?.docId == bookId);
            this.shortDetail = result ? result : null;
            // this.originalData = result && result.length ? result : [];;
          }
          // if (responseData) {
          //   this.shortDetail = responseData;
          // }
        }, (error: HttpErrorResponse) => {
          this.shortDetailLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  
  public async viewImage(data: any): Promise<any> {
    const popover = await this.popoverCtrl.create({
      component: ViewImageComponent,
      mode: 'ios',
      componentProps: {
        product: data,
        showOffer: false
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
    });
    return await popover.present();
  }
}
