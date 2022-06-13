import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ToastController, NavParams } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  datauser: any = [];
  usertobeedited: any = []
  username: string;
  password: string;
  name: string;
  email: string;
  usertype: string;
  department: string;
  
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router,public toastController: ToastController,  private navParams: NavParams) { }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  ngOnInit() { this.getUser()}

  async getUser() {
 
    // this.http.get("https://localhost/dms/admin/getuser") 
    //   .subscribe(res => {
    //     console.log(res);
    //     this.datauser = res;
    // console.log(this.datauser);
 
    
    //     }
      
    //   , err => {
    //     console.log(err);
    //   });
   
    this.usertobeedited = this.navParams.get('data');
   
    this.username = this.usertobeedited.username;
  
    this.name = this.usertobeedited.name;
    this.usertype = this.usertobeedited.usertype
    
     


  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User has been successfully updated',
      duration: 2000
    });
    toast.present();
  }

  async edit_account() {
 
    
    if(this.username && this.password && this.name &&  this.usertype != null){
      const formData: FormData = new FormData();
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('usertype', this.usertype)
   
      
     
      formData.append('name', this.name)
      formData.append('user_id', this.usertobeedited.user_id)
  
  const usernametaken = await this.toastController.create({
    message: 'Username is already taken',
    duration: 2000
  });
      this.http.post(API_URL+"user/edit_user", formData) 
        .subscribe(res => {
         
          console.log(res);
          if(res == "username is already taken"){
           
            usernametaken.present()
          }else{
            this.modalCtrl.dismiss();
          
            this.presentToast();
          
           

          }
          
        
    }, err => {
      console.log(err);
    });
  
  
  
  
    }else{
      const toast = await this.toastController.create({
        message: 'Invalid Entries',
        duration: 2000
      });
      toast.present();
      

    }


  }
  

}
