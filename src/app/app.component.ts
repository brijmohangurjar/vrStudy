import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { cilUser } from '@coreui/icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  public loading = false;

  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private spinnerService: NgxSpinnerService
  ) {
    // iconSet singleton
    iconSet.icons = { cilUser };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  
  public showLoader(): void { setTimeout(() => this.loading = true, 0) }

  public hideLoader(): void { setTimeout(() => this.loading = false, 0) }
}
