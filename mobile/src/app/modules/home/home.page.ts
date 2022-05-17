import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService, LoginService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public subjectList = [];

  constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private homeService: HomeService,
  ) { }

  public ngOnInit() {
    this.getSubjectsList();
  }


  public logOutUser(): void {
    this.loginService.logOutUser();
  }

  private getSubjectsList(): void {
    this.homeService.getSubjectList()
      .subscribe((result: any) => {
        console.log('result', result);
        if (result && result.length) {
          this.subjectList = result;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }
}
