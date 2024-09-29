import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopicService } from 'src/app/api-services';
import { CommonService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit, OnDestroy {

  public topicList = [];
  public topicListLoading = true;
  public loopForImageLoading = new Array(15);
  public originalData: any = [];

  private subjectId: string;
  private subscriptions: Subscription[] = [];
  public title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private toastService: ToastService,
    private commonService: CommonService
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
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getTopicListBySubjectId(subjectId: string): void {
    this.topicListLoading = true;
    this.subscriptions.push(
      this.topicService.getAllTopicList()
        .subscribe((responseData: any) => {
          this.topicListLoading = false;
          if(responseData && responseData.length){
            const result = responseData.filter(res => res?.subject?.docId == subjectId);
            this.topicList = result && result.length ? result : [];
            this.originalData = result && result.length ? result : [];;
          }
            // this.topicList = responseData;
            // this.originalData = responseData;
            this.title = `Topic - (${this.topicList.length})`;
        }, (error: HttpErrorResponse) => {
          this.topicListLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getAllTopicList(): void {
    this.commonService.topicData.subscribe(res => {
      if(res) {
        this.topicList = res;
        this.originalData = res;
        this.topicListLoading = false;
        this.title = `Topic - (${this.topicList.length})`;
      }
    });
    // this.topicListLoading = true;
    // this.subscriptions.push(
    //   this.topicService.getAllTopicList()
    //     .subscribe((responseData: any) => {
    //       this.topicListLoading = false;
    //       if (responseData.length) {
    //         this.topicList = responseData;
    //         this.originalData = responseData;
    //       } else {
    //         this.topicList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.topicListLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  public onChangeSearch(event) {
    const column = ['topicName'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(event, 'gi').test(row[key]));
    });
    this.topicList = searchList;
  }
}
