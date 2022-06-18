import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.page.html',
  styleUrls: ['./recent-page.page.scss'],
})
export class RecentPagePage implements OnInit, OnDestroy {

  public pageList = [];
  public recentPageLoading = true;
  public loopForImageLoading = new Array(15);

  private subscriptions: Subscription[] = [];

  constructor(
    private pageDetailService: PageDetailService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.getAllPageList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getAllPageList(): void {
    this.recentPageLoading = true;
    this.subscriptions.push(
      this.pageDetailService.getAllPageList()
        .subscribe((result: any) => {
          this.recentPageLoading = false;
          if (result && result.length) {
            this.pageList = result;
          } else {
            this.pageList = [];
          }
        }, (error: HttpErrorResponse) => {
          this.recentPageLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
