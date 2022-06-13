import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams, AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-viewphotopop',
  templateUrl: './viewphotopop.page.html',
  styleUrls: ['./viewphotopop.page.scss'],
})
export class ViewphotopopPage implements OnInit {
 photo: any
 photolink: any
  constructor(private popover: PopoverController,private navParams: NavParams) { }

  ngOnInit() {

    this.photo = this.navParams.get('photo');
  

    this.photolink = this.photo
  }

  dismissModal(){
    this.popover.dismiss();
   
  }

}
