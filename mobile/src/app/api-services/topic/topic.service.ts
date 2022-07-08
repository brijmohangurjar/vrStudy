import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantVariables } from 'src/const/constant';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private angularFirestore: AngularFirestore,
    private constVar: ConstantVariables
  ) { }

  public getAllTopicList(): Observable<any> {
    return this.angularFirestore.collection('topic', ref =>
      ref.orderBy('createDate', 'asc').limit(this.constVar.limit)
    ).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }

  // public getAllTopicListByList(): Observable<any> {
  //   return this.angularFirestore.collection('topic', ref =>
  //     ref.orderBy('createDate', 'asc').limit(20)
  //   ).snapshotChanges()
  //     .pipe(map((actions) => {
  //       return actions.map(doc => {
  //         const data: any = doc.payload.doc.data();
  //         const docId = doc.payload.doc.id;
  //         return { docId, ...data };
  //       });
  //     }));
  // }

  public getTopicListBySubjectId(subjectId: string): Observable<any> {
    return this.angularFirestore.collection('topic', ref =>
      ref.where('subject.docId', '==', subjectId)
        .orderBy('createDate', 'asc').limit(this.constVar.limit)
    ).snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(doc => {
          const data: any = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          return { docId, ...data };
        });
      }));
  }
}
