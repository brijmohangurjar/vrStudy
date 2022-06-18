import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit, OnDestroy {

  public pageDetail = [];
  public pageDetailLoading = true;
  public loopForImageLoading = new Array(1);

  private pageId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDetailService: PageDetailService,
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.pageId = param.get('pageId');
      if (this.pageId) {
        this.getPageDetailByPageDocId(this.pageId);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageDetailByPageDocId(pageId: string): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.pageDetailService.getPageDetailByPageDocId(pageId)
        .subscribe((responseData: any) => {
          this.loadingService.hideLoading();
          if (responseData) {
            this.pageDetail = responseData;
          } else {
            this.pageDetail = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
          this.loadingService.hideLoading();
        })
    );
  }
}
