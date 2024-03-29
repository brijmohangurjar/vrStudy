import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(
    private db: AngularFirestore,
  ) { }



  public addBook(credential: any): Observable<any> {
    const obj = new Observable((observer) => {
      this.db.collection('book').add(credential).then((response) => {
        observer.next({
          status: 200,
          message: 'Book added successfuly.',
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

  deleteBook(docId: string): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('book').doc(docId).delete().then(async () => {
        observer.next({
          message: 'Book Delete Successfuly.',
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
  public getBook(): Observable<any> {
    return this.db.collection('book', ref =>
      ref.orderBy('createDate', 'desc')).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }
  
  // public getBook(): Observable<any> {
  //   return this.db.collection('book').snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     })
  //     );
  // }

  public getBookByTopic(topic?): Observable<any> {
    return this.db.collection('book', ref =>
     {
      let query: any = ref;
      if (topic) {
        query = query.where('topic.topicName', '==', topic);
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

  public getBookByDocId(docId): Observable<any> {
    return this.db.collection('book', ref => 
    ref.where('topic.docId' ,'==' , docId ).orderBy('createDate', 'desc')).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      })
      );
  }


  editBook(id: string, data: any, ): Observable<any> {
    const obs = new Observable((observer) => {
      this.db.collection('book').doc(id).update(data).then(async (response) => {
        observer.next({
          message: 'Book Update Successfuly.',
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
