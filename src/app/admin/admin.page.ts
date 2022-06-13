import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/';
import { AuthenticationService } from './../services/authentication.service';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddclientmodalComponent } from './addclientmodal/addclientmodal.component';
import { EditclientmodalPage } from './editclientmodal/editclientmodal.page';
import { AddclientPage } from './addclient/addclient.page';

import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ServicepopComponent } from '../components/servicepop/servicepop.component';
import { PopoverController } from '@ionic/angular';
import { observable, Observable, Subscription, interval } from 'rxjs';
import { webSocket } from 'rxjs/webSocket'
import { switchMap, map} from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ScheduleService } from '../services/schedule.service'
import { NotificationPage } from '../components/notification/notification.page';
import { DatePipe } from '@angular/common'
import { ScheduleModalPage } from '../components/schedule-modal/schedule-modal.page';
import { environment } from '../../environments/environment';
const API_URL = environment.API_URL
declare var myFunction;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  allservice: any = []
  page = 1;
  count = 0;
  tableSize = 2 ;

  currclient: any = []  
  client_id: any;
  schedpatient: any = []
  schedclient: any = []
  notifydata2: any = []
  notifydata: any = []
  notifydata3: any = []
  notifydata4: any = []
clients: any = []
patients: any = []
patientsfilter: any = []
currentuser: any = []

asd = new Date
event: any = [];
eventSource = [];
subscription: Subscription;
event1 = {
  service_id: '',
  schedule_id : '',
  title: '',
  desc: '',
  patient: '',
  client: '',
  startTime: null,
  endTime: null,
  allDay: true,
  session: ''
};
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };


  
  selectedDate: Date;
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;


 
  constructor(public datepipe: DatePipe, private route:ActivatedRoute,private sched: ScheduleService,private loading: LoadingController,private popover: PopoverController,private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string,private api: ApiService,private router:Router, private platform: Platform,private storage: Storage,private authService: AuthenticationService,private modalCtrl: ModalController) { 
   
   
    let asd: any = new Date
    this.asd = new Date
    this.getpatients();
  
    
  }
  ionViewWillEnter() {
    this.getclients()
    this.getschedule()
    
    this.api.userinfo().then((data)=>{

      this.currentuser = data;
      



    })
  }
  ngOnInit() {

//     const source = interval(10000);

// this.subscription = source.subscribe(val => this.getclients());
   
  }
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTableDataChange(event){
    this.page = event;
    this.getclients();
  } 
async qwe(event){
 // Use Angular date pipe for conversion
 if(this.schedclient){

  let start = formatDate(event.startTime, 'medium', this.locale);

 let end = formatDate(event.endTime, 'medium', this.locale);

 const alert = await this.alertCtrl.create({
   
   header: event.title,
   subHeader: event.desc,
   message: start.slice(0,12)+'<br>Patient: '+ this.schedpatient.name+'<br>Client: '+ this.schedclient.name+'<br>Session: '+this.schedclient.session, 
   // message: 'From: ' + start + '<br><br>To: ' + end,
   buttons: ['OK', {

     text: 'Delete',
     handler: ()=>{
       
       this.deleteconfirm(event);

     }

   }],
 });
 alert.present();
 }

 else if(event.client && !event.service_id){
  let start = formatDate(event.startTime, 'medium', this.locale);

  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    
    header: event.title,
    subHeader: event.desc,
    message: start.slice(0,12)+'<br>Patient: '+ event.patient+'<br>Client: '+ event.client+'<br>Session: '+event.session, 
    // message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK', {
 
      text: 'Delete',
      handler: ()=>{
        
        this.deleteconfirm(event);
 
      }
 
    }],
  });
  alert.present();
  
 }
 else if(event.client && event.service_id){
  let start = formatDate(event.startTime, 'medium', this.locale);

  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    
    header: event.title,
    subHeader: event.desc,
    message: start.slice(0,12)+'<br>Patient: '+ event.patient+'<br>Client: '+ event.client+'<br>Session: '+event.session, 
    // message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK'],
  });
  alert.present();
  
 }
 else{
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    
    header: event.title,
    subHeader: event.desc,
    message: start.slice(0,12), 
    // message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK', {
 
      text: 'Delete',
      handler: ()=>{
        
        this.deleteconfirm(event);
 
      }
 
    }],
  });
  alert.present();


 }
    
 


}

getpatients(){
  this.client_id = this.route.snapshot.params['client_id']
  this.api.get(API_URL+"user/getpatients?client_id="+this.client_id).subscribe(res => {
  
   
      this.patients = res;
      this.patientsfilter = this.patients
   
    
    
  
}, err => {
  
console.log(err);
});

  this.getclient()



}

