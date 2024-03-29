import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public currentUser: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
  }
  public async logInUser(email: any, password: any): Promise<any> {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then((logInResponse: any) => {
          return {
            status: 200,
            message: 'Logged in successfully.',
            data: logInResponse,
          };
        });
    } catch (error:any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  public logOutUser(): Promise<any> {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    return this.angularFireAuth.signOut();
  }

  public async sendForgotPasswordLink(email: any): Promise<any> {
    try {
      return await this.angularFireAuth.sendPasswordResetEmail(email)
        .then((responseData: any) => {
          return {
            status: 200,
            message: 'Link send successfully, check your email.',
            data: responseData,
          };
        });
    } catch (error:any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }


  public getAppVersion(): Observable<any> {
    return this.db.collection('appVersion')
      .snapshotChanges()
      .pipe(map((actions) => actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      })
      ));
  }

}
