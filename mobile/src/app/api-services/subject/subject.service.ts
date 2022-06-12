import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  public getSubjectList() {
    return this.angularFirestore.collection('subjects', ref =>
      ref.orderBy('createDate', 'desc')
    ).snapshotChanges().pipe(map((actions) => {
      return actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      });
    })
    );
  }
}
