import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit, OnDestroy {

  public subjectList = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private loadingService: LoadingService,
    private subjectService: SubjectService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.getSubjectsList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getSubjectsList(): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.subjectService.getSubjectList()
        .subscribe((result: any) => {
          this.loadingService.hideLoading();
          if (result && result.length) {
            this.subjectList = result;
          } else {
            this.subjectList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.loadingService.hideLoading();
          this.toastService.errorToast(error.message);
        })
    );
  }
}
