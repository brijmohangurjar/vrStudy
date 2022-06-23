import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit, OnDestroy {

  public pageDetail: any;
  public breadcumbType = '';
  public pageDetailLoading = true;
  public loopForImageLoading = new Array(1);

  private pageId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageDetailService: PageDetailService,
    private toastService: ToastService,
    private navigationService: NavigationService,
    // private router: Router,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.pageId = param.get('pageId');
      if (this.pageId) {
        this.getPageDetailByPageDocId(this.pageId);
      }
    });
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }


  public navigateByType(type: string): void {
    switch (type) {
      case 'subject':

        break;
      case 'topic':

        break;
      case 'book':

        break;
      case 'page':

        break;
    }
  }

  private getPageDetailByPageDocId(pageId: string): void {
    this.pageDetailLoading = true;
    this.subscriptions.push(
      this.pageDetailService.getPageDetailByPageDocId(pageId)
        .subscribe((responseData: any) => {
          this.pageDetailLoading = false;
          if (responseData) {
            this.pageDetail = responseData;
            // this.setBreadcumb(responseData);
          } else {
            this.pageDetail = [];
          }
        }, (error: HttpErrorResponse) => {
          this.pageDetailLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  // private setBreadcumb(pageDetail: any): void {
  //   const router = this.router.url.split('/');
  //   console.log('router', router);
  //   console.log('pageDetail', pageDetail);
  //   if (router[3] === 'topic'
  //     && router[5] === 'book' && router[7] === 'page-list'
  //     && router[9] === 'page-detail'
  //   ) {
  //     this.breadcumbType = 'homeSubjectSlider';
  //     console.log('By Home Subject Slider');
  //   } else if (router[3] === 'subject' && router[4] === 'topic'
  //     && router[6] === 'book' && router[8] === 'page-list'
  //     && router[10] === 'page-detail') {
  //     console.log('By SUbject Page');
  //   } else if (router[3] === 'topic' && router[4] === 'book'
  //     && router[6] === 'page-list'
  //     && router[8] === 'page-detail') {
  //     console.log('By Home Recent Page Slider');
  //   } else if (router[3] === 'books' && router[4] === 'page-list'
  //     && router[6] === 'page-detail') {
  //     console.log('By Home Recent Book Slider');
  //   } else if (router[3] === 'recent-page' && router[4] === 'page-detail') {
  //     console.log('By Home Recent Page Slider');
  //   }
  // }
}
