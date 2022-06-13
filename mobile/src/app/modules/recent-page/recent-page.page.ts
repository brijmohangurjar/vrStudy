import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.page.html',
  styleUrls: ['./recent-page.page.scss'],
})
export class RecentPagePage implements OnInit {

  public pageList = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private loadingService: LoadingService,
    private pageDetailService: PageDetailService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.getPageList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageList(): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.pageDetailService.getPageList()
        .subscribe((result: any) => {
          this.loadingService.hideLoading();
          if (result && result.length) {
            this.pageList = result;
          } else {
            this.pageList = [];
          }
        }, (error: HttpErrorResponse) => {
          this.loadingService.hideLoading();
          this.toastService.errorToast(error.message);
        })
    )
  }
}
