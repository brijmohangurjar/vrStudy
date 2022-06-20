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
      ref.where('book.docId', '==', bookId).orderBy('createDate', 'desc'))
      .snapshotChanges()
      .pipe(map((actions) => actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      })
      ));
  }

  public getShortList() {
    return this.angularFirestore.collection('short', ref =>
      ref.orderBy('createDate', 'desc')
    ).snapshotChanges().pipe(map((actions) => actions.map(doc => {
      const data: any = doc.payload.doc.data();
      const docId = doc.payload.doc.id;
      return { docId, ...data };
    })
    )
    );
  }
}
