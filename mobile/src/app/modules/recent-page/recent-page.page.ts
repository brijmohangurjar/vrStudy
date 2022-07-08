import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.page.html',
  styleUrls: ['./recent-page.page.scss'],
})
export class RecentPagePage implements OnInit, OnDestroy {

  public pageList = [];
  public recentPageLoading = true;
  public loopForImageLoading = new Array(15);
  public originalData:any = [];

  private subscriptions: Subscription[] = [];
  public title = '';

  constructor(
    private commonService: CommonService
  ) { }

  public ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllPageList();
  }

  ionViewWillLeave() {
    this.pageList = [];
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getAllPageList(): void {
    this.commonService.pageData.subscribe(res => {
      if(res) {
        this.pageList = res;
        this.originalData = res;
        this.recentPageLoading = false;
        this.title = `Page - (${this.pageList.length})`;
      }
    });
    // this.recentPageLoading = true;
    // this.subscriptions.push(
    //   this.pageDetailService.getAllPageList()
    //     .subscribe((result: any) => {
    //       this.recentPageLoading = false;
    //       if (result && result.length) {
    //         this.pageList = result;
    //         this.originalData = result;
    //       } else {
    //         this.pageList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.recentPageLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }
  
  public onChangeSearch(event) {
    const column = ['heading'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(event, 'gi').test(row[key]));
    });
    this.pageList = searchList;
  }
}
