import { Injectable,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  userDeleted = new EventEmitter<void>();

  constructor() {}

  notifyUserDeleted(){
    this.userDeleted.emit()
  }
  

}
