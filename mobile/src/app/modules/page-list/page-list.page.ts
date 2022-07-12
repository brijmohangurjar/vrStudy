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
  public originalData:any = [];

  private bookId: string;
  private subscriptions: Subscription[] = [];
  public title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private pageDetailService: PageDetailService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getPageListByBookId(this.bookId);
      }
    });
  }


  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
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
          this.pageList = responseData;
          this.originalData = responseData;
          this.title = `Page - (${this.pageList.length})`;
        }, (error: HttpErrorResponse) => {
          this.pageListLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  public onChangeSearch(event) {
    const column = ['heading'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(event, 'gi').test(row[key]));
    });
    this.pageList = searchList;
  }

}
