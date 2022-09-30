import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/api-service/user.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation-popover',
  templateUrl: './confirmation-popover.component.html',
  styleUrls: ['./confirmation-popover.component.scss']
})
export class ConfirmationPopoverComponent implements OnInit {
  modelRef : BsModalRef;
  password = '';
  realPassword = '';
  errorMsg = '';
  onChangeSearch = new Subject<string>();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit(): void {
    this.getPassword();
    this.onChangeSearch
    .pipe(debounceTime(1500))
    .subscribe(() => {
      this.checkConfirmPass();
    });
  }

  getPassword() {
    this.userService.getAppVersion().subscribe(res => {
      console.log(res, 'res');
      if(res && res.length) {
        this.realPassword = res[0].delete_password;
      }
    });
  }

  checkConfirmPass() {
    this.errorMsg = '';
    if(this.realPassword == this.password) {
      this.errorMsg = '';
    } else {
       this.errorMsg = 'Please Enter Right Password';
    }
  }

  public changeSearchValue(): void {
    this.onChangeSearch.next();
  }

  submit() {
    if(this.password == this.realPassword) {
      this.event.emit(true);
      this.bsModalRef.hide();
    } else {
      this.errorMsg = 'Please Enter Right Password';
    }
  }

}
