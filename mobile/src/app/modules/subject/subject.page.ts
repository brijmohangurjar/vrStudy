import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/api-services';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit, OnDestroy {

  public subjectList = [];

  private subjectId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
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
        })
    );
  }
}
