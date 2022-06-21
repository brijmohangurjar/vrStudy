import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShortDetailService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-short-detail',
  templateUrl: './short-detail.page.html',
  styleUrls: ['./short-detail.page.scss'],
})
export class ShortDetailPage implements OnInit, OnDestroy {

  public shortDetail = [];
  public shortDetailLoading = true;
  public loopForImageLoading = new Array(1);

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private shortDetailService: ShortDetailService,
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
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageDetailByBookId(bookId: string): void {
    this.shortDetailLoading = true;
    this.subscriptions.push(
      this.shortDetailService.getShortDetailByShortDocId(bookId)
        .subscribe((responseData: any) => {
          console.log('responseData', responseData);
          this.shortDetailLoading = false;
          if (responseData) {
            this.shortDetail = responseData;
          }
        }, (error: HttpErrorResponse) => {
          this.shortDetailLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
