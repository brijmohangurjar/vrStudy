import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  @Input() showToggleButton: boolean;
  @Input() showFilter: boolean;
  @Input() userDetail: any;
  @Input() heading: any;
  @Input() searchBar: any;

  public searchValue = '';
  public pageList = [];
  public originalData = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private homeService: HomeService,
    private toastService: ToastService,
    private navigationService: NavigationService,
    private location: Location
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.searchBar) {
      this.searchValue = '';
      this.pageList = [];
    }
  }

  public ngOnInit() {
    this.searchValue = '';
    this.getPageList();
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public navigateToBack(): void {
    // this.navigationService.navigateByUrl('base')
    this.location.back();
  }

  public getItems() {
    const column = ['heading'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.pageList = searchList;
  }

  public onSelect(item) {
    this.navigationService.navigateByUrl(`/base/home/topic/${item.subject.docId}/book/${item.topic.docId}/page-list/${item.book.docId}/page-detail/${item.docId}`);
  }

  transform(value: any, args: any): any {
    if (value) {
      const array = args.split(' ');
      if (!array && !array.length) { return value; }
      for (const text of array) {
        var reText = new RegExp(text, 'gi');
        value = value.replace(reText, '<b>' + text + '</b>');
      }
      return value;
    }
  }

  private getPageList(): void {
    this.homeService.getPageList()
      .subscribe((result: any) => {
        if (result && result.length) {
          this.pageList = result;
          this.originalData = result;
        } else {
          this.pageList = [];
          this.originalData = [];
        }
      }, (error: HttpErrorResponse) => {
        console.log('error', error)
        this.toastService.errorToast(error.message);
      });
  }
}
