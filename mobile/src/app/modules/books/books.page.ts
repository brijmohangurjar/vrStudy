import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/api-services';
import { CommonService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit, OnDestroy {

  public bookList = [];
  public bookListLoading = true;
  public loopForImageLoading = new Array(15);
  public originalData: any = [];
  public title = '';

  private topicId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private toastService: ToastService,
    private commonService: CommonService
  ) { }

  public ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.commonService.bookData.subscribe(res => {
      if(res){
        this.bookList = res;
        this.originalData = res;
        this.bookListLoading = false;
        this.title = `Book - (${this.bookList.length})` ;
      }

    });
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.topicId = param.get('topicId');
      if (this.topicId) {
        this.getBookListByTopicId(this.topicId);
      }
    });
  }

  ionViewWillLeave(){
    this.bookList = [];
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getBookListByTopicId(topicId: string): void {
    this.bookListLoading = true;
    this.subscriptions.push(
      this.bookService.getBookListByTopicId(topicId)
        .subscribe((responseData: any) => {
          this.bookListLoading = false;
          if (responseData.length) {
            this.bookList = responseData;
            this.originalData = responseData;
            this.title = `Book - (${this.bookList.length})` ;
          } else {
            this.bookList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.bookListLoading = false;
          this.toastService.errorToast(error.message);
        })
    );
  }

  public onChangeSearch(event) {
    const column = ['bookName'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(event, 'gi').test(row[key]));
    });
    this.bookList = searchList;
  }

  // private getBookList(): void {
  //   this.bookListLoading = true;
  //   this.subscriptions.push(
  //     this.bookService.getBookList()
  //       .subscribe((result: any) => {
  //         this.bookListLoading = false;
  //         if (result && result.length) {
  //           this.bookList = result;
  //           this.originalData = result;
  //         } else {
  //           this.bookList = [];
  //         }
  //       }, (error: HttpErrorResponse) => {
  //         this.bookListLoading = false;
  //         console.log('error', error);
  //         this.toastService.errorToast(error.message);
  //       })
  //   );
  // }
}
