import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ConstantVariables } from 'src/const/constant';

@Injectable({
  providedIn: 'root'
})
export class PageDetailService {

  constructor(
    // private angularFirestore: AngularFirestore,
    // private constVar: ConstantVariables,
    private http: HttpClient
  ) { }

  public getAllPageList(): Observable<any> {
    return this.http.get<any>('assets/data/pageList.json');

    // return this.angularFirestore.collection('page', ref =>
    //   ref.orderBy('createDate', 'asc').limit(this.constVar.limit)).snapshotChanges()
    //   .pipe(map((actions) => actions.map(doc => {
    //     const data: any = doc.payload.doc.data();
    //     const docId = doc.payload.doc.id;
    //     return { docId, ...data };
    //   })
    //   ));
  }

  
  // public getPageListByLimit(): Observable<any> {
  //   return this.angularFirestore.collection('page', ref =>
  //     ref.orderBy('createDate', 'asc')).snapshotChanges()
  //     .pipe(map((actions) => actions.map(doc => {
  //       const data: any = doc.payload.doc.data();
  //       const docId = doc.payload.doc.id;
  //       return { docId, ...data };
  //     })
  //     ));
  // }

  // public getPageDetailByPageDocId(pageId: string): Observable<any> {
  //   return this.angularFirestore.collection('page').doc(pageId)
  //     .snapshotChanges()
  //     .pipe(map((actions) => {
  //       const data: any = actions.payload.data();
  //       const docId = actions.payload.id;
  //       return { docId, ...data };
  //     }
  //     ));
  // }

  // public getPageListByBookId(bookId: string): Observable<any> {
  //   return this.angularFirestore.collection('page', ref =>
  //     ref.where('book.docId', '==', bookId).orderBy('createDate', 'asc').limit(this.constVar.limit))
  //     .snapshotChanges()
  //     .pipe(map((actions) => actions.map(doc => {
  //       const data: any = doc.payload.doc.data();
  //       const docId = doc.payload.doc.id;
  //       return { docId, ...data };
  //     })
  //     ));
  // }
}
