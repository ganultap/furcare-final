import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Storage } from '@ionic/Storage'
const TOKEN_KEY = 'auth-token'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private storage: Storage) { }


add(server, form){
  return this.http.post(server, form)


}
userinfo() {
  return this.storage.get(TOKEN_KEY)
 
   

 


}

get(server){
  return this.http.get(server)


}




}




