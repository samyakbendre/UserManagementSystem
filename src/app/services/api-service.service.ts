import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Environment } from '../environment/environment';
import { userList } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient) { }

  getUserList(){
    return this.http.get(Environment.baseUrl + 'posts')
  }

  createUser(payload : userList){
    return this.http.post(Environment.baseUrl + 'posts',payload)
  }

  getParticularUser(id:number){
    return this.http.get(Environment.baseUrl + 'posts/'+id)
  }

  updateUser(payload:userList,id:number){
    return this.http.patch(Environment.baseUrl + 'posts/'+ id ,payload)
  }

  deleteUser(id:number){
    return this.http.delete(Environment.baseUrl + 'posts/'+ id)
  }
}
