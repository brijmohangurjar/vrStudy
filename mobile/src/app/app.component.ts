import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService, NoteService, PageDetailService, RecentShortService, TopicService } from './api-services';
import { CommonService, ToastService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private toastService: ToastService,
    private topicService: TopicService,
    private commonService: CommonService,
    private pageDetailService: PageDetailService,
    private noteService: NoteService,
    private recentShortService: RecentShortService
    ) {
      this.getBookList();
      this.getAllTopicList();
      this.getAllPageList();
      this.getAllNoteList();
      this.getRecentShortList();
    }

  private getBookList(): void {
    this.subscriptions.push(
      this.bookService.getBookList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.commonService.updareBookDate(result);
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  
  private getAllTopicList(): void {
    this.subscriptions.push(
      this.topicService.getAllTopicList()
        .subscribe((responseData: any) => {
          this.commonService.updareTopicDate(responseData);
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getAllPageList(): void {
    this.subscriptions.push(
      this.pageDetailService.getAllPageList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.commonService.updarePageDate(result);
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getAllNoteList(): void {
    this.subscriptions.push(
      this.noteService.getAllNoteList()
        .subscribe((result: any) => {
          this.commonService.updareNoteDate(result);
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getRecentShortList(): void {
    this.subscriptions.push(
      this.recentShortService.getRecentShortList()
        .subscribe((result: any) => {
          this.commonService.updareShortDate(result);
        
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

}
