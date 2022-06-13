import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { environment } from '../../environments/environment';
const API_URL = environment.API_URL
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(private http: HttpClient) { }


notification(){
  
  return this.http.get(API_URL+"user/getschedule2")


}









}




