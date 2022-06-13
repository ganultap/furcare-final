import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/Storage'
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usertype: string;
  authenticationState = new BehaviorSubject(false);
 
  notloggedin = new BehaviorSubject(true);
  constructor(private storage: Storage, private plt: Platform, private router: Router) { 
      this.plt.ready().then(()=>[
        this.checkToken()
      ])
  }

  login(data){
    return this.storage.set(TOKEN_KEY, data).then(()=>{
      this.authenticationState.next(true);
      this.notloggedin.next(false);
     
        
      this.storage.get(TOKEN_KEY).then((res)=>{
        if(res){
          
          this.router.navigate(['','admin'])
  
        }
  
      })
      
    });
  
  }

  
  logout(){
    return this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
      this.notloggedin.next(true);
     
      
    });
    
  }
  isAuthenticated(){
    return this.authenticationState.value;
    
  } 
  isnotAuthenticated(){
    return this.notloggedin.value
    
  }
  
  

  checkToken(){
    return this.storage.get(TOKEN_KEY).then((res)=>{
      if(res){
        
        this.authenticationState.next(true);
        this.notloggedin.next(false);
       
        this.router.navigate(['admin'])
        
         
      }
      else{
        this.router.navigate(['login'])
      }


   

    })
    
  } 
}


