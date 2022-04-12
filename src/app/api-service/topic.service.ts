import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private db: AngularFirestore,
  ) { }



  public addTopic(credential: any): Observable<any> {
    const obj = new Observable((observer) => {
      this.db.collection('topic').add(credential).then((response) => {
        observer.next({
          status: 200,
          message: 'Topic added successfuly.',
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

  deleteTopic(docId: string): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('topic').doc(docId).delete().then(async () => {
        observer.next({
          message: 'Topic Delete Successfuly.',
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

  
  public getTopic(): Observable<any> {
    return this.db.collection('topic').snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      })
      );
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

  // public getCategoryByDocId(): Observable<any> {
  //   const docId = this.shopkeeperService.userData ? this.shopkeeperService.userData.shopType.docId : '';
  //   return this.db.collection('category', ref => 
  //   ref.where('shopCategory.docId' ,'==' , docId )
  //   ).snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     })
  //     );
  // }


  editTopic(id: string, data: any, ): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('topic').doc(id).update(data).then(async (response) => {
        observer.next({
          message: 'Topic Update Successfuly.',
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
