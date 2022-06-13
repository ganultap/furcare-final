import { Component, OnInit, ViewChildren, VERSION } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationPage } from '../components/notification/notification.page';
import { ScheduleService } from '../services/schedule.service'
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from './../components/popover/popover.component';
import { Platform } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ViewphotopopPage } from './../components/viewphotopop/viewphotopop.page';



import { environment } from '../../environments/environment';

const API_URL = environment.API_URL
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  confined: any = []
  released: any = []
  allconfinement: any = []
  page = 1;
  count = 0;
  tableSize = 5 ;
  page1 = 1;
  count1 = 0;
  tableSize1 = 5 ;
  page2 = 1;
  count2 = 0;
  tableSize2 = 5 ;
  

  allservice: any = []
  page3 = 1;
  count3 = 0;
  tableSize3 = 5 ;
  page4 = 1;
  count4 = 0;
  tableSize4 = 5 ;
  page5 = 1;
  count5 = 0;
  tableSize5 = 5 ;
  status = "Clients"
  choice: any
  filteredservices: any = []
  filteredclients: any = []
  filteredpatients: any = []
  allservices: any = []
  allpatients: any = []
  allclients: any = []
  dailychoice: any
  monthlychoice: any
  weeklychoice: any
  date: any = []
  servicecount: any = []
  services: any = []
  currentuser: any = []
  notifydata2: any = []
  notifydata: any = []
  notifydata3: any = []
  notifydata4: any = []
 
  event: any = [];
  // chartData: ChartDataSets[] = [
  //   {data: [], label:'Services Made'}
  // ]
  // chartLabels: Label[]= []

  // chartOptions = {
    
  //   responsive: true,
  //   title: {
  //     display:true,
  //     text: 'Services Made'
  //   },
  //   pan: {
  //     enabled: true,
  //     mode: 'xy'

  //   },zoom: {
  //     enabled: true,
  //     mode: 'xy'

  //   }

  // };
  // chartType = 'bar';
  // showLegend = false;

  
  constructor(private DomSanitizer: DomSanitizer,private alert: AlertController,private datepipe: DatePipe,private platform:Platform,private popover: PopoverController,private modalCtrl: ModalController, private api: ApiService, private sched: ScheduleService, private router: Router, private authService: AuthenticationService) { 
    this.api.userinfo().then((data)=>{
      this.currentuser = data
      
    })
    
      // this.getservices()

      this.getclients()
      this.getpatients()
      this.getservices()
      this.getconfinement()
      
  }

  ngOnInit() {
  }


  getconfinement(){
    this.confined = []
    this.released = []
    this.allconfinement = []
  this.api.get(API_URL+"user/getallconfinement").subscribe((res)=>{

    this.allconfinement = res

    for(let i =0; i <this.allconfinement.length; i++){
      if(this.allconfinement[i].signature != ''){
        this.allconfinement[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/confinement/'+this.allconfinement[i].confinement_id+'/'+this.allconfinement[i].signature)

      }


    }
   for(let i =0; i<this.allconfinement.length; i++){
      if(this.allconfinement[i].released == 0){
        this.confined.push(this.allconfinement[i]);

      }
    }
      for(let i =0; i<this.allconfinement.length; i++){
        if(this.allconfinement[i].released == 1){
          this.released.push(this.allconfinement[i]);
  
        }


   }

})



  }
  get sortreleased(){
    return this.released.sort((a, b) => {
      return <any>new Date(b.date_of_release) - <any>new Date(a.date_of_release);
    });
  }
  get sortconfined(){
    return this.confined.sort((a, b) => {
      return <any>new Date(a.date_of_release) - <any>new Date(b.date_of_release);
    });
  }
  get sortconfinement(){
    return this.allconfinement.sort((a, b) => {
      return <any>new Date(a.released) - <any>new Date(b.released);
    });
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
  onTableDataChange3(event){
    this.page3 = event;

  } 
  onTableDataChange4(event){
    this.page4 = event;
   
  } 

  onTableDataChange5(event){
    this.page5  = event;
  
  } 


  get sortClients(){
    return this.filteredclients.sort((a, b) => {
      return <any>new Date(b.date_added) - <any>new Date(a.date_added);
    });
  }

  get sortPatients(){
    return this.filteredpatients.sort((a, b) => {
      return <any>new Date(b.patient_date_added) - <any>new Date(a.patient_date_added);
    });
  }

  get sortService(){
    return this.filteredservices.sort((a, b) => {
      return <any>new Date(b.patientname) - <any>new Date(a.patientname);
    });
  }

  
submit(){

let filtered = []
let filteredpatients = []
let filteredservices = []
if(this.choice == 'daily'){
for(let i =0 ; i < this.allclients.length; i++){
  let date_added = this.datepipe.transform(this.allclients[i].date_added, 'yyyy-MM-dd')
  if(this.dailychoice == date_added){
      filtered.push(this.allclients[i])


  }


}
this.filteredclients = filtered



for(let i =0 ; i < this.allpatients.length; i++){
  let patient_date_added = this.datepipe.transform(this.allpatients[i].patient_date_added, 'yyyy-MM-dd')
  if(this.dailychoice == patient_date_added){
      filteredpatients.push(this.allpatients[i])


  }


}
this.filteredpatients = filteredpatients



/////




for(let i =0 ; i < this.allservices.length; i++){
  let service_date = this.datepipe.transform(this.allservices[i].service_date, 'yyyy-MM-dd')
  if(this.dailychoice == service_date){
      filteredservices.push(this.allservices[i])


  }


}
this.filteredservices = filteredservices



}




else if(this.choice == 'weekly'){
  let weekarray = []
  let date = new Date(this.weeklychoice)
  let date2 = new Date(this.weeklychoice)

 let i = date.getDay()
 let i2 = date2.getDay()
 if(i==1){
    let i = date.getDay()
 for(i ;i<=7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()+1))

    
 }

 
}
else if(i == 0){
  for(i ;i<7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()-1))

    
 }

}
 else{
  for(i ;i<=7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()+1))

    
 }
 for(i2 ;i2>1;i2--){
  date2 = new Date(date2.setDate(date2.getDate()- 1))
  weekarray.push(this.datepipe.transform(date2,'yyyy-MM-dd'))
  


  
}



 }
  

