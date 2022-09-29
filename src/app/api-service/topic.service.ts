import { Injectable } from '@angular/core';
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
    return this.db.collection('topic', ref =>
      ref.orderBy('createDate', 'desc')
    ).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }
  
  // public getTopic(): Observable<any> {
  //   return this.db.collection('topic').snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     })
  //     );
  // }

  public getTopicBySubject(subject?): Observable<any> {
    return this.db.collection('topic', ref =>
     {
      let query: any = ref;
      if (subject) {
        query = query.where('subject.name', '==', subject);
      }
      return query;
    }).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      })
      );
  }

  public getTopicByDocId(docId): Observable<any> {
    return this.db.collection('topic', ref => 
    ref.where('subject.docId' ,'==' , docId).orderBy('createDate', 'desc')
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
