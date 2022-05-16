import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/api-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }


  public logOutUser(): void {
    this.loginService.logOutUser();
  }
}