for(let i =0;i< weekarray.length; i++){
  for(let z =0; z <this.allclients.length; z++){
    let date_added= this.datepipe.transform(this.allclients[z].date_added, 'yyyy-MM-dd')
      if(date_added == weekarray[i]){
        filtered.push(this.allclients[z])

      }

  }





}

this.filteredclients = filtered
  


////////
for(let i =0;i< weekarray.length; i++){
  for(let z =0; z <this.allpatients.length; z++){
    let patient_date_added= this.datepipe.transform(this.allpatients[z].patient_date_added, 'yyyy-MM-dd')
      if(patient_date_added == weekarray[i]){
        filteredpatients.push(this.allpatients[z])

      }

  }





}

this.filteredpatients = filteredpatients



  /////


  for(let i =0;i< weekarray.length; i++){
    for(let z =0; z <this.allservices.length; z++){
      let service_date= this.datepipe.transform(this.allservices[z].service_date, 'yyyy-MM-dd')
        if(service_date == weekarray[i]){
          filteredservices.push(this.allservices[z])
  
        }
  
    }
  
  
  
  
  
  }
  
  this.filteredservices = filteredservices
   
  
  }






else if(this.choice == 'monthly'){


  for(let i =0 ; i < this.allclients.length; i++){
    let date_added= this.datepipe.transform(this.allclients[i].date_added, 'yyyy-MM')
    if(this.monthlychoice == date_added){
      filtered.push(this.allclients[i])


  }



  }
  this.filteredclients = filtered
  
  ////
  for(let i =0 ; i < this.allpatients.length; i++){
    let patient_date_added= this.datepipe.transform(this.allpatients[i].patient_date_added, 'yyyy-MM')
    if(this.monthlychoice == patient_date_added){
      filteredpatients.push(this.allpatients[i])


  }



  }
  this.filteredpatients = filteredpatients



  ///
  for(let i =0 ; i < this.allservices.length; i++){
    let service_date= this.datepipe.transform(this.allservices[i].service_date, 'yyyy-MM')
    if(this.monthlychoice == service_date){
      filteredservices.push(this.allservices[i])


  }



  }
  this.filteredservices = filteredservices
  
   
    }
}
getpatients(){
  this.api.get(API_URL+"user/getallpatients").subscribe((res)=>{

    this.allpatients = res
    
})


}

