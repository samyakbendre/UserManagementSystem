import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../../services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersListComponent } from '../../views/users-list/user-list/users-list.component';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent{

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private apiService : ApiServiceService, private snackbar : MatSnackBar, private commonApiService:CommonServiceService) {
    this.userId = data? data.inputValue : '';
  }

  userId : number = 0

  deleteUser(){
    this.apiService.deleteUser(this.userId).subscribe((response:any)=>{
      if(response){
        this.dialogRef.close()
        this.snackbar.open('User Deleted Successfully!','Close',{
          duration : 3000,
        })
        this.commonApiService.notifyUserDeleted();
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
