import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() showToggleButton: boolean;
  @Input() showFilter: boolean;
  @Input() userDetail: any;
  @Input() heading: any;
  @Input() searchBar: any;

  public searchValue = '';
  public pageList = [];

  constructor(
    private router: Router,
    private homeService: HomeService,
    private toastService: ToastService
  ) { }

  public ngOnInit() {
    this.getPageList();
   }

  public navigateToBack(): void {
    this.router.navigateByUrl('base')
  }

  public clearSearchBar() {

  }

  public getItems() {

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
}
