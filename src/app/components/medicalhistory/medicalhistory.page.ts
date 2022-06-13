import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams, AlertController, PopoverController} from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';

import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  patientconfinement: any = []
  patienttreatment: any = []  
  patientservice: any = []
  patient: any = []
  client_id: any;
  client: any = []
  date = new Date().toISOString().slice(0,10)
  medicalhistory: any = []
  description: any;
  page1 = 1;
  count1 = 0;
  tableSize1 = 5 ;
  page2 = 1;
  count2 = 0;
  tableSize2 = 5 ;
  status= 'Service'
  page = 1;
  count = 0;
  tableSize = 5 ;
  mobile: boolean
  constructor(private popover: PopoverController,private DomSanitizer: DomSanitizer,private alert: AlertController,private api: ApiService,private navParams: NavParams, private modalCtrl: ModalController, private toastController: ToastController) {
    this.patient = this.navParams.get('patient');
    this.client_id = this.navParams.get('client_id');
    this.getcurrclient();
    this.getmedhis()
    this.getpatientservice()
    this.getpatienttreatment()
    this.getpatientconfinement()
    if (window.screen.width < 600) { // 768px portrait
      this.mobile = true;

     
    }

   }
   @ViewChild(IonContent) content: IonContent;

  ngOnInit() {
    
  }
  ionViewWillEnter() {
   

    
   
  }

  onTableDataChange1(event){
    this.page1 = event;

  } 

  
  onTableDataChange(event){
    this.page = event;

  } 
  onTableDataChange2(event){
    this.page2 = event;

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

  get sortservice(){
    return this.patientservice.sort((a, b) => {
      return <any>new Date(b.service_date) - <any>new Date(a.service_date);
    });
  }

  get sortconfinement(){
    return this.patientconfinement.sort((a, b) => {
      return <any>new Date(b.date_of_release) - <any>new Date(a.date_of_release);
    });
  }
  get sorttreatment(){
    return this.patienttreatment.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
getpatientservice(){
  this.api.get(API_URL+"user/getpatientservice?patient_id="+this.patient.patient_id).subscribe((res)=>{

    this.patientservice = res
    for(let i =0; i <this.patientservice.length; i++){
      if(this.patientservice[i].photo != ''){
        this.patientservice[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/service/'+this.patientservice[i].service_id+'/'+this.patientservice[i].photo)

      }


    }


  })


}

getpatientconfinement(){
  this.api.get(API_URL+"user/getconfinement?patient="+this.patient.patient_id).subscribe((res)=>{

    this.patientconfinement = res
    for(let i =0; i <this.patientconfinement.length; i++){
      if(this.patientconfinement[i].signature != ''){
        this.patientconfinement[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/confinement/'+this.patientconfinement[i].confinement_id+'/'+this.patientconfinement[i].signature)

      }


    }



  })


}
getpatienttreatment(){
  this.api.get(API_URL+"user/gettreatmentsheet?patient="+this.patient.patient_id).subscribe((res)=>{

    this.patienttreatment = res
 
    console.log(this.patienttreatment)

  })


}


  getcurrclient(){
    this.api.get(API_URL+"user/getcurrclient?client_id="+this.client_id).subscribe((res)=>{

        this.client = res[0];
        
    })


  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }

  async addmedhis(){

    const recordadded = await this.toastController.create({
      message: 'Record Added',
      duration: 2000
      
    });
 
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });
if(this.description){
    const formData: FormData = new FormData();
    formData.append('description', this.description)
    formData.append('patient', this.patient.patient_id)
    formData.append('client', this.client.client_id)
   
        this.api.add(API_URL+"user/addmedhis", formData).subscribe((res)=>{


                 if(res == 1){
                    recordadded.present()
                    this.getmedhis()
                   
                 }
                 else{
                  error.present()



                 }


        }, err => {
      
          error.present();
        }), err => {
      
          error.present();
        }
        this.description = "";

        
  }

 }

  getmedhis(){
        this.api.get(API_URL+"user/medhis?patient_id="+this.patient.patient_id).subscribe((res)=>{
                      this.medicalhistory = res;
                     for(let i =0 ; i < this.medicalhistory.length; i++){
                          this.medicalhistory[i].date = new Date(this.medicalhistory[i].date)
                          this.medicalhistory[i].date= this.medicalhistory[i].date.toString().slice(0,24)
                          


                     }

                 


        }, err => {
      
         console.log(err)
        }
        
        
        
        ), err => {
      
          console.log(err)
        }


  }


  async markdeletemedicalhistory(data){
 
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deletemedhis(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getmedhis()
    
    })

    
  }

  deletemedhis(data){
    
    const formData: FormData = new FormData();
    formData.append('med_id', data.med_id )
    
      this.api.add(API_URL+"user/deletemedhis", formData).subscribe((res)=>{
      
          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }

}
