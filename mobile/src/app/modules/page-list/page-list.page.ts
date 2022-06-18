import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.page.html',
  styleUrls: ['./page-list.page.scss'],
})
export class PageListPage implements OnInit, OnDestroy {

  public pageList = [];
  public pageListLoading = true;
  public loopForImageLoading = new Array(15);

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private pageDetailService: PageDetailService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      console.log('param', param);
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getPageListByBookId(this.bookId);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getPageListByBookId(bookId: string): void {
    this.pageListLoading = true;
    this.subscriptions.push(
      this.pageDetailService.getPageListByBookId(bookId)
        .subscribe((responseData: any) => {
          this.pageListLoading = false;
          if (responseData.length) {
            this.pageList = responseData;
          } else {
            this.pageList = [];
          }
        }, (error: HttpErrorResponse) => {
          this.pageListLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
