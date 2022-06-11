import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  private subscriptions: Subscription[] = [];

  constructor(
  ) { }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }
}
