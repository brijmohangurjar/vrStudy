import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  @Input() showToggleButton:boolean;
  @Input() userDetail: any;
  @Input() heading: any;

  constructor(
    private router: Router,
  ) { }

  public ngOnInit() { }

  public navigateToBack(): void {
    this.router.navigateByUrl('base')
  }

  public navigateTo(){
    this.router.navigate(['base/home/search']);
  }

}
