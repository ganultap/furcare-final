import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core'
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ToastController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL


@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.page.html',
  styleUrls: ['./schedule-modal.page.scss'],
})
export class ScheduleModalPage implements OnInit {
  eventSource = [];
  patient_id: any;
  client_id : any;
  user_id: any;
  
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  minDate = new Date().toISOString();
  
  selectedDate: Date;
  modalReady = false;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: null,
    allDay: true
  };

  event1 = {
    schedule_id : '',
    title: '',
    desc: '',
    patient: '',
    client: '',
    startTime: null,
    endTime: null,
    allDay: true,
    session: '',
            service_id : '',
  };
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(public datepipe: DatePipe,public toastController: ToastController, private navParams: NavParams,private api: ApiService,private modalCtrl: ModalController,private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string) {
   
    this.minDate = this.minDate.slice(0,16)
  
    
    
   }
  ngAfterViewInit() {
   
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
  ngOnInit() {
    this.getschedule()
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }

  next() {
    this.myCal.slideNext();
  }
  getschedule(){
    this.eventSource = [];
  
    this.api.get(API_URL+"user/getschedule3?patient="+this.patient_id).subscribe((sched)=>{
     
    
     
    for(let data of Object.values(sched)){
      this.event1.schedule_id = data.schedule_id
      this.event1.session = data.session
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
        schedule_id:'',
        title: '',
        desc: '',
        patient: '',
        client: '',
        startTime: null,
        endTime: null,
        allDay: true,
        session: '',
            service_id : '',
      };




      
      this.myCal.loadEvents();
  
      
    }


    this.api.get(API_URL+"user/getallservice1").subscribe((sched)=>{
   
  
   
      for(let data of Object.values(sched)){
        if(data.done == 0 && data.patient == this.patient_id){
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
      //--- compare date interval in days ---//
    // let asd: any = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
     
    
      
  
    })
  
  
  
  }


  save() {    
     

   
    this.patient_id = this.navParams.get('patient_id');
    this.client_id = this.navParams.get('client_id');
    this.api.userinfo().then((user)=>{
      this.user_id = user.user_id
      const formData: FormData = new FormData();
    formData.append('title', this.event.title)
    formData.append('description', this.event.desc)
    formData.append('startTime', this.datepipe.transform(this.event.startTime.toLocaleDateString(), 'yyyy-MM-dd hh:mm'))
    formData.append('endTime', this.datepipe.transform(this.event.endTime.toLocaleDateString(), 'yyyy-MM-dd hh:mm'))
    formData.append('allDay', new Boolean(this.event.allDay).toString())
    formData.append('user', user.user_id)
    formData.append('patient', this.patient_id)
    formData.append('client', this.client_id)
   console.log(this.event.allDay)
    this.api.add(API_URL+"user/addsched", formData).subscribe((data)=>{
    
      if(data == "success"){
     

      }

    }, err => {
      
      console.log(err);
      });
      
    
    
    
    
    
    this.eventSource.push(this.event);
     console.log(this.eventSource)
      this.event = {
        title: '',
        desc: '',
        startTime: null,  
        endTime: null,
        allDay: true
      };
      this.myCal.loadEvents();
    

    })
   
   
    this.modalCtrl.dismiss({event: this.event})
    
  
  }
  close() {
    this.modalCtrl.dismiss();
  }
  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  async onEventSelected(event) {
    
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
 
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title+" (session "+ event.session+")",
      subHeader: event.desc,
      message: start.slice(0,12),
      buttons: ['OK'],
    });
    alert.present();
  }
  removeEvents() {
    this.eventSource = [];
  }

  onTimeSelected(ev) { 
    this.event.startTime = new Date(ev.selectedTime); 
  
    this.event.endTime = new Date(ev.selectedTime); 

  
  }
  


}
