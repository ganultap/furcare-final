import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { ParsedVariable } from '@angular/compiler';
import { DatePipe } from '@angular/common'

import { environment } from '../../../environments/environment';
import { editTreatmentsheetPage } from './edittreatmentsheetmodal/edittreatmentsheetmodal.page';
const API_URL = environment.API_URL
@Component({
  selector: 'app-treatmentsheet',
  templateUrl: './treatmentsheet.page.html',
  styleUrls: ['./treatmentsheet.page.scss'],
})
export class TreatmentsheetPage implements OnInit {
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
  @ViewChild('content', {static: false}) el!: ElementRef;
  clients: Object;
  treatment_id: any;

  constructor(public datepipe: DatePipe,private alert: AlertController,private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 

    
    this.patient = this.navParams.get('patient');
    this.client_id =  this.navParams.get('client_id');
    this.treatment_id =  this.navParams.get('treatment_id');
    let date = new Date()
    this.date = this.datepipe.transform(date.toISOString(), 'yyyy-MM-ddTHH:mm')
this.getservices()
  

  }

 

  ngOnInit() {
  
  }
  makePDF(){
    let pdf = new jsPDF('p', 'mm', [297, 210]);
    pdf.setFont("Times-Roman")
    
    pdf.text("FURCARE VETERINARY CLINIC", 65, 10)
    pdf.text("______________________________________________________________", 10, 12)
    pdf.text("TREATMENT SHEET", 10, 20)
    pdf.text("Date/Day: "+ new Date().toISOString().slice(0,10), 130, 20)
    pdf.text("Diagnosis/Findings: "+ this.diagnosis, 15, 30)
  
    pdf.text("Patient Name: "+ this.patient.name, 15, 40)
    pdf.text("Breed: "+ this.patient.breed, 110, 40)
    
    pdf.text("BW: "+ this.bw, 15, 50)
    pdf.text("HR: "+ this.hr, 15, 60)
    pdf.text("MM: "+ this.mm, 15, 70)
    pdf.text("PR: "+ this.pr, 15, 80)

    pdf.text("Temp: "+ this.bw, 110, 50)
    pdf.text("RR: "+ this.hr, 110, 60)
    pdf.text("CRT: "+ this.mm, 110, 70)
    pdf.text("BCS: "+ this.pr, 110, 80)
    
    
    pdf.text("AM: "+ this.am, 15, 100)
    pdf.text("PM: "+ this.pm, 15, 110)
    
    pdf.text("Fluid/Rate: "+ this.fluid, 15, 140)

    pdf.text("Medication: "+ this.medication, 15, 160)
    pdf.text("Comments: "+ this.comments, 15, 230)
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    // pdf.save('Treatment Sheet.pdf');
    // let data = document.getElementById("content")

    // this.generatePDF(data)
  }

  // generatePDF(htmlContent){
  //   html2canvas(htmlContent).then(canvas=>{

  //     let imgWidth = 290;
  //     let imgHeight = (canvas.height * imgWidth/ canvas.width)
  //     const contentDataURL = canvas.toDataURL('image/pdf')
  //     let pdf = new jsPDF('l','mm','a4');
  //     var position = 10;
  //     pdf.addImage(contentDataURL, 'PNG', 0 , position, imgWidth, imgHeight);
  //     pdf.save('Treatment Sheet.pdf');
  //   })



  // }
 
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async addsheet(){
    const sheetadded = await this.toastController.create({
      message: 'Sheet added',
      duration: 2000
      
    });
    const sheetnotadded = await this.toastController.create({
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
            this.api.add(API_URL+"user/addsheet",formData).subscribe((res)=>{
    
    
    
            if(res == 1){
            
              sheetadded.present();
              this.modalCtrl.dismiss({
                'dismissed': true
              });;
    
            }else{
             
              sheetnotadded.present()
    
            }
    
              
            })
    
    
    
    
    
    
    
          }, err => {
            error.present();
            console.log(err);
            }
            
            
            )









      }else{


        sheetnotadded.present() 


      }
    
      // console.log(this.pm.join(', '))



  }



  getclients(){

    
      this.api.get(API_URL+"user/getclients").subscribe(res => {
   
       
          this.clients = res;
      
    }, err => {
      
    console.log(err);
    });

  }

  getservices(){
    this.api.get(API_URL+"user/gettreatmentsheet?patient="+this.patient.patient_id).subscribe((res)=>{
            this.treatment = res
            

    })



  }

  get sorttreatment(){
    return this.treatment.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }


  async markdeletetreatment(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deletetreatment(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getservices()
    
    })

    
  }

  deletetreatment(data){

    const formData: FormData = new FormData();
    formData.append('treatment_id', data.treatment_id)
    
      this.api.add(API_URL+"user/deletetreatment", formData).subscribe((res)=>{

          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }
  async opendit(data) {
    const modal=await this.modalCtrl.create( {

        component: editTreatmentsheetPage,
        componentProps: {

          patient: data,
          client_id: data,
          treatment_id: data,
 
        }


      }

    );

    await modal.present();
    await modal.onWillDismiss();
    this.getservices();

  }
}
