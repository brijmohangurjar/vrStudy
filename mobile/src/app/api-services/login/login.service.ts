import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserUid: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
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
    this.currentUserUid = uid;
    try {
      // tslint:disable-next-line: max-line-length
      return this.angularFirestore.collection('Users', ref =>
        ref.where('uid', '==', uid)).get()
        .toPromise().then(res => res.docs.map(data => {
          const id = data.id;
          const info: any = data.data();
          // const userData: any = { docId: id, ...info };
          // this.userData = userData;
          return { docId: id, ...info };
        }));
    } catch (e) {
      return e;
    }
  }

  public logOutUser() {
    localStorage.clear();
    this.currentUserUid = null;
    this.angularFireAuth.signOut();
    this.router.navigate(['login']);
  }

  public getUserData() {
    if (this.currentUserUid) {
      const uid = this.currentUserUid;
      return this.angularFirestore.collection
        ('Users', ref => ref.where('uid', '==', uid))
        .snapshotChanges()
        .pipe(map((actions) => actions.map(doc => {
          const data: any = doc.payload.doc.data();
          data.docId = doc.payload.doc.id;
          return data;
        }))
        );
    } else {
      return of();
    }
  }
}
