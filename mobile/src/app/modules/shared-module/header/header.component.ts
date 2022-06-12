import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
  ) { }

  public ngOnInit() { }

  public navigateToBack(): void {
    this.router.navigateByUrl('base')
  }

  public clearSearchBar() {

  }
}
