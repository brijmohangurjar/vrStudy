import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/api-services';
import { ConstantVariables } from 'src/const/constant';
import { SplashScreen } from '@capacitor/splash-screen';
import { Share } from '@capacitor/share';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
})
export class BasePage implements OnInit {

  public userInfo: any;
  public defaultUserPic = '/assets/images/user_profile.jpg';
  private openConfirmationPopup = true;
  private subscriptions: Subscription[] = [];
  public sideMenuList: any = [
    {
      id: 0,
      title: 'Home',
      url: '/home',
      icon: 'home-outline',
    },
    {
      id: 1,
      title: 'Subject',
      url: '/home/subject',
      icon: 'book-outline',
    },
    {
      id: 2,
      title: 'Topic',
      url: '/home/topic',
      icon: 'bookmark-outline',
    },
    {
      id: 3,
      title: 'Book',
      url: '/home/book',
      icon: 'person-outline',
    },
    {
      id: 4,
      title: 'Page',
      url: '/home/page',
      icon: 'person-outline',
    },
    {
      id: 5,
      title: 'Short',
      url: '/home/short',
      icon: 'person-outline',
    },
    {
      id: 6,
      title: 'Current',
      url: '/home/current',
      icon: 'person-outline',
    },
    {
      id: 7,
      title: 'Profile',
      url: '/home/profile',
      icon: 'person-outline',
    },
    {
      id: 8,
      title: 'Share',
      url: null,
      icon: 'share-social-outline',
    },
    {
      id: 9,
      title: 'Help',
      url: null,
      icon: 'help-circle-outline',
    },
    {
      id: 10,
      title: 'Logout',
      url: null,
      icon: 'log-out-outline',
    }
  ];

  constructor(
    public constVar: ConstantVariables,
    private platform: Platform,
    private router: Router,
    // private commonService: CommonService,
    // private changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController,
    // private authService: AuthService,
    private routerOutlet: IonRouterOutlet,
    private alertController: AlertController,
    private location: Location,
    private loginService: LoginService,
  ) {
    this.initializeApp();
  }

  public ngOnInit() {
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        console.log('this.location.', this.location.path())
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
    const shareRet = await Share.share({
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
}
