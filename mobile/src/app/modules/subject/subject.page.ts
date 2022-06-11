import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/api-services';
// import { NavigationService } from 'src/app/service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit, OnDestroy {

  public topicList = [];
  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  }

  private subjectId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    // private navigationService: NavigationService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      console.log('param', param);
      this.subjectId = param.get('subjectId');
      console.log('this.subjectId', this.subjectId);
      if (this.subjectId) {
        this.getTopicListBySubjectId(this.subjectId);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }


  private getTopicListBySubjectId(subjectId: string): void {
    this.subscriptions.push(
      this.subjectService.getTopicListBySubjectId(subjectId)
        .subscribe((responseData: any) => {
          console.log('responseData', responseData);
          if (responseData.length) {
            this.topicList = responseData;
          } else {
            this.topicList = [];
          }
        })
    );
  }

  public clickOnTopic(item: any): void {
    console.log('item', item);
    // this.navigationService.navigateByRelativePath('topic', item.docId);
  }
}
