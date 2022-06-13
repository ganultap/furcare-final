import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-photomodal',
  templateUrl: './photomodal.page.html',
  styleUrls: ['./photomodal.page.scss'],
})
export class PhotomodalPage implements OnInit {
  photo: any ;
  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }
  dismissModal(){
    this.popover.dismiss();
   
  }
  choose(){

    this.popover.dismiss(this.photo)
  

  }
  

}
