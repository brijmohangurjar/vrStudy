import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  public currentUserInfo: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private toastService: ToastService,
    private commonService: CommonService,
  ) { }

  public ngOnInit() {
    this.getCurrentUserDetail();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
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
