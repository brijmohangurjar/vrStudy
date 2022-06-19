import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/api-services';
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
      id: 5,
      title: 'Short',
      url: '/base/home/recent-short',
      icon: 'filter-outline',
    },
    // {
    //   id: 7,
    //   title: 'Profile',
    //   url: '/base/profile',
    //   icon: 'person-outline',
    // },
    {
      id: 8,
      title: 'Share',
      url: null,
      icon: 'share-social-outline',
    },
    // {
    //   id: 9,
    //   title: 'Help',
    //   url: null,
    //   icon: 'help-circle-outline',
    // },
    {
      id: 10,
      title: 'Logout',
      url: null,
      icon: 'log-out-outline',
    }
  ];

  private openConfirmationPopup = true;
  private subscriptions: Subscription[] = [];

  constructor(
    public constVar: ConstantVariables,
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private location: Location,
    private loginService: LoginService,
    private toastService: ToastService,
    private commonService: CommonService,
  ) {
    this.initializeApp();
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
        if (this.location.isCurrentPathEqualTo('/home')
          || this.location.isCurrentPathEqualTo('/home/ready-for-delivery')
          || this.location.isCurrentPathEqualTo('/login')
          || this.location.isCurrentPathEqualTo('/registration')
          || this.location.isCurrentPathEqualTo('/forgot-password')
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
      title: 'Share Vr Study',
      text: 'Check',
      // url: 'https://onlineKirana.app',
      dialogTitle: 'Share Vr Study'
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
}
