import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageDetailService {

  constructor(
    private angularFirestore: AngularFirestore,
    // private constVar: ConstantVariables,
  ) { }

  public getPageList(): Observable<any> {
    return this.angularFirestore.collection('page', ref =>
      ref.orderBy('createDate', 'desc')).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }

  public getPageDetailByBookId(subjectId: string): Observable<any> {
    return this.angularFirestore.collection('page', ref =>
      ref.where('book.docId', '==', subjectId).orderBy('createDate', 'desc'))
      .snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }
}
