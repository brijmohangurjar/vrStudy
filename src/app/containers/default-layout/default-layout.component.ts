import {Component} from '@angular/core';
import { UserService } from 'src/app/api-service/user.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private userService: UserService){

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.userService.logOutUser();

  }
}
