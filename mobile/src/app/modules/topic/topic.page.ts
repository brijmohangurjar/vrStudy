import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopicService } from 'src/app/api-services';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  public topicList = [];
  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  }

  private subjectId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
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
      this.topicService.getTopicListBySubjectId(subjectId)
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
}