getclient(){
this.client_id = this.route.snapshot.params['client_id']
this.api.get(API_URL+"user/getcurrclient?client_id="+this.client_id).subscribe((res)=>{

            this.currclient = res[0]
          


})


}
  
  async onEventSelected(event) {
    
    this.api.get(API_URL+"user/getpatientsched?patient_id="+event.patient).subscribe((data)=>{

      this.schedpatient = data[0]
     

      this.api.get(API_URL+"user/getclientsched?client_id="+event.client).subscribe((data1)=>{

      this.schedclient = data1[0]

      this.qwe(event)

    })

    })
    
   
  }
  

  
  removeEvents() {
    this.eventSource = [];
  }


  onTimeSelected(ev) {    
    
  }

  async deleteconfirm(event){
    let ev = event
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete this shedule?',
      message: ev.title+'<br>'+ev.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletesched(ev);
          }
        }
      ]
    });

    await alert.present();
     


  }
  
  async deletesched(ev){
    this.api.get(API_URL+"user/deletesched?schedule_id="+ev.schedule_id).subscribe((res)=>{

      this.getschedule()
      this.notif()
    
    })

  }



  // <----->
  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
       
        if(state){
          
          this.router.navigate(['','admin'])
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
       
        

      })

   })
  
    
  }

  _ionChange(event) {
    const val = event.target.value;

    this.patientsfilter = this.patients;
    if (val && val.trim() != '') {
      this.patientsfilter = this.patientsfilter.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        
      })
  
    }
    
   
    // this.search.getInputElement().then(item => console.log(item))
  }
  get sortClients(){
    return this.clients.sort((a, b) => {
      return <any>new Date(b.date_added) - <any>new Date(a.date_added);
    });
  }

  
  
getschedule(){
  this.eventSource = [];

  this.api.get(API_URL+"user/getschedule").subscribe((sched)=>{
   
  
   
  for(let data of Object.values(sched)){
    this.event1.schedule_id = data.schedule_id
    this.event1.title = data.title
    this.event1.desc = data.description
    this.event1.patient = data.patient
    this.event1.client = data.client
    this.event1.startTime = new Date(data.startTime)
    this.event1.endTime = new Date(data.endTime)

    if(data.allDay == 1){
      this.event1.allDay = true

    }else{
      this.event1.allDay = false
    }
    
    this.eventSource.push(this.event1)
    
    this.event1 = {
      session: '',
      service_id : '',
      schedule_id:'',
      title: '',
      desc: '',
      patient: '',
      client: '',
      startTime: null,
      endTime: null,
      allDay: true
    };
    this.myCal.loadEvents();

    
  }
    //--- compare date interval in days ---//
  // let asd: any = new Date
  // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
  // console.log(zxc)
   
  
    

  })


  this.api.get(API_URL+"user/getallservice1").subscribe((sched)=>{
   
    this.allservice = sched
    this.notif()
    for(let data of Object.values(sched)){
      if(data.done == 0){
        this.event1.service_id = data.service_id
        this.event1.title = data.service_type
        this.event1.desc = data.against
        this.event1.patient = data.patientname
        this.event1.client = data.clientname
        this.event1.startTime = new Date(data.service_date)
        this.event1.endTime = new Date(data.service_date)
        this.event1.session = data.session
  
          this.event1.allDay = true
    
     
        
        
        this.eventSource.push(this.event1)
        
        this.event1 = {
          session: '',
          service_id : '',
          schedule_id:'',
          title: '',
          desc: '',
          patient: '',
          client: '',
          startTime: null,
          endTime: null,
          allDay: true
        };


      }
    
      this.myCal.loadEvents();
  
      
    }
      //--- compare date interval in days ---//
    // let asd: any = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
     
    
      
  
    })

console.log(this.eventSource)

}



  async gotopet(client){
   
    this.router.navigate(['/petdashboard',{client_id:client}])
    
   


  }

  get sortPatients(){
    return this.patientsfilter.sort((a, b) => {
      return <any>new Date(b.patient_date_added) - <any>new Date(a.patient_date_added);
    });
  }

  getclients(){

    
      this.api.get(API_URL+"user/getclients").subscribe(res => {
   
       
          this.clients = res;
          this.count = this.clients.length
      
        
         
        
       
        
       
      
    }, err => {
      
    console.log(err);
    });

  }
  
  

  async openadd(){
    const modal = await this.modalCtrl.create({
      component: AddclientPage,
     

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getclients();
    
  }


  
  async opendit(data){
    const modal = await this.modalCtrl.create({
      component: EditclientmodalPage,
     componentProps: {

      client: data

     }
    

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getclients();
    
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
          
        if(asd.getFullYear()-startTime.getFullYear()==0 && asd.getMonth()- startTime.getMonth()== 0 ){
            if(startTime.getDate()-asd.getDate()  <= 2 &&  startTime.getDate()-asd.getDate()  >= 0){

              this.notifydata.push(this.event[i])
              this.notifydata2.push({
                  'schedule_id': this.event[i].schedule_id,
                  'daysleft': startTime.getDate()-asd.getDate()
      
              })
            
            }
        
         
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


  async schedule(){

    const modal = await this.modalCtrl.create({
      component: ScheduleModalPage,
      cssClass: 'cal-modal',
      componentProps: {
       
      
  
  
  
      }
      
  
    });
    
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.getschedule()
      
      

    });
  
    
  }



  async marklogout(){
 
    const alert = await this.alertCtrl.create({
   
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



  async markdeleteclient(data){
 
    const alert = await this.alertCtrl.create({
      header: "Deleting Client",
      subHeader: "",
      message: "Are you sure?", 
      cssClass:'my-custom-class',
      buttons: ['Cancel', {

        text: 'Delete',
        handler: ()=>{
          
          this.deleteclient(data)
    
        }
        
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getclients()
    
    })
  }


  deleteclient(data){
    
    const formData: FormData = new FormData();
    formData.append('client_id', data.client_id)
    
      this.api.add(API_URL+"user/deleteclient", formData).subscribe((res)=>{
      
          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }
}

