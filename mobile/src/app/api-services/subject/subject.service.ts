import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    // private angularFirestore: AngularFirestore,
    private http: HttpClient
  ) { }

  public getSubjectList() {
    return this.http.get<any>('assets/data/subjectList.json');
    // return this.angularFirestore.collection('subjects', ref =>
    //   ref.orderBy('createDate', 'asc')
    // ).snapshotChanges().pipe(map((actions) => {
    //   return actions.map(doc => {
    //     const data: any = doc.payload.doc.data();
    //     const docId = doc.payload.doc.id;
    //     return { docId, ...data };
    //   });
    // })
    // );
  }
}
