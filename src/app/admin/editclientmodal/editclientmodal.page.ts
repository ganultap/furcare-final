import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-editclientmodal',
  templateUrl: './editclientmodal.page.html',
  styleUrls: ['./editclientmodal.page.scss'],
})
export class EditclientmodalPage implements OnInit {
  name: any;
  address: any ;
  client:any = []
  mobilenumber: any;
  email: any ;
  user: any [];
  constructor(private navParams: NavParams,private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController) { 

    this.client= this.navParams.get('client');
      this.name= this.client.name
      this.address= this.client.address
      this.mobilenumber= this.client.mobile_number
      this.email= this.client.email
    
  }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async update_client(){
    const clientadded = await this.toastController.create({
   message: 'Client Updated',
   duration: 2000
   
 });
 const clientnotadded = await this.toastController.create({
   message: 'Invalid Inputs',
   duration: 2000
   
 });
 const error = await this.toastController.create({
   message: 'Connection Error',
   duration: 2000
   
 });


 if(this.name && this.email && this.mobilenumber && this.address){
   this.api.userinfo().then((user)=>{
     

     
     const formData: FormData = new FormData();
     formData.append('client_id', this.client.client_id)
     formData.append('name', this.name)
     formData.append('address', this.address)
     formData.append('mobile_number', this.mobilenumber)
     formData.append('email', this.email)
     formData.append('currentuser', user.user_id)
 
     this.api.add(API_URL+"user/editclient",formData).subscribe(res => {
       console.log(res)
      if(res == "success"){
       clientadded.present();
       this.modalCtrl.dismiss({
         'dismissed': true
       });;
      }
      if(res == "error"){
       clientnotadded.present();
       this.name= ""
       this.email= ""
       this.address=""
       this.mobilenumber=""
   
      }
       
       
     
   }, err => {
     
     error.present();
   });
 

   })

   
 }else{
   clientnotadded.present();
 }


 }
}
