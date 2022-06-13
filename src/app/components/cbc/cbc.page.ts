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
  selector: 'app-cbc',
  templateUrl: './cbc.page.html',
  styleUrls: ['./cbc.page.scss'],
})
export class CbcPage implements OnInit {
  veterinarian: any  = ''
  cbc: any = []
  patient: any = []
  title = 'SADASDASD'
  wbc: any = ''
  lymph_num: any  = ''
  mon_num: any  = ''
  gran_num: any  = ''
  lymph_pct: any  = ''
  mon_pct: any = '' 
  gran_pct: any = ''
  rbc: any  = ''
  hgb: any  = ''
  hct: any  = ''
  mcv: any  = ''
  mch: any  = ''
  mchc: any  = ''
  rdw: any  = ''
  plt: any  = ''
  mpv: any  = ''
  pdw: any  = ''
  pct: any  = ''
  eos_pct: any  = ''
  status = "on"
  user_Id: any;
  client_id: any;
  date: any;
  @ViewChild('content', {static: false}) el!: ElementRef;
  clients: Object;
  cbc_id: any;

  constructor(public datepipe: DatePipe,private alert: AlertController,private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 

    
    this.patient = this.navParams.get('patient');
    this.client_id =  this.navParams.get('client');
    this.cbc_id =  this.navParams.get('cbc_id');
    let date = new Date()
    this.date = this.datepipe.transform(date.toISOString(), 'yyyy-MM-ddTHH:mm')
    this.getcbc()
  

  }

 

  ngOnInit() {
  
  }

  makePDF(){

    let pdf = new jsPDF('p', 'mm', [297, 210]);
    pdf.setFont("Verdana")
    
    pdf.text("FURCARE VETERINARY CLINIC", 65, 10)
    pdf.text("______________________________________________________________", 10, 12)
    pdf.text("CBC SHEET", 10, 20)
    pdf.text("Date/Day: "+ new Date().toISOString().slice(0,10), 130, 20)
  
  
    pdf.text("Patient Name: "+ this.patient.name, 15, 30)
    pdf.text("Breed: "+ this.patient.breed, 110, 30)
    
    pdf.text("WBC: "+ this.wbc, 15, 50)
    pdf.text("Lymph#: "+ this.lymph_num, 15, 60)
    pdf.text("Mon#: "+ this.mon_num, 15, 70)
    pdf.text("Gran#: "+ this.gran_num, 15, 80)

    pdf.text("Lymph%: "+ this.lymph_pct, 110, 50)
    pdf.text("Mon%: "+ this.mon_pct, 110, 60)
    pdf.text("Gran%: "+ this.gran_pct, 110, 70)
    pdf.text("RBC: "+ this.rbc, 110, 80)
    pdf.text("HGB: "+ this.hgb, 15, 90)
    pdf.text("HCT: "+ this.hct, 15, 100)
    pdf.text("MCH: "+ this.mch, 15, 110)
    pdf.text("MCHC: "+ this.mchc, 15, 120)
    pdf.text("RDW: "+ this.rdw, 110, 90)
    pdf.text("PLT: "+ this.plt, 110, 100)
    pdf.text("MPV: "+ this.mpv, 110, 110)
    pdf.text("PDW: "+ this.pdw, 110, 120)
    pdf.text("PCT: "+ this.pct, 15, 130)
    pdf.text("EOS%: "+ this.eos_pct, 110, 130)
    pdf.text("Veterinarian: "+ this.veterinarian, 15, 160)

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
  async addcbc(){
    const cbcadded = await this.toastController.create({
      message: 'Sheet added',
      duration: 2000
      
    });
    const cbcnotadded = await this.toastController.create({
      message: 'Invalid Inputs',
      duration: 2000
      
    });
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });



    if(this.wbc
      ){
          this.api.userinfo().then((user)=>{
            const formData: FormData = new FormData();
            formData.append('wbc', this.wbc)
            formData.append('lymph_num', this.lymph_num)
            formData.append('mon_num', this.mon_num)
            formData.append('gran_num', this.gran_num)
            formData.append('lymph_pct', this.lymph_pct)
            formData.append('mon_pct', this.mon_pct)
            formData.append('gran_pct', this.gran_pct)
            formData.append('rbc', this.rbc)
            formData.append('hgb', this.hgb)
            formData.append('hct', this.hct)
            formData.append('mcv', this.mcv)
            formData.append('mch', this.mch)
            formData.append('mchc', this.mchc)
            formData.append('rdw', this.rdw)
            formData.append('plt', this.plt)
            formData.append('mpv', this.mpv)
            formData.append('pdw', this.pdw)
            formData.append('pct', this.pct)
            formData.append('eos_pct', this.eos_pct)
            formData.append('patient', this.patient.patient_id)
            formData.append('user', user.user_id)
            formData.append('client', this.client_id)
            formData.append('veterinarian', this.veterinarian)
            formData.append('date',  this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm'))
            this.api.add(API_URL+"user/addcbc",formData).subscribe((res)=>{
    
    
    
            if(res == 1){
            
              cbcadded.present();
              this.modalCtrl.dismiss({
                'dismissed': true
              });;
    
            }else{
             
              cbcnotadded.present()
    
            }
    
              
            })
    
    
    
    
    
    
    
          }, err => {
            error.present();
            console.log(err);
            }
            
            
            )









      }else{


        cbcnotadded.present() 


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

  getcbc(){
    this.api.get(API_URL+"user/getcbc?patient="+this.patient.patient_id).subscribe((res)=>{
            this.cbc = res
            console.log(res)
 
    })


  }

  get sortcbc(){
    return this.cbc.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }



  async markdeletecbc(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deletecbc(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getcbc()
    
    })

    
  }

  deletecbc(data){

    const formData: FormData = new FormData();
    formData.append('cbc_id', data.cbc_id)
    
      this.api.add(API_URL+"user/deletecbc", formData).subscribe((res)=>{

          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }

}
