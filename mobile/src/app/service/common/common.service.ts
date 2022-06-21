import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userProfileDataSource = new BehaviorSubject<any>(null);
  public userProfileData = this.userProfileDataSource.asObservable();

  public bookDataSource = new BehaviorSubject<any>(null);
  public bookData = this.bookDataSource.asObservable();

  public topicDataSource = new BehaviorSubject<any>(null);
  public topicData = this.topicDataSource.asObservable();

  public pageDataSource = new BehaviorSubject<any>(null);
  public pageData = this.pageDataSource.asObservable();

  public noteDataSource = new BehaviorSubject<any>(null);
  public noteData = this.noteDataSource.asObservable();

  public shortDataSource = new BehaviorSubject<any>(null);
  public shortData = this.shortDataSource.asObservable();

  constructor() { }

  public updateUserInfoObs(data: any) {
    this.userProfileDataSource.next(data ? data : null);
  }

  public updareBookDate(data: any) {
    this.bookDataSource.next(data ? data : null);
  }

  public updareTopicDate(data: any) {
    this.topicDataSource.next(data ? data : null);
  }

  public updarePageDate(data: any) {
    this.pageDataSource.next(data ? data : null);
  }

  public updareNoteDate(data: any) {
    this.noteDataSource.next(data ? data : null);
  }

  public updareShortDate(data: any) {
    this.shortDataSource.next(data ? data : null);
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
