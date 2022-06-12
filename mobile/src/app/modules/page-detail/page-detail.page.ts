import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit {

  public pageDetail = [];

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDetailService: PageDetailService,
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
    this.subscriptions.push(
      this.pageDetailService.getPageDetailByBookId(bookId)
        .subscribe((responseData: any) => {
          if (responseData.length) {
            this.pageDetail = responseData[0];
          } else {
            this.pageDetail = [];
          }
        })
    );
  }
}
