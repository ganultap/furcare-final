import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';

const API_URL = environment.API_URL
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notify: any = []
  notify2: any = []
  notify3: any = []
  notify4: any = []
  notif: any = []
  constructor(private navParams: NavParams, private api: ApiService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
   
    this.notf()
  }
  notf(){
    
    this.notify = this.navParams.get('notify');
    this.notify2 = this.navParams.get('notify2');
     
    this.notify3 = this.navParams.get('notify3');
    this.notify4 = this.navParams.get('notify4');
    console.log(this.notify3)

    for(let i =0 ; i < this.notify.length; i++){
      let qwe = {
        
        schedule_id: this.notify[i].schedule_id,
        startTime: this.notify[i].startTime,
        description: this.notify[i].description,
        name: this.notify[i].name,
        title: this.notify[i].title,
        days: this.notify2[i].daysleft


      }
      this.notif.push(qwe)



    }

    
    for(let i =0 ; i < this.notify3.length; i++){
      let qwe = {
        
        service_id: this.notify3[i].service_id,
        startTime: this.notify3[i].service_date,
        description: this.notify3[i].against,
        clientname: this.notify3[i].clientname,
        patientname: this.notify3[i].patientname,
        title: this.notify3[i].service_type,
        days: this.notify4[i].daysleft,
        session: this.notify3[i].session,


      }
      this.notif.push(qwe)



    }



    this.notif.sort((a,b)=> a.days-b.days);
    


    // this.notifydata2.sort((a,b)=> a.daysleft-b.daysleft);



  }
}
