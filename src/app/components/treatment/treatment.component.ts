import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
})
export class TreatmentComponent implements OnInit {

  patient: any = []
  client_id: any = []

  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) {

    this.patient = this.navParams.get('patient');
    this.client_id =  this.navParams.get('client_id');


   }

  ngOnInit() {}

}   





