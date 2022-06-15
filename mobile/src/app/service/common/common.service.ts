import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userProfileDataSource = new BehaviorSubject<any>(null);
  public userProfileData = this.userProfileDataSource.asObservable();

  constructor() { }

  public updateUserInfoObs(data: any) {
    this.userProfileDataSource.next(data ? data : null);
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
