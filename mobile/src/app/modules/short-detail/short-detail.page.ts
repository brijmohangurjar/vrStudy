import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShortDetailService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-short-detail',
  templateUrl: './short-detail.page.html',
  styleUrls: ['./short-detail.page.scss'],
})
export class ShortDetailPage implements OnInit, OnDestroy {

  public shortDetail: any;

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private shortDetailService: ShortDetailService,
    private loadingService: LoadingService,
    private toastService: ToastService,
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
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageDetailByBookId(bookId: string): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.shortDetailService.getShortDetailByBookId(bookId)
        .subscribe((responseData: any) => {
          this.loadingService.hideLoading();
          if (responseData.length) {
            this.shortDetail = responseData[0];
          } else {
            this.shortDetail = null;
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
          this.loadingService.hideLoading();
        })
    );
  }
}