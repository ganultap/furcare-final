import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddpetmodalComponent } from './addpetmodal/addpetmodal.component';
import { EditpetmodalPage } from './editpetmodal/editpetmodal.page';
import { AddpetPage } from './addpet/addpet.page';

import { ApiService } from '../services/api.service';
import { ServicepopComponent } from '../components/servicepop/servicepop.component';
import { PopoverController, AlertController } from '@ionic/angular';
import { ScheduleModalPage } from '../components/schedule-modal/schedule-modal.page';
import { TreatmentsheetPage } from '../components/treatmentsheet/treatmentsheet.page';
import { MedicalhistoryPage } from '../components/medicalhistory/medicalhistory.page';


import { environment } from '../../environments/environment';
import { CbcPage } from '../components/cbc/cbc.page';
const API_URL = environment.API_URL
declare var myFunction;
@Component({
  selector: 'app-petdashboard',
  templateUrl: './petdashboard.page.html',
  styleUrls: ['./petdashboard.page.scss'],
})
export class PetdashboardPage implements OnInit {
  currclient: any = []  
  client_id: any;
  patients: any = []
  patientsfilter: any = []
  constructor(private alertCtrl: AlertController,private popover: PopoverController,private route:ActivatedRoute,private api: ApiService,private router:Router,private storage: Storage,private modalCtrl: ModalController) {

    this.getpatients();
    
  
   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    
    
    
  }
  async openadd(){
    this.client_id = this.route.snapshot.params['client_id']
    const modal = await this.modalCtrl.create({
      component: AddpetPage,
      componentProps:{ client_id: this.client_id

        
      }
    

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getpatients();
    
  }
  async servicepop(ev:any, data){
  
    const popover = await this.popover.create({
      event: ev,
      component: ServicepopComponent,
      cssClass: 'service-popover',
      componentProps: {
        client_id: this.client_id,
        patient_id:  data.patient_id


      }
      
    })
    return await popover.present()


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

  get sortPatients(){
    return this.patientsfilter.sort((a, b) => {
      return <any>new Date(b.patient_date_added) - <any>new Date(a.patient_date_added);
    });
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

async schedule(patient_id){

  const modal = await this.modalCtrl.create({
    component: ScheduleModalPage,
    cssClass: 'cal-modal',
    componentProps: {
      client_id : this.client_id,
      patient_id: patient_id



    }
    

  });
  
  await modal.present();
  await modal.onWillDismiss();

  
}

async medhistory(data){
  const modal = await this.modalCtrl.create({
    component: MedicalhistoryPage,
    cssClass: 'servicemodal',
    componentProps: {
      client_id : this.client_id,
      patient: data



    }

  });
  
  await modal.present();
  await modal.onWillDismiss();




}






async treatment(data){

  const modal = await this.modalCtrl.create({
    component: TreatmentsheetPage,
   
    componentProps: {
      client_id : this.client_id,
      patient: data



    },
    backdropDismiss:false

  });
  
  await modal.present();
  await modal.onWillDismiss();

  
}

async cbc(data){

  const modal = await this.modalCtrl.create({
    component: CbcPage,
   
    componentProps: {
      client_id : this.client_id,
      patient: data



    }
    

  });
  
  await modal.present();
  await modal.onWillDismiss();

  
}


async markdeletepatient(data){
 
  const alert = await this.alertCtrl.create({
 
    header: "Deleting Patient",
    subHeader: "",
    message: "Are you sure?", 
    buttons: ['Cancel', {
  
      text: 'Delete',
      handler: ()=>{
        
        this.deletepatient(data)
  
      }
  
    }],
  });
  alert.present();
  alert.onDidDismiss().then(()=>{
  
      this.getpatients()
  
  })

  
}

deletepatient(data){
  
  const formData: FormData = new FormData();
  formData.append('patient_id', data.patient_id)
  
    this.api.add(API_URL+"user/deletepatient", formData).subscribe((res)=>{
    
        if(res == "success"){

          

        }
        if(res== "error"){

          console.log("failed")
        }
          
    })

  
}




async opendit(data){
  const modal = await this.modalCtrl.create({
    component: EditpetmodalPage,
   componentProps: {

    patient: data,
    client_id: this.client_id
   }
  

  });
  
  await modal.present();
  await modal.onWillDismiss();
  this.getpatients();
  
}


}
