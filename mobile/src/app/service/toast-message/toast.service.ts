import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConstantVariables } from 'src/const/constant';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toastController: ToastController,
    private constVar: ConstantVariables,
  ) { }

  public async successToast(message: any) {
    const toast = await this.toastController.create({
      message: `${message}`,
      color: this.constVar.TOAST_MESSAGE_COLOR.SUCCESS,
      duration: 3000,
      cssClass: 'toastGlobal'
    });
    toast.present();
  }

  public async errorToast(message: any) {
    const toast = await this.toastController.create({
      message: `${message}`,
      color: this.constVar.TOAST_MESSAGE_COLOR.ERROR,
      duration: 3000,
      cssClass: 'toastGlobal'
    });
    toast.present();
  }
}
