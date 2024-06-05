import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { userList } from '../../../interfaces/interface';
import { ApiServiceService } from '../../../services/api-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../../popups/delete-user/delete-user.component';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  constructor(private apiService : ApiServiceService, private router:Router,private snackbar : MatSnackBar, private matDialog : MatDialog,
    private commonService : CommonServiceService
  ) {}

  @ViewChild(MatPaginator) paginator! : MatPaginator
  @ViewChild(MatSort) sort! : MatSort


  POSTS : any [] = []

  displayedColumns : string [] = ['name','email','role','edit','delete']
  dataSource = new MatTableDataSource<userList>(this.POSTS);

  ngOnInit(): void {
    this.getUserList()
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.commonService.userDeleted.subscribe(()=>{
      this.getUserList()
    })
    console.log('its wentews')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUserList(){
    this.apiService.getUserList().subscribe((response:any)=>{
      this.POSTS = response
      this.dataSource.data = this.POSTS;
    })
  }

  deleteUser(id : number){
    const dialogRef : MatDialogRef<DeleteUserComponent> = this.matDialog.open(DeleteUserComponent,{
      width : '400px',
      height : '130px',
      data : {inputValue : id}
    })
    dialogRef.afterClosed().subscribe(result =>{

    })
    // this.apiService.deleteUser(id).subscribe((response:any)=>{
    //   if(response){
    //     this.snackbar.open('User Deleted Successfully!','Close',{
    //       duration : 3000,
    //     })
    //     this.getUserList()
    //   }
    // },(error=>{
    //   this.snackbar.open('Error Encountered!','Close',{
    //     duration : 3000,
    //   })
    // }))
  }

  editUser(id :number){
    this.router.navigate(['/create-user',id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
