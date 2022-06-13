import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-editpetmodal',
  templateUrl: './editpetmodal.page.html',
  styleUrls: ['./editpetmodal.page.scss'],
})
export class EditpetmodalPage implements OnInit {
  name: any;
  species: any ;
  
  birth: any;
  color: any ;
  
  breed: any ;
  
  gender: any;
  microchip: any ;
  dateofimplant: any ;
  client_id: any;
  patient: any;
  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 
    this.patient= this.navParams.get('patient');
    
    this.name= this.patient.name
    this.species= this.patient.species
    this.birth= this.patient.birth
    this.color= this.patient.color
    this.gender= this.patient.gender
    this.microchip= this.patient.microchip
    this.dateofimplant= this.patient.dateofimplant
    this.breed= this.patient.breed



  }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }



  async update_patient(){

    this.client_id = this.navParams.get('client_id');
    const patientadded = await this.toastController.create({
   message: 'Patient Added',
   duration: 2000
   
 });
 const patientnotadded = await this.toastController.create({
   message: 'Invalid Inputs',
   duration: 2000
   
 });


 if(this.name && this.species && this.birth && this.color && this.breed && this.gender ){
   this.api.userinfo().then((user)=>{
     
      if(this.microchip == undefined){
        this.microchip = ""
      }
      if(this.dateofimplant == undefined){
        this.dateofimplant = ""
      }
     
     const formData: FormData = new FormData();
     formData.append('patient_id', this.patient.patient_id)
     formData.append('name', this.name)
     formData.append('species', this.species)
     formData.append('birth', this.birth)
     formData.append('color', this.color)
     formData.append('breed', this.breed)
     formData.append('microchip', this.microchip)
     formData.append('gender', this.gender)
     formData.append('dateofimplant', this.dateofimplant)
     formData.append('currentuser', user.user_id)
     formData.append('client_id', this.client_id)
 
     this.api.add(API_URL+"user/editpatient",formData).subscribe(res => {
      
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
