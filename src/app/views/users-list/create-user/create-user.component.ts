import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit{

  userForm : FormGroup

  constructor(private formBuilder : FormBuilder, private apiService: ApiServiceService, private snackbar : MatSnackBar, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      name : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      role : ['',[Validators.required]]
    })
  }

  errorMsg : string = ''
  userCreated : boolean = false;
  id : number = 0
  userStatus = 'Create User'

  ngOnInit(): void {
    this.route.params.subscribe((response:any)=>{
      this.id = +response['id']
    })
    if(this.id!= 0 && !isNaN(this.id)){
      this.apiService.getParticularUser(this.id).subscribe((response:any)=>{
        if(response){
          this.userForm.get('name')?.patchValue(response.name)
          this.userForm.get('email')?.patchValue(response.email)
          this.userForm.get('role')?.patchValue(response.role)
          this.userStatus = 'Edit User'
        }
      })
    }
  }

  userPayload(){
    const payload : any = {
      name : this.userForm.get('name')?.value,
      email : this.userForm.get('email')?.value,
      role : this.userForm.get('role')?.value
    }
    return payload
  }

  createUser(){
    debugger
    this.markFormGroupTouched(this.userForm);
    if(this.userForm.invalid){
      return;
    }
    if(this.id === 0 || isNaN(this.id)){
      this.apiService.createUser(this.userPayload()).subscribe((response:any)=>{
        if(response){
          this.snackbar.open('User Created Successfully!','Close',{
            duration : 3000,
          })
        }
      },(error)=>{
        this.errorMsg = error
      })
    }else{
      debugger
      this.apiService.updateUser(this.userPayload(),this.id).subscribe((response:any)=>{
        if(response){
          this.snackbar.open('User Edited Successfully!','Close',{
            duration : 3000,
          })
        }
      },(error)=>{
        this.errorMsg = error
      })
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
