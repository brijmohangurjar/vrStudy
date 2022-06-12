import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService, LoginService } from 'src/app/api-services';
import { DateService, LoadingService, NavigationService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public subjectList = [];
  public pageList = [];
  public shortList = [];
  public greetingText = '';
  public currentDate = new Date();

  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  };
  private subscriptions: Subscription[] = [];

  constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private homeService: HomeService,
    private dateService: DateService,
    private loadingService: LoadingService,
    private navigationService: NavigationService,
  ) { }

  public ngOnInit() {
    this.greetingText = this.dateService.getTimeGreetings();
    this.getSubjectsList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public logOutUser(): void {
    this.loginService.logOutUser();
  }

  public onClick(type: string): void {
    switch (type) {
      case 'subject':
        this.navigationService.navigateByUrl('subject');
        break;
      case 'recentPage':
        this.navigationService.navigateByUrl('recent-page');
        break;
      case 'recentShort':
        this.navigationService.navigateByUrl('recent-short');
        break;
    }
  }

  private getSubjectsList(): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.homeService.getSubjectList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.subjectList = result;
            this.getPageList();
          } else {
            this.getPageList();
          }
        }, (error: HttpErrorResponse) => {
          this.getPageList();
          this.toastService.errorToast(error.message);
        })
    )
  }


  private getPageList(): void {
    this.subscriptions.push(
      this.homeService.getPageList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.pageList = result;
            this.getShortList();
          } else {
            this.getShortList();
          }
        }, (error: HttpErrorResponse) => {
          this.getShortList();
          this.toastService.errorToast(error.message);
        })
    )
  }

  private getShortList(): void {
    this.subscriptions.push(
      this.homeService.getShortList()
        .subscribe((result: any) => {
          this.loadingService.hideLoading();
          if (result && result.length) {
            this.shortList = result;
          }
        }, (error: HttpErrorResponse) => {
          this.loadingService.hideLoading();
          this.toastService.errorToast(error.message);
        })
    )
  }
}
