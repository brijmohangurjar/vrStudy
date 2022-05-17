import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }


  public async sendForgotPasswordLink(email: any): Promise<any> {
    try {
      return await this.angularFireAuth.sendPasswordResetEmail(email)
        // eslint-disable-next-line arrow-body-style
        .then((responseData: any) => {
          return {
            status: 200,
            message: 'Link send successfully, check your email.',
            data: responseData,
          };
        });
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
