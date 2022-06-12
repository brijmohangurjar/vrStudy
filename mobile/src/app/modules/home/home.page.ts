import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService, LoginService } from 'src/app/api-services';
import { DateService, ToastService } from 'src/app/service';

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
    // private navigationService: NavigationService,
  ) { }

  public ngOnInit() {
    this.greetingText = this.dateService.getTimeGreetings();
    this.getSubjectsList();
    this.getPageList();
    this.getShortList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public logOutUser(): void {
    this.loginService.logOutUser();
  }

  private getSubjectsList(): void {
    this.subscriptions.push(
      this.homeService.getSubjectList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.subjectList = result;
          }
        }, (error: HttpErrorResponse) => {
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
          }
        }, (error: HttpErrorResponse) => {
          this.toastService.errorToast(error.message);
        })
    )
  }

  private getShortList(): void {
    this.subscriptions.push(
      this.homeService.getShortList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.shortList = result;
          }
        }, (error: HttpErrorResponse) => {
          this.toastService.errorToast(error.message);
        })
    )
  }

  public clickOnSubject(item: any): void {
    console.log('item', item);
    // this.navigationService.navigateByRelativePath('subject', item.docId)
  }
}
