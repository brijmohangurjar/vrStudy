import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecentShortService {

  constructor(
    // private angularFirestore: AngularFirestore,
    private http: HttpClient
  ) { }

  public getRecentShortList(): Observable<any> {
    return this.http.get<any>('assets/data/shortList.json');

    // return this.angularFirestore.collection('short', ref =>
    //   ref.orderBy('createDate', 'asc')).snapshotChanges()
    //   .pipe(map((actions) => actions.map(doc => {
    //     const data: any = doc.payload.doc.data();
    //     const docId = doc.payload.doc.id;
    //     return { docId, ...data };
    //   })
    //   ));
  }

  // public getShortListByBookId(bookId: string): Observable<any> {
  //   return this.angularFirestore.collection('short', ref =>
  //     ref.where('page.docId', '==', bookId).orderBy('createDate', 'asc'))
  //     .snapshotChanges().pipe(map((actions) => actions.map(doc => {
  //       const data: any = doc.payload.doc.data();
  //       const docId = doc.payload.doc.id;
  //       return { docId, ...data };
  //     })
  //     ));
  // }
}
