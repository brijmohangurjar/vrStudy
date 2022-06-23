import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortDetailService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  public getShortDetailByBookId(bookId: string): Observable<any> {
    return this.angularFirestore.collection('short', ref =>
      ref.where('book.docId', '==', bookId).orderBy('createDate', 'asc'))
      .snapshotChanges()
      .pipe(map((actions) => actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      })
      ));
  }

  
  public getShortDetailByShortDocId(shortId: string): Observable<any> {
    return this.angularFirestore.collection('short').doc(shortId)
      .snapshotChanges()
      .pipe(map((actions) => {
        const data: any = actions.payload.data();
        const docId = actions.payload.id;
        return { docId, ...data };
      }
      ));
  }

  public getShortList() {
    return this.angularFirestore.collection('short', ref =>
      ref.orderBy('createDate', 'asc')
    ).snapshotChanges().pipe(map((actions) => actions.map(doc => {
      const data: any = doc.payload.doc.data();
      const docId = doc.payload.doc.id;
      return { docId, ...data };
    })
    )
    );
  }
  // public getShortListByLimit() {
  //   return this.angularFirestore.collection('short', ref =>
  //     ref.orderBy('createDate', 'asc').limit(20)
  //   ).snapshotChanges().pipe(map((actions) => actions.map(doc => {
  //     const data: any = doc.payload.doc.data();
  //     const docId = doc.payload.doc.id;
  //     return { docId, ...data };
  //   })
  //   )
  //   );
  // }
}
