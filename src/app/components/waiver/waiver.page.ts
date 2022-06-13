import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotomodalPage } from '../../components/photomodal/photomodal.page';
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';
import { jsPDF } from 'jspdf';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

const API_URL = environment.API_URL

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.page.html',
  styleUrls: ['./waiver.page.scss'],
})
export class WaiverPage implements OnInit {
  page = 1;
  count = 0;
  tableSize = 5 ;
  page1 = 1;
  count1 = 0;
  tableSize1 = 5 ;
  page2 = 1;
  count2 = 0;
  tableSize2 = 5 ;

  photoinput: any
  link: any ;
  status = "on"
  date = new Date()
  patient: any = []
  client  : any = []
  x: any ;
  client_id: any;
  patient_id: any;
  weight: any;

  service: any;
  veterinarian: any;
  against: any;
  services: any = []
  allservices: any = []
  mobile: any
  confinement: any = []
  signatureinput: any
  selectedphoto: File
  selectedsignature: File
  photo: any ;
  estimated_cost: any
  deposit: any
  date_of_addmision: any
  date_of_release: any
  confinement_procedure: any
  clients: Object;
  constructor(private DomSanitizer: DomSanitizer,private popover: PopoverController,private alert: AlertController,public datepipe: DatePipe,private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) { 



  }
  

  ngOnInit() {
   
    this.x = this.navParams.get('x');
    this.patient = this.navParams.get('patient');
    this.client = this.navParams.get('client');
    this.client_id = this.navParams.get('client_id');
    this.patient_id = this.navParams.get('patient_id');

    if (window.screen.width < 600) { // 768px portrait
      this.mobile = true;
     
    }
   
  }

  makePDF(){
    let pdf = new jsPDF('p', 'mm', [297, 210]);
    pdf.setFont("Verdana")
    
    pdf.text("FURCARE VETERINARY CLINIC", 65, 10)
    pdf.text("______________________________________________________________", 10, 12)
    pdf.text("Vaccination Form", 10, 20)
    pdf.text("Date/Day: "+ new Date().toISOString().slice(0,10), 130, 20)
  
  
    pdf.text("Patient Name: "+ this.patient.name, 15, 30)
    pdf.text("Breed: "+ this.patient.breed, 110, 30)
    
    pdf.text("Weight (in Kg): "+ this.weight, 15, 50)
    pdf.text("Vaccination for: "+ this.against, 15, 60)

    pdf.text("Veterinarian: "+ this.veterinarian, 15, 160)

    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    // pdf.save('Treatment Sheet.pdf');
    // let data = document.getElementById("content")

    // this.generatePDF(data)
  }

  onTableDataChange(event){
    this.page = event;
   
  } 
  onTableDataChange1(event){
    this.page1 = event;

  } 
  onTableDataChange2(event){
    this.page2 = event;

  } 
 
  async image(){
    const modal = await this.popover.create({
      component: PhotomodalPage,
      cssClass: 'photo-popover',
      componentProps: {

       
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then((res)=>{
      if(res.data == ''){
          this.photo = '';

      }
      else{

        this.photo = res.data
        this.link = "assets/photos/"+this.photo+".jpg"
      }
     console.log(this.photo)


  })

    
  
  }

  async viewphoto(photo){

    const modal = await this.popover.create({
      component: ViewphotopopPage,
      cssClass: 'viewphoto-popover',
      componentProps: {
        photo: photo
       
      }
    
  
    });
    
    await modal.present();



  }
waiver(){

  
 let date1 = new Date(this.date_of_addmision)

 

  }
}


    


