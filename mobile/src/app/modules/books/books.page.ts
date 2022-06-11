import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/api-services';

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
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      console.log('param', param);
      this.topicId = param.get('topicId');
      console.log('this.topicId', this.topicId);
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
    this.subscriptions.push(
      this.bookService.getBookListByTopicId(topicId)
        .subscribe((responseData: any) => {
          console.log('responseData', responseData);
          if (responseData.length) {
            this.bookList = responseData;
          } else {
            this.bookList = [];
          }
        })
    );
  }
}
