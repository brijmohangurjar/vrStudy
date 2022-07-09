import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss'],
})
export class ViewImageComponent implements OnInit {
  public product:any;

  constructor(
    private navParams: NavParams,
    private popoverCtr: PopoverController
  ) { 
    if(this.navParams.data) {
      this.product = this.navParams.data;
    }
  }

  ngOnInit() {}

  public dismissPopover(): void {
    this.popoverCtr.dismiss();
  }

}

