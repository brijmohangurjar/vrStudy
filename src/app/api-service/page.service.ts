import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private db: AngularFirestore,
  ) { }



  public addPage(credential: any): Observable<any> {
    const obj = new Observable((observer) => {
      this.db.collection('page').add(credential).then((response) => {
        observer.next({
          status: 200,
          message: 'Page added successfuly.',
          id: response.id
        });
      }).catch((error) => {
        console.error('error', error);
        observer.next({
          message: error.message ? error.message : 'There is some issue...',
          status: error.code ? error.code : 400,
        });
      });
    });
    return obj;
  }

  deletePage(docId: string): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('page').doc(docId).delete().then(async () => {
        observer.next({
          message: 'Page Delete Successfuly.',
          status: 200,
        });
      }).catch((error) => {
        observer.next({
          message: error.Error,
          status: 500,
        });
      });
    });
    return obs;
  }

  
  public getPage(): Observable<any> {
    return this.db.collection('page').snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      })
      );
  }

  public async uploadUserImage(photo: any,tableName:string,fileName?:any) {
    const milliSecond = new Date().getTime();
    const selfieRef = await firebase.default.storage().ref(`${tableName}/${milliSecond}`);
    // UPDLOAD USER PROFILE PHOTO IN FIREBASE STORAGE
    return selfieRef.putString(photo, 'base64', { contentType: 'image/jpeg' })
      .then(async savedProfilePhoto => {
        // GER DOWNLOAD URL FROM FIRBASE STORAGE OF PROFILE PHOTO
        return savedProfilePhoto.task.snapshot.ref.getDownloadURL()
          .then(async downloadURL => {
            // UPDATE USER PROFILE PHOTO IN FIRBASE DATABASE
            photo = downloadURL;
            // const data = { photoURL: downloadURL };
            // if (downloadURL) {
            //   this.angularFireStorage.storage.refFromURL(this.userData.photoURL)
            //   .delete().then((res: any) => {});
            // }
            return downloadURL
          });
      });
  }

  // public getCategoryByDocId(): Observable<any> {
  //   return this.db.collection('category', ref =>
  //    {
  //     let query: any = ref;
  //     if (this.shopkeeperService.userData && this.shopkeeperService.userData.userType == 'ShopKeeper') {
  //       query = query.where('shopCategory.docId', '==', this.shopkeeperService.userData.shop_type.docId);
  //     }
  //     return query;
  //   }).snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     })
  //     );
  // }

  public getPageByDocId(docId): Observable<any> {
    return this.db.collection('page', ref => 
    ref.where('book.docId' ,'==' , docId )
    ).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      })
      );
  }


  editPage(id: string, data: any, ): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('page').doc(id).update(data).then(async (response) => {
        observer.next({
          message: 'Page Update Successfuly.',
          status: 200,
          data: response
        });
      }).catch((error) => {
        observer.next({
          message: error,
          status: 500,
        });
      });
    });
    return obs;
  }

}
