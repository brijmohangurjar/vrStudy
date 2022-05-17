import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ForgotPasswordService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';
import { ConstantVariables } from 'src/const/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public submitLoading = false;
  public errorMessage: any;
  public forgotPasswordForm: FormGroup | any;

  private subscriptions: Subscription[] = [];

  constructor(
    public constVar: ConstantVariables,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastService: ToastService,
    private forgotPasswordService: ForgotPasswordService,
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public ionViewWillEnter(): void {
  }

  public ionViewDidLeave(): void {
    this.subscriptions.forEach((sub) => {
      if (sub && !sub.closed) { sub.unsubscribe(); }
    });
  }

  public sendForgotPasswordLink(event: any): void {
    if (this.forgotPasswordForm.value.email) {
      this.submitLoading = true;
      this.forgotPasswordService.sendForgotPasswordLink(
        this.forgotPasswordForm.value.email.toLowerCase()
      ).then((responseData: any) => {
        this.submitLoading = false;
        if (responseData.status === 200) {
          this.forgotPasswordForm.reset();
          this.sendEmailAlert(responseData.message);
        } else {
          this.toastService.errorToast(responseData.message);
          this.errorMessage = responseData.message;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
        this.submitLoading = false;
        console.log('error', error);
        this.errorMessage = error.message;
      });
    }
  }

  private createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.forgotPasswordForm.valueChanges.subscribe((res: any) => {
      if (res) { this.errorMessage = null; }
    });
  }

  private async sendEmailAlert(msg: string) {
    const alert = await this.alertController.create({
      // header: `${this.constVar.confirmMessageTitle}`,
      message: `${msg}`,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: () => { }
        // },
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
