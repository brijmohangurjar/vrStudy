import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit, OnDestroy {

  public subjectList = [];
  public subjectListLoading = true;
  public loopForImageLoading = new Array(12);

  private subscriptions: Subscription[] = [];

  constructor(
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
    this.subjectListLoading = true;
    this.subscriptions.push(
      this.subjectService.getSubjectList()
        .subscribe((result: any) => {
          this.subjectListLoading = false;
          if (result && result.length) {
            this.subjectList = result;
          } else {
            this.subjectList = [];
          }
        }, (error: HttpErrorResponse) => {
          this.subjectListLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
