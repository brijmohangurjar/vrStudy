import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstantVariables } from 'src/const/constant';
import { BookService, LoginService, NoteService, PageDetailService, RecentShortService, TopicService } from './api-services';
import { CommonService, ToastService } from './service';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private updateModelOpen = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private toastService: ToastService,
    private topicService: TopicService,
    private commonService: CommonService,
    private pageDetailService: PageDetailService,
    private noteService: NoteService,
    private alertController: AlertController,
    private loginService: LoginService,
    private recentShortService: RecentShortService,
    private constantVariables: ConstantVariables,
  ) {
    this.getBookList();
    this.getAllTopicList();
    this.getAllPageList();
    this.getAllNoteList();
    this.getRecentShortList();
    this.checkAppVersion();
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

  private checkAppVersion(): void {
    this.subscriptions.push(
      this.loginService.getAppVersion()
        .subscribe((result: any) => {
          if (result && result.length) {
            if (result[0].currentVersion > this.constantVariables.appVersion
              && !this.updateModelOpen) {
              this.updateModelOpen = true;
              this.updatePopup(result[0].playStoreUrl);
            }
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private updatePopup(updateUrl: string): void {
    this.alertController.create({
      header: 'Update',
      message: 'Please Update App',
      backdropDismiss: false,
      buttons: [{
        text: 'Update',
        handler: () => {
          // App.exitApp();
          this.updateModelOpen = false;
          // const openCapacitorSite = async () => {
          Browser.open({ url: updateUrl });
          // };
        }
      }]
    }).then((alert: any) => {
      alert.present();
    });
  }
}
