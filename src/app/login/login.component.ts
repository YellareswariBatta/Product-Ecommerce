import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup | any;
  resList : any=[];
  user :boolean = false;

  constructor(private snackBar:MatSnackBar,private formBuilder:FormBuilder,private service:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group ({
      check:[''],
      username:['',[Validators.required,Validators.pattern('^[A-Za-z0-9 ]+$')]],
      password:['',[Validators.required]]

    })
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.service.getUsers().subscribe(res=>{
      this.resList=res;
      this.resList.forEach((element:any)=> {
        if(element.username === this.f.username.value && element.password === this.f.password.value){
          this.user = true;
          localStorage.setItem('currentUser',element.username);
        }
      });
      if(this.user){
        this.snackBar.open("login Successful",'OK', {duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']});
        this.loginForm.reset();
        this.router.navigate(['/order'])
      }
      else{
        this.snackBar.open("User not found",'Please Register', {duration: 2000,verticalPosition: 'top',panelClass: ['red-snackbar']});
      }
    });
  }

}
