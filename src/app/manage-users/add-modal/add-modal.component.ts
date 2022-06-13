import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController, NavParams } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
 
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  username: string;
  password: string;
  name: string;
  
  usertype: string;
  
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router , public toastController: ToastController, private navParams: NavParams) { }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  
  ngOnInit() {


  }
  ionViewWillLeave() {
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User has been successfully added',
      duration: 2000
    });
    toast.present();
  }

  async add_account() {
    if(this.usertype == "admin"){

     
    }
    
    if(this.username && this.password && this.name &&  this.usertype != null){
      
      const formData: FormData = new FormData();
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('usertype', this.usertype)
 
    
      formData.append('name', this.name)
      let postData = {
        username: this.username,
        password: this.password,
        name: this.name,
    
        usertype: this.usertype,
      
        
        
  }

  const usernametaken = await this.toastController.create({
    message: 'Username is already taken',
    duration: 2000
  });
      this.http.post(API_URL+"user/add_account", formData) 
        .subscribe(res => {
         
        

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
