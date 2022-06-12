import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {  Subscription } from 'rxjs';
import { HomeService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';

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
    private navigationService: NavigationService
  ) { }

  public ngOnChanges(changes:SimpleChanges){
    console.log('changes',changes);
    if(this.searchBar){
       this.searchValue = '';
       this.pageList = [];
    }
  }
  

  public ngOnInit() {
    console.log('testing');
    this.searchValue = '';
    this.getPageList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public navigateToBack(): void {
    this.navigationService.navigateByUrl('base')
  }

  public getItems() {
    const column = ['heading', 'page'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.pageList = searchList;
  }

  public onSelect(item){
    console.log('item', item);
    this.navigationService.navigateByUrl(`/base/home/topic/${item.subject.docId}/book/${item.book.docId}/page-detail/${item.book.docId}`);
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
        }
      }, (error: HttpErrorResponse) => {
        this.toastService.errorToast(error.message);
      });
  }
}
