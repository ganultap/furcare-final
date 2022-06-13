import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { ParsedVariable } from '@angular/compiler';
import { DatePipe } from '@angular/common'

import { environment } from '../../../../environments/environment';
import { TreatmentComponent } from '../../treatment/treatment.component';
import { TreatmentsheetPage } from '../treatmentsheet.page';
import { ServiceModalPage } from '../../service-modal/service-modal.page';
const API_URL = environment.API_URL
@Component({
  selector: 'app-edittreatmentsheet',
  templateUrl: './edittreatmentsheetmodal.page.html',
  styleUrls: ['./edittreatmentsheetmodal.page.scss'],
})
export class editTreatmentsheetPage implements OnInit {
  veterinarian: any  = ''
  treatment: any = []
  patient: any = []
  title = 'SADASDASD'
  diagnosis: any  = ''
  bw: any = ''
  hr: any  = ''
  mm: any  = ''
  pr: any  = ''
  temp: any  = ''
  rr: any = '' 
  crt: any = ''
  bcs: any  = ''
  fluid: any  = ''
  medication: any  = ''
  comments: any  = ''
  status = "on"
  am: any;
  pm: any;
  user_Id: any;
  client_id: any;
  date: any;
  datepipe: any;
  
  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 
    this.patient= this.navParams.get('patient');
    
    this.veterinarian= this.patient.veterinarian
    this.treatment= this.patient.treatment
    this.patient= this.patient.patient
    this.title= this.patient.title
    this.diagnosis= this.patient.diagnosis
    this.bw= this.patient.bw
    this.hr= this.patient.hr
    this.pr= this.patient.pr
    this.mm= this.patient.mm
    this.temp= this.patient.temp
    this.rr= this.patient.rr
    this.crt= this.patient.crt
    this.bcs= this.patient.bcs
    this.fluid= this.patient.fluid
    this.medication= this.patient.medication
    this.comments= this.patient.comments
    this.status= this.patient.status
    this.am= this.patient.am
    this.pm= this.patient.pm
    this.user_Id= this.patient.user_Id
    this.client_id= this.patient.client_id
    this.date= this.patient.date



  }

 
  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async update_sheet(){
    const sheetupdated = await this.toastController.create({
      message: 'Sheet updated',
      duration: 2000
      
    });
    const sheetnotupdated = await this.toastController.create({
      message: 'Invalid Inputs',
      duration: 2000
      
    });
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });



    if(this.diagnosis
      ){



        if(this.am == null){
          this.am = "none"
    
        }else{
          this.am = this.am.join(', ')
    
        }
        if(this.pm == null){
          this.pm = "none"
    
    
        }else{
          this.pm = this.pm.join(', ')
    
    
        }
          this.api.userinfo().then((user)=>{
            const formData: FormData = new FormData();
            formData.append('diagnosis', this.diagnosis)
            formData.append('bw', this.bw)
            formData.append('hr', this.hr)
            formData.append('mm', this.mm)
            formData.append('pr', this.pr)
            formData.append('temp', this.temp)
            formData.append('rr', this.rr)
            formData.append('crt', this.crt)
            formData.append('bcs', this.bcs)
            formData.append('fluid', this.fluid)
            formData.append('medication', this.medication)
            formData.append('comments', this.comments)
            formData.append('am', this.am)
            formData.append('pm', this.pm)
            formData.append('patient', this.patient.patient_id)
            formData.append('user', user.user_id)
            formData.append('client', this.client_id)
            formData.append('veterinarian', this.veterinarian)
            formData.append('date',  this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm'))
            this.api.add(API_URL+"user/update_sheet",formData).subscribe((res)=>{
    
    
    
            if(res == 1){
            
              sheetupdated.present();
              this.modalCtrl.dismiss({
                'dismissed': true
              });;
    
            }else{
             
              sheetnotupdated.present()
    
            }
    
              
            })
    
    
    
    
    
    
    
          }, err => {
            error.present();
            console.log(err);
            }
            
            
            )









      }else{


        sheetnotupdated.present() 


      }
    
      // console.log(this.pm.join(', '))



  }
  }
