import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  LoginService,
  SubjectService,
} from 'src/app/api-services';
import {
  CommonService,
  DateService,
  NavigationService,
  ToastService,
} from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public subjectList = [];
  public pageList = [];
  public shortList = [];
  public bookList = [];
  public topicList = [];
  public noteList = [];
  public greetingText = '';
  public currentDate = new Date();
  public currentUserInfo: any;
  public subjectListLoading = true;
  public pageListLoading = true;
  public shortListLoading = true;
  public bookListLoading = true;
  public topicListLoading = true;
  public noteListLoading = true;

  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  };
  public loopForImageLoading = new Array(5);
  private subscriptions: Subscription[] = [];

  constructor(
    private dateService: DateService,
    private toastService: ToastService,
    private loginService: LoginService,
    private commonService: CommonService,
    private subjectService: SubjectService,
    private navigationService: NavigationService,
  ) { }

  public ngOnInit() {
    this.greetingText = this.dateService.getTimeGreetings();
    this.getSubjectsList();
    this.getPageList();
    this.getShortList();
    this.getBookList();
    this.getTopicList();
    this.getNoteList();
    this.getCurrentUserDetail();
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  sortFunc (a, b) {
    return b.createDate - a.createDate;
  }

  public logOutUser(): void {
    this.loginService.logOutUser();
  }

  public onClick(type: string): void {
    switch (type) {
      case 'subject':
        this.navigationService.navigateByUrl('base/home/subject');
        break;
      case 'recentPage':
        this.navigationService.navigateByUrl('base/home/recent-page');
        break;
      case 'recentShort':
        this.navigationService.navigateByUrl('base/home/short');
        break;
      case 'recentBook':
        this.navigationService.navigateByUrl('base/home/books');
        break;
      case 'recentTopic':
        this.navigationService.navigateByUrl('base/home/topic');
        break;
      case 'recentNote':
        this.navigationService.navigateByUrl('base/home/note');
        break;
    }
  }

  private getSubjectsList(): void {
    this.subjectListLoading = true;
    this.subscriptions.push(
      this.subjectService.getSubjectList()
        .subscribe((result: any) => {
          this.subjectListLoading = false;
          if (result && result.length) {
            this.subjectList = result;
          } else {
            this.subjectList = [];
          }
        }, (error: HttpErrorResponse) => {
          this.subjectListLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }


  private getPageList(): void {
    this.commonService.pageData.subscribe(res => {
      if(res){
        this.pageList = res;
        this.pageListLoading = false;
      }
    });
    // this.pageListLoading = true;
    // this.subscriptions.push(
    //   this.pageDetailService.getPageListByLimit()
    //     .subscribe((result: any) => {
    //       this.pageListLoading = false;
    //       if (result && result.length) {
    //         this.pageList = result;
    //       } else {
    //         this.pageList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.pageListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getShortList(): void {
    this.commonService.shortData.subscribe(res => {
      if(res) {
        this.shortList = res;
      }
      this.shortListLoading = false;
    });
    // this.shortListLoading = true;
    // this.subscriptions.push(
    //   this.shortDetailService.getShortListByLimit()
    //     .subscribe((result: any) => {
    //       this.shortListLoading = false;
    //       if (result && result.length) {
    //         this.shortList = result;
    //       } else {
    //         this.shortList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.shortListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getBookList(): void {
    this.commonService.bookData.subscribe(res => {
      if(res){
        this.bookList = res;
      }
      this.bookListLoading = false;
    });
    // this.bookListLoading = true;
    // this.subscriptions.push(
    //   this.bookService.getBookListByLimit()
    //     .subscribe((result: any) => {
    //       this.bookListLoading = false;
    //       if (result && result.length) {
    //         this.bookList = result;
    //       } else {
    //         this.bookList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.bookListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getTopicList(): void {
    this.commonService.topicData.subscribe(res => {
      if(res) {
        this.topicList = res;
        this.topicListLoading = false;
      }
    });
    // this.topicListLoading = true;
    // this.subscriptions.push(
    //   this.topicService.getAllTopicListByList()
    //     .subscribe((result: any) => {
    //       this.topicListLoading = false;
    //       if (result && result.length) {
    //         this.topicList = result;
    //       } else {
    //         this.topicList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.topicListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getNoteList(): void {
    this.commonService.noteData.subscribe(res => {
      if(res) {
        this.noteList = res;
        this.noteListLoading = false;
      }
    });
    // this.noteListLoading = true;
    // this.subscriptions.push(
    //   this.noteService.getNoteListByLimit()
    //     .subscribe((result: any) => {
    //       console.log('result', result);
    //       this.noteListLoading = false;
    //       if (result && result.length) {
    //         this.noteList = result;
    //       } else {
    //         this.noteList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.noteListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getCurrentUserDetail(): void {
    this.subscriptions.push(
      this.commonService.userProfileData
        .subscribe((result: any) => {
          if (result) {
            this.currentUserInfo = result;
          } else {
            this.currentUserInfo = null;
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
