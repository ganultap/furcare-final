import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';

import { Storage } from '@ionic/Storage'
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

const TOKEN_KEY = 'auth-token'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
 
})
export class AppComponent {
   user: any
  constructor(
    private authService: AuthenticationService,
    private platform: Platform,
  
    private storage: Storage,
   
    private router: Router
 
    ) {
    this.initializeApp();

    // this.storage.get(TOKEN_KEY).then((res)=>{
    //   if(res){
    //     this.authService.notloggedin.next(false);

    //   }

    // })

   
  }
  

  initializeApp(){
    // if(this.router['routerState'].snapshot.url== ""){
    //   this.router.navigate(['login'])
    // }
    
   this.platform.ready().then(()=>{
     
      
      this.authService.checkToken();
   })

  }

  
}
