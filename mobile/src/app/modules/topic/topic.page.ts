import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopicService } from 'src/app/api-services';
import { LoadingService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit, OnDestroy {

  public topicList = [];

  private subjectId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.subjectId = param.get('subjectId');
      if (this.subjectId) {
        this.getTopicListBySubjectId(this.subjectId);
      } else {
        this.getAllTopicList();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getTopicListBySubjectId(subjectId: string): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.topicService.getTopicListBySubjectId(subjectId)
        .subscribe((responseData: any) => {
          this.loadingService.hideLoading();
          if (responseData.length) {
            this.topicList = responseData;
          } else {
            this.topicList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
          this.loadingService.hideLoading();
        })
    );
  }

  private getAllTopicList(): void {
    this.loadingService.showLoading();
    this.subscriptions.push(
      this.topicService.getAllTopicList()
        .subscribe((responseData: any) => {
          this.loadingService.hideLoading();
          if (responseData.length) {
            this.topicList = responseData;
          } else {
            this.topicList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
          this.loadingService.hideLoading();
        })
    );
  }
}
