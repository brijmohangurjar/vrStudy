import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  public getAllNoteList(): Observable<any> {
    return this.angularFirestore.collection('note', ref =>
      ref.orderBy('createDate', 'asc'))
      .snapshotChanges()
      .pipe(map((actions) => actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      })
      ));
  }

  // public getNoteListByLimit(): Observable<any> {
  //   return this.angularFirestore.collection('note', ref =>
  //     ref.orderBy('createDate', 'asc'))
  //     .snapshotChanges()
  //     .pipe(map((actions) => actions.map(doc => {
  //       const data: any = doc.payload.doc.data();
  //       const docId = doc.payload.doc.id;
  //       return { docId, ...data };
  //     })
  //     ));
  // }

  public getNoteDetailByDocId(noteId: string): Observable<any> {
    return this.angularFirestore.collection('note').doc(noteId)
      .snapshotChanges()
      .pipe(map((actions) => {
        const data: any = actions.payload.data();
        const docId = actions.payload.id;
        return { docId, ...data };
      }
      ));
  }

  public getNoteListByBookId(bookId: string): Observable<any> {
    return this.angularFirestore.collection('note', ref =>
      ref.where('book.docId', '==', bookId)
        .orderBy('createDate', 'asc'))
      .snapshotChanges()
      .pipe(map((actions) => actions.map(doc => {
        const data: any = doc.payload.doc.data();
        const docId = doc.payload.doc.id;
        return { docId, ...data };
      })
      ));
  }
}
