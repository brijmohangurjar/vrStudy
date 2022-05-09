import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userProfileDataSource = new BehaviorSubject<any>(null);
  public userProfileData = this.userProfileDataSource.asObservable();

  constructor(
    // private authService: AuthService,
  ) {  }

  public profileUpdate(data: any) {
    // this.userProfileDataSource.next(data ? data : this.authService.userData);
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    // return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32 || (charCode >= 48 && charCode <= 57));
    return true;
  }
}
