import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookService, LoginService, NoteService, PageDetailService, RecentShortService, TopicService } from 'src/app/api-services';
import { ConstantVariables } from 'src/const/constant';
import { SplashScreen } from '@capacitor/splash-screen';
import { Share } from '@capacitor/share';
import { App } from '@capacitor/app';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
})
export class BasePage implements OnInit {

  public activeIndex = 0;
  public userInfo: any;
  public defaultUserPic = '/assets/images/user_profile.jpg';
  public sideMenuList: any = [
    {
      id: 0,
      title: 'Home',
      url: '/base',
      icon: 'home-outline',
    },
    {
      id: 1,
      title: 'Subject',
      url: '/base/home/subject',
      icon: 'clipboard-outline',
    },
    {
      id: 2,
      title: 'Topic',
      url: '/base/home/topic',
      icon: 'receipt-outline',
    },
    {
      id: 3,
      title: 'Book',
      url: '/base/home/books',
      icon: 'book-outline',
    },
    {
      id: 4,
      title: 'Page',
      url: '/base/home/recent-page',
      icon: 'reader-outline',
    },
    {
      id: 6,
      title: 'Note',
      url: '/base/home/note',
      icon: 'bookmarks-outline',
    },
    {
      id: 5,
      title: 'Short',
      url: '/base/home/short',
      icon: 'card-outline',
    },
    {
      id: 8,
      title: 'Share',
      url: null,
      icon: 'share-social-outline',
    },
    {
      id: 10,
      title: 'Logout',
      url: null,
      icon: 'log-out-outline',
    }
  ];

  private openConfirmationPopup = true;
  private subscriptions: Subscription[] = [];
  private updateModelOpen = false;
  private appRelatedInfo: any;

  constructor(
    public constVar: ConstantVariables,
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private location: Location,
    private loginService: LoginService,
    private bookService: BookService,
    private toastService: ToastService,
    private topicService: TopicService,
    private commonService: CommonService,
    private pageDetailService: PageDetailService,
    private noteService: NoteService,
    private recentShortService: RecentShortService,
  ) {
    this.initializeApp();
    this.getBookList();
    this.getAllTopicList();
    this.getAllPageList();
    this.getAllNoteList();
    this.getRecentShortList();
    this.checkAppVersion();
  }

  public ngOnInit() {
    this.getCurrentUserDetail();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        if (this.location.isCurrentPathEqualTo('/base/home')
          || this.location.isCurrentPathEqualTo('/login')
        ) {
          if (this.openConfirmationPopup) {
            this.openConfirmationPopup = false;
            this.showExitConfirm();
          }
          processNextHandler();
        } else {
          this.openConfirmationPopup = true;
          this.location.back();
        }
      });
    });
  }

  public ionViewDidLeave(): void {
    this.subscriptions.forEach((sub) => {
      if (sub && !sub.closed) { sub.unsubscribe(); }
    });
  }

  public navigateTo(item: any): void {
    this.router.navigate([item.url]);
  }

  public navigateBySidemenu(active: any, index?: number): void {
    // this.selectedIndex = index;
    switch (active.title) {
      case 'Logout':
        this.loginService.logOutUser();
        break;
      case 'Share':
        this.openSharePopup();
        break;
      case 'Help':
        this.helpComponent();
        break;
      // default:
      //   this.router.navigate([active.url]);
      //   break;
    }
  }

  private async helpComponent(): Promise<any> {
    const modal = await this.modalController.create({
      component: 'HelpPage',
      componentProps: {}
    });
    return await modal.present();
  }

  private async openSharePopup() {
    await Share.share({
      title: 'Share VrStudy',
      text: 'Share VrStudy',
      url: this.appRelatedInfo.shareUrl,
      dialogTitle: 'Share VrStudy'
    });
  }


  private showExitConfirm(): void {
    this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to exit the app?',
      // mode: 'ios',
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.openConfirmationPopup = true;
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          App.exitApp();
        }
      }]
    }).then((alert: any) => {
      alert.present();
    });
  }

  private getCurrentUserDetail(): void {
    this.subscriptions.push(
      this.loginService.getUserData()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.userInfo = result[0];
            this.commonService.updateUserInfoObs(this.userInfo);
          } else {
            this.userInfo = null;
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getBookList(): void {
    this.subscriptions.push(
      this.bookService.getBookList()
        .subscribe((result: any) => {
          this.commonService.updareBookDate(result);

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
          this.commonService.updarePageDate(result);
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
            this.appRelatedInfo = result[0];
            if (result[0].currentVersion > this.constVar.appVersion
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
      header: 'New Update Available',
      message: 'Please Update Now',
      backdropDismiss: false,
      buttons: [{
        text: 'Update',
        handler: () => {
          this.updateModelOpen = false;
          App.exitApp();
          // const openCapacitorSite = async () => {
          // Browser.open({ url: updateUrl });
          // };
        }
      }]
    }).then((alert: any) => {
      alert.present();
    });
  }
}
