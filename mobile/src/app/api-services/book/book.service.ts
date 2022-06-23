import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private angularFirestore: AngularFirestore,
    // private constVar: ConstantVariables,
  ) { }

  public getBookList(): Observable<any> {
    return this.angularFirestore.collection('book', ref =>
      ref.orderBy('createDate', 'asc')).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }

  // public getBookListByLimit(): Observable<any> {
  //   return this.angularFirestore.collection('book', ref =>
  //     ref.orderBy('createDate', 'asc')).snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     }));
  // }

  public getBookListByTopicId(subjectId: string): Observable<any> {
    return this.angularFirestore.collection('book', ref =>
      ref.where('topic.docId', '==', subjectId)
        .orderBy('createDate', 'asc')).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }
}
