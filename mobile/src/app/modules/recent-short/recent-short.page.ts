import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecentShortService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-recent-short',
  templateUrl: './recent-short.page.html',
  styleUrls: ['./recent-short.page.scss'],
})
export class RecentShortPage implements OnInit, OnDestroy {

  public recentShort = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private loadingService: LoadingService,
    private recentShortService: RecentShortService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.getRecentShortList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getRecentShortList(): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.recentShortService.getRecentShortList()
        .subscribe((result: any) => {
          this.loadingService.hideLoading();
          if (result && result.length) {
            this.recentShort = result;
          } else {
            this.recentShort = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.loadingService.hideLoading();
          this.toastService.errorToast(error.message);
        })
    );
  }
}
