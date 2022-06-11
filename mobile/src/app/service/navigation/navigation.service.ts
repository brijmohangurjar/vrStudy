import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  public navigateByRelativePath(path: string, itemId: string): void {
    // this.router.navigate(['base', 'home', path, itemId]);
    // this.router.navigate(['base', 'home', path, itemId], { relativeTo: this.activatedRoute });
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }

  public navigateByUrl(path: string, itemId: string): void {
    this.router.navigate([`/${path}`, itemId]);
  }
}
