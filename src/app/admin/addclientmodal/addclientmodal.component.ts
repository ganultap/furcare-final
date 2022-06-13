import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-addclientmodal',
  templateUrl: './addclientmodal.component.html',
  styleUrls: ['./addclientmodal.component.scss'],
})
export class AddclientmodalComponent implements OnInit {
  name: any;
  address: any ;
  
  mobilenumber: any;
  email: any ;
  user: any [];
  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController) { }

  ngOnInit() {}
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }


  async add_client(){
     const clientadded = await this.toastController.create({
    message: 'Client Added',
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
      formData.append('name', this.name)
      formData.append('address', this.address)
      formData.append('mobile_number', this.mobilenumber)
      formData.append('email', this.email)
      formData.append('currentuser', user.user_id)
  
      this.api.add(API_URL+"user/addclient",formData).subscribe(res => {
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
