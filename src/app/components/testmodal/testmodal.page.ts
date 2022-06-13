import { Component, ElementRef, OnInit, ViewChild, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotomodalPage } from '../../components/photomodal/photomodal.page';
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';

import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { jsPDF } from 'jspdf'
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

const API_URL = environment.API_URL
@Component({
  selector: 'app-testmodal',
  templateUrl: './testmodal.page.html',
  styleUrls: ['./testmodal.page.scss'],
})
export class TestmodalPage implements OnInit {
  veterinarian: any  = ''
  test: any = []
  patient: any = []
  title = 'SADASDASD'

  BUN: any = ''
  Glu: any  = ''
  ALP: any  = ''
  Tpro: any  = ''
  GPT: any  = ''
  Cre2: any = '' 
  status = "on"
  user_Id: any;
  client_id: any;
  date: any;
  @ViewChild('content', {static: false}) el!: ElementRef;
  clients: Object;
  test_id: any;

  constructor(public datepipe: DatePipe,private alert: AlertController,private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 

    
    this.patient = this.navParams.get('patient');
    this.client_id =  this.navParams.get('client');
    this.test_id =  this.navParams.get('test_id');
    let date = new Date()
    this.date = this.datepipe.transform(date.toISOString(), 'yyyy-MM-ddTHH:mm')
this.getbloodchem()
  

  }

 

  ngOnInit() {
  
  }
  makePDF(){
    let pdf = new jsPDF('p', 'mm', [297, 210]);
    pdf.setFont("Times-Roman")
    
    pdf.text("FURCARE VETERINARY CLINIC", 65, 10)
    pdf.text("______________________________________________________________", 10, 12)
    pdf.text("Blood Chem SHEET", 10, 20)
    pdf.text("Date/Day: "+ new Date().toISOString().slice(0,10), 130, 20)
  
    pdf.text("Patient Name: "+ this.patient.name, 15, 40)
    pdf.text("Breed: "+ this.patient.breed, 110, 40)
    
    pdf.text("BUN: "+ this.BUN, 15, 50)
    pdf.text("Glu: "+ this.Glu, 15, 60)
    pdf.text("ALP: "+ this.ALP, 15, 70)
    pdf.text("Tpro: "+ this.Tpro, 15, 80)

    pdf.text("GPT: "+ this.BUN, 110, 50)
    pdf.text("Cre2: "+ this.Glu, 110, 60)
    
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    // pdf.save('Blood Chem Sheet.pdf');
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
  //     pdf.save('Blood Chem Sheet.pdf');
  //   })



  // }
 
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async addbloodchem(){
    const testadded = await this.toastController.create({
      message: 'Sheet added',
      duration: 2000
      
    });
    const testnotadded = await this.toastController.create({
      message: 'Invalid Inputs',
      duration: 2000
      
    });
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });



    if(this.BUN
      ){
          
          this.api.userinfo().then((user)=>{
            const formData: FormData = new FormData();

            formData.append('BUN', this.BUN)
            formData.append('Glu', this.Glu)
            formData.append('ALP', this.ALP)
            formData.append('Tpro', this.Tpro)
            formData.append('GPT', this.GPT)
            formData.append('Cre2', this.Cre2)
            formData.append('patient', this.patient.patient_id)
            formData.append('user', user.user_id)
            formData.append('client', this.client_id)
            formData.append('veterinarian', this.veterinarian)
            formData.append('date',  this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm'))
            this.api.add(API_URL+"user/addbloodchem",formData).subscribe((res)=>{
                 
             
    
            if(res){
              console.log(res)
              testadded.present();
              this.modalCtrl.dismiss({
                'dismissed': true
              });
    
            }else{
             
              testnotadded.present()
    
            }
    
              
            })
    
    
    
    
    
    
    
          }, err => {
            error.present();
            console.log(err);
            }
            
            
            )









      }else{


        testnotadded.present() 


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

  getbloodchem(){
    this.api.get(API_URL+"user/getbloodchem?patient="+this.patient.patient_id).subscribe((res)=>{
            this.test = res
            console.log(res)
 
    })



  }

  get sorttest(){
    return this.test.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }


  async markdeletetest(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deletetest(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getbloodchem()
    
    })

    
  }

  deletetest(data){

    const formData: FormData = new FormData();
    formData.append('test_id', data.test_id)
    
      this.api.add(API_URL+"user/deletetest", formData).subscribe((res)=>{

          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }

}