getservices(){
  this.api.get(API_URL+"user/getallservice1").subscribe((res)=>{
    this.allservice = res
    let allservice:any = []
    allservice = res

    this.notif()
    for(let i =0;i<allservice.length;i++){
      if(allservice[i].done == 1){
        this.allservices.push(allservice[i])
        
      }


    }
    for(let i =0; i <this.allservices.length; i++){
      if(this.allservices[i].photo != ''){
        this.allservices[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/service/'+this.allservices[i].service_id+'/'+this.allservices[i].photo)

      }


    }
    
    
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


getclients(){
  this.api.get(API_URL+"user/getclients").subscribe((res)=>{

      this.allclients = res
      
  })


}
  ionViewWillEnter() {
    
    
   
  }

  // getservices(){
  //   this.api.get(API_URL+"user/getallservice").subscribe((res)=>{
  //           this.services = res
  //           console.log(this.services)
  //           for (let i = 0; i < this.services.length; i++) {
  //             if(this.date.indexOf(this.services[i].service_date) == -1){
  //                this.date.push(this.services[i].service_date);
         
                 
           
  //              }
  //              console
             
              
  //          }
  //          this.date.sort()  

  //          for (let i = 0; i < this.date.length; i++) {
  //           this.servicecount[i]=0;
      
  //           for(let x = 0; x <this.services.length; x++){
      
               
  //           if(this.date[i] == this.services[x].service_date){
               
  //              this.servicecount[i]+=1;
  //           }
      
  //           }
          
           
  //       }
  //       console.log(this.servicecount)


  //       for(let i =0 ; i <this.date.length ; i++){

  //         this.chartLabels.push(this.date[i]);
  //         this.chartData[0].data.push(this.servicecount[i]);

  //       }
  //       console.log('data', this.chartData)
         




  //   })



  // }


  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
        console.log(state);
        if(state){
          
         
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
       
        

      })

   })
  
    
  }



  notif(){
    this.event = []
    this.notifydata = []
    this.notifydata2 = []
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

        if(daysleft <= 2   && daysleft >= 0){

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


// sortBy(key){
//   this.sortKey = key;
//   this.sortDirection++;
//   this.sort();

// }
// sort(){
//   if(this.sortDirection == 1){
//       this.datauser = this.datauser.sort((a, b  )=>{
//         const valA = a[this.sortKey];
//         const valB = b[this.sortKey];
//         return valA.localeCompare(valB);

//       });
//   }else if(this.sortDirection==2){
//     this.datauser = this.datauser.sort((a, b  )=>{
//       const valA = a[this.sortKey];
//       const valB = b[this.sortKey];
//       return valB.localeCompare(valA);

//     });

//   }else{
//     this.sortDirection = 0 ;
//     this.sortKey = null;
//   }

// }
async alertrelease(data){


  const alert = await this.alert.create({
   
    header: "",
    subHeader: "",
    message: "Are you sure?", 
    buttons: ['Cancel', {
  
      text: 'Release',
      handler: ()=>{
        
        this.release(data)
  
      }
  
    }],
  });
  alert.present();
  alert.onDidDismiss().then(()=>{
  
    this.getconfinement()
  
  })
  }
  async alertrelease1(data){


    const alert = await this.alert.create({
     
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Release',
        handler: ()=>{
          
          this.release1(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
      this.getconfinement()
    
    })
    }
    release1(data){
      let date = new Date()
      const formData: FormData = new FormData();
      formData.append('confinement_id', data.confinement_id)
      
      
      this.api.add(API_URL+"user/release1", formData).subscribe((res)=>{
    
    
        if(res == "success"){
           
       
        }
    
    
    
      })
    
    
    }
release(data){
  let date = new Date()
  const formData: FormData = new FormData();
  formData.append('confinement_id', data.confinement_id)
  
  formData.append('date_of_release',this.datepipe.transform(date, 'yyyy-MM-dd HH:mm'))
  this.api.add(API_URL+"user/release", formData).subscribe((res)=>{


    if(res == "success"){
       
   
    }



  })


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
