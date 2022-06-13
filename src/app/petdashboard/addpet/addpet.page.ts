import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'

const API_URL = environment.API_URL
@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.page.html',
  styleUrls: ['./addpet.page.scss'],
})
export class AddpetPage implements OnInit {
  name: any;
  species: any ;
  
  birth: any;
  color: any ;
  
  breed: any ;
  
  gender: any;
  microchip: any ;
  dateofimplant: any ;
  client_id: any;
  date: any;
  constructor(public datepipe: DatePipe,private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) {
    let date = new Date()
    this.date = this.datepipe.transform(date.toISOString(), 'yyyy-MM-ddTHH:mm')


   }

  ngOnInit() {}
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async add_client(){

    this.client_id = this.navParams.get('client_id');
    const patientadded = await this.toastController.create({
   message: 'Patient Added',
   duration: 2000
   
 });
 const patientnotadded = await this.toastController.create({
   message: 'Invalid Inputs',
   duration: 2000
   
 });


 if(this.name && this.species  && this.color && this.breed && this.gender ){
   this.api.userinfo().then((user)=>{
     
      if(this.microchip == undefined){
        this.microchip = ""
      }
      if(this.dateofimplant == undefined){
        this.dateofimplant = ""
      }
     
     const formData: FormData = new FormData();
     formData.append('name', this.name)
     formData.append('species', this.species)
     formData.append('birth', this.birth)
     formData.append('color', this.color)
     formData.append('breed', this.breed)
     formData.append('patient_date_added', this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm'))
     formData.append('microchip', this.microchip)
     formData.append('gender', this.gender)
     formData.append('dateofimplant', this.dateofimplant)
     formData.append('currentuser', user.user_id)
     formData.append('client_id', this.client_id)
 
     this.api.add(API_URL+"user/addpatient",formData).subscribe(res => {
     
      if(res == "success"){
       patientadded.present();
       this.modalCtrl.dismiss({
         'dismissed': true
       });
      }
      if(res == "error"){
       patientnotadded.present();
     
   
   
      }
       
       
     
   }, err => {
    patientnotadded.present();
   console.log(err);
   });
 

   })

   
 }else{
   patientnotadded.present();
 }
}
}
