import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

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
    private router: Router,
    private homeService: HomeService,
    private toastService: ToastService
  ) { }

  public ngOnInit() {
    this.getPageList();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public navigateToBack(): void {
    this.router.navigateByUrl('base')
  }

  public getItems() {
    const column = ['heading', 'page'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.pageList = searchList;
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
