import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) { }

  public async logInUser(email: any, password: any): Promise<any> {
    try {
      // return this.angularFireAuth.setPersistence('none').then(_ => {
      return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        // eslint-disable-next-line arrow-body-style
        .then((logInResponse: any) => {
          return {
            status: 200,
            message: 'Logged in successfully.',
            data: logInResponse,
          };
        });
      // });
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  public async getUserByAuthIdWithPromise(uid: string): Promise<any> {
    try {
      // tslint:disable-next-line: max-line-length
      return this.angularFirestore.collection('Users', ref =>
        ref.where('uid', '==', uid)).get()
        .toPromise().then(res => {
          return res.docs.map(data => {
            const id = data.id;
            const info: any = data.data();
            // const userData: any = { docId: id, ...info };
            // this.userData = userData;
            return { docId: id, ...info };
          });
        });
    } catch (e) {
      return e;
    }
  }

  public logOutUser() {
    localStorage.clear();
    this.angularFireAuth.signOut();
  }
}
