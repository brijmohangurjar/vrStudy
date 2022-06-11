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
  public currentDate = new Date();

  opts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true
  };

  public slideOpts2 = {
    slidesPerView: 2.8,
  }
  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  }
  constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private homeService: HomeService,
    // private navigationService: NavigationService,
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
        if (result && result.length) {
          this.subjectList = result;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }

  public clickOnSubject(item: any): void {
    console.log('item', item);
    // this.navigationService.navigateByRelativePath('subject', item.docId)
  }
}
