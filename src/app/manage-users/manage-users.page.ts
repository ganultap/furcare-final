import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NotificationPage } from '../components/notification/notification.page';
import { ScheduleService } from '../services/schedule.service'
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { Delete1ModalComponent } from './delete1-modal/delete1-modal.component';
import { PopoverComponent } from './../components/popover/popover.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { environment } from '../../environments/environment';
const API_URL = environment.API_URL

declare var myFunction2

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  currentuser: any = []
  notifydata2: any = []
  notifydata: any = []
  notifydata3: any = []
  notifydata4: any = []
  event: any = [];
  allservice: any = []
  datauser: any = [];
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkedUsers: any = [];
  sortDirection = 0 
  sortKey = null
  constructor(private alert: AlertController,private popover: PopoverController,private modalCtrl: ModalController, private api: ApiService, private sched: ScheduleService, private router: Router, private platform: Platform, private authService: AuthenticationService) { 
   
    this.api.userinfo().then((data)=>{
      this.currentuser = data

    })
  }
  ionViewWillEnter() {
    this.getallservice()
   
    this.getUsers();
  }
  ngOnInit() {
  }
  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
        
        if(state){
          
         
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
      
        

      })

   })
  
    
  }


  getallservice(){

    this.api.get(API_URL+"user/getallservice1").subscribe((sched)=>{ 

        this.allservice = sched
console.log(this.allservice)
this.notif()
    })


  }



  notif(){
    this.event = []
    this.notifydata = []
    this.notifydata2 = []
    this.notifydata3 = []
    this.notifydata4 = []
    let asd = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
    this.sched.notification().subscribe((res)=>{

      this.event = res
     
      for(let i = 0 ; i < this.event.length; i++){
        let startTime = new Date(this.event[i].startTime)
       
       let daysleft = (Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))
        // if((Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))>=3){

        //   this.notifydata.push(this.event[i])

        // }  

        if(daysleft <= 2 && daysleft >= 0){

          this.notifydata.push(this.event[i])
        this.notifydata2.push({
            'schedule_id': this.event[i].schedule_id,
            'daysleft': daysleft

        })
         
        }
        
      
      }
    
      
      for(let i = 0 ; i < this.allservice.length; i++){

        if(this.allservice[i].done == 0){
        let startTime = new Date(this.allservice[i].service_date)
       
       let daysleft = (Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))
        // if((Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))>=3){

        //   this.notifydata.push(this.allservice[i])

        // }  
          
        if(asd.getFullYear()-startTime.getFullYear()==0 && asd.getMonth()- startTime.getMonth()== 0 ){
            if(startTime.getDate()-asd.getDate()  <= 2 &&  startTime.getDate()-asd.getDate()  >= 0){

              this.notifydata3.push(this.allservice[i])
              this.notifydata4.push({
                  'service_id': this.allservice[i].service_id,
                  'daysleft': startTime.getDate()-asd.getDate()
      
              })
            
            }
        
         
        }
      }
      
      }
    

      
    
    })

  }
  async notifypop(ev:any){

    const popover = await this.popover.create({
      event: ev,
      component: NotificationPage,
      cssClass: 'notify-popover',
      componentProps: {
        notify: this.notifydata,
        notify2: this.notifydata2,
        notify3: this.notifydata3,
        notify4: this.notifydata4


      }
      
      
    })
    return await popover.present()


  }

// 

async _popOver(ev:any){
  const popover = await this.popover.create({
    component: PopoverComponent,
    event: ev
  })
  return await popover.present()
}


sortBy(key){
  this.sortKey = key;
  this.sortDirection++;
  this.sort();

}
sort(){
  if(this.sortDirection == 1){
      this.datauser = this.datauser.sort((a, b  )=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);

      });
  }else if(this.sortDirection==2){
    this.datauser = this.datauser.sort((a, b  )=>{
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];
      return valB.localeCompare(valA);

    });

  }else{
    this.sortDirection = 0 ;
    this.sortKey = null;
  }

}


  async openadd(){
    const modal = await this.modalCtrl.create({
      component: AddModalComponent,
     
    

    });
    
    await modal.present();
    await modal.onWillDismiss().then(()=>{

      this.getUsers();
    });
    
  }

  async openedit(data){
    const modal1 = await this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: {
        data : data
        


      }
    

    });
    
    await modal1.present();
    await modal1.onWillDismiss().then(()=>{

      this.getUsers();
    });
    
  }
  
  
  async opendelete(){
    this.checkedUsers = []
    this.datauser.map(obj => {
      if (obj.isChecked) {
        this.checkedUsers.push(obj);
        
      };
    });
    
    const modal2 = await this.modalCtrl.create({
      component: DeleteModalComponent,
      cssClass: "my-modal",
      componentProps: {
        checked_users: this.checkedUsers


      }
      
     
    

    });
    
    await modal2.present();
    await modal2.onWillDismiss().then(()=>{

      this.getUsers();
    });
    
  }

  async opendelete1(x){
    
    
    const modal3 = await this.modalCtrl.create({
      component: Delete1ModalComponent,
      
      componentProps: {
        tobedeleted : x
        


      }
      
     
    

    });
   
    
    await modal3.present();
    await modal3.onWillDismiss().then(()=>{

      this.getUsers();
    });
    
  }
  async getUsers() {
 
    this.api.get(API_URL+"user/getuser") 
      .subscribe(res => {
      
        this.datauser = res;
   
 
    
        }
      
      , err => {
        console.log(err);
      });


  


     


  }



  





  




  checkMaster() {
    setTimeout(()=>{
      this.datauser.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.datauser.length;
    let checked = 0;
    this.datauser.map(obj => {
      if (obj.isChecked) {checked++
        
      
      };
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
      
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  async marklogout(){
 
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Logout',
        handler: ()=>{
          
          this.logout()
    
        }
    
      }],
    });
    alert.present();
   
  
    
  }

}
