import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  @Input() loopForImageLoading = [];
  @Input() showSlideLoading = false;
  @Input() fullPageLoading = false;
  @Input() showCardLoading = false;

  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,
  };

  constructor() { }

  public ngOnInit() {
  }
}
