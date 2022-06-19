import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecentShortService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-recent-short',
  templateUrl: './recent-short.page.html',
  styleUrls: ['./recent-short.page.scss'],
})
export class RecentShortPage implements OnInit, OnDestroy {

  public recentShort = [];
  public recentShortLoading = true;
  public loopForImageLoading = new Array(15);

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private recentShortService: RecentShortService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      console.log('param', param);
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getShortListByBookId(this.bookId);
      } else {
        this.getRecentShortList();
      }
    });
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getRecentShortList(): void {
    this.recentShortLoading = true;
    this.subscriptions.push(
      this.recentShortService.getRecentShortList()
        .subscribe((result: any) => {
          this.recentShortLoading = false;
          if (result && result.length) {
            this.recentShort = result;
          } else {
            this.recentShort = [];
          }
        }, (error: HttpErrorResponse) => {
          this.recentShortLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getShortListByBookId(bookId: string): void {
    this.recentShortLoading = true;
    this.subscriptions.push(
      this.recentShortService.getShortListByBookId(bookId)
        .subscribe((result: any) => {
          this.recentShortLoading = false;
          if (result && result.length) {
            this.recentShort = result;
          } else {
            this.recentShort = [];
          }
        }, (error: HttpErrorResponse) => {
          this.recentShortLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
