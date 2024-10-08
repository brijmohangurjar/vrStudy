import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PageDetailService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';
import { ViewImageComponent } from '../shared-module/view-image/view-image.component';

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
    private popoverCtrl: PopoverController
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
        this.navigationService.navigateByUrl(`base/home/subject/topic/${this.pageDetail.subject.docId}`);
        break;
      case 'topic':
        this.navigationService.navigateByUrl(`base/home/topic/${this.pageDetail.subject.docId}/book/${this.pageDetail.topic.docId}`);
        break;
      case 'book':
        // eslint-disable-next-line max-len
        this.navigationService.navigateByUrl(`base/home/topic/${this.pageDetail.subject.docId}/book/${this.pageDetail.topic.docId}/page-list/${this.pageDetail.book.docId}`);
        break;
      case 'page':
        // eslint-disable-next-line max-len
        // this.navigationService.navigateByUrl(`base/home/topic/AkdjHgzIibh85Vk7qSVK/book/tuoqjsBgU60hM7ZGzfpM/page-list/wRo1q9PIQv9GHbOreY2h`);
        break;
    }
  }

  private getPageDetailByPageDocId(pageId: string): void {
    this.pageDetailLoading = true;
    this.subscriptions.push(
      this.pageDetailService.getAllPageList()
        .subscribe((responseData: any) => {
          this.pageDetailLoading = false;
          if (responseData && responseData.length) {
            const result = responseData.find(res => res?.docId == pageId);
            this.pageDetail = result ? result : null;
            // this.setBreadcumb(responseData);
          } else {
            this.pageDetail = null;
          }
        }, (error: HttpErrorResponse) => {
          this.pageDetailLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  public async viewImage(data: any): Promise<any> {
    const popover = await this.popoverCtrl.create({
      component: ViewImageComponent,
      mode: 'ios',
      componentProps: {
        product: data,
        showOffer: false
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
    });
    return await popover.present();
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
