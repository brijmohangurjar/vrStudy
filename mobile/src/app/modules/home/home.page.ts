import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService, LoginService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public subjectList = [];
  public pageList = [];
  public shortList = [];

  public currentDate = new Date();

  opts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true
  };

  public slideOpts2 = {
    slidesPerView: 2.8,
  }
  public slideOpts3 = {
    slidesPerView: 2.4,
    spaceBetween: 20,

  }
  public slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 50,
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
  constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private homeService: HomeService,
    private navigationService: NavigationService,
  ) { }

  public ngOnInit() {
    this.getSubjectsList();
    this.getPageList();
    this.getShortList();
  }


  public logOutUser(): void {
    this.loginService.logOutUser();
  }

  private getSubjectsList(): void {
    this.homeService.getSubjectList()
      .subscribe((result: any) => {
        if (result && result.length) {
          this.subjectList = result;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }

  
  private getPageList(): void {
    this.homeService.getPageList()
      .subscribe((result: any) => {
        if (result && result.length) {
          this.pageList = result;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }

    
  private getShortList(): void {
    this.homeService.getShortList()
      .subscribe((result: any) => {
        if (result && result.length) {
          this.shortList = result;
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }

  public clickOnSubject(item: any): void {
    this.navigationService.navigateByRelativePath('subject', item.docId)
  }
}
