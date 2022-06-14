import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  public bookList = [];

  private topicId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.topicId = param.get('topicId');
      if (this.topicId) {
        this.getBookListByTopicId(this.topicId);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getBookListByTopicId(topicId: string): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.bookService.getBookListByTopicId(topicId)
        .subscribe((responseData: any) => {
          this.loadingService.hideLoading();
          if (responseData.length) {
            this.bookList = responseData;
          } else {
            this.bookList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error)
          this.toastService.errorToast(error.message);
          this.loadingService.hideLoading();
        })
    );
  }
}
