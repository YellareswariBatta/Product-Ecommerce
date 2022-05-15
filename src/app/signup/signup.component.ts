import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm : FormGroup | any;

  constructor(private snackBar: MatSnackBar,private router :Router,private formBuilder:FormBuilder,private service:SignupService) { }

  ngOnInit(): void {

    this.signupForm= this.formBuilder.group({
      username:['',[Validators.required,Validators.pattern('^[A-Za-z0-9 ]+$')]],
      fullName:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      mobile:['',[Validators.required,Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],

    })
  }
  get f(){
    return this.signupForm.controls;
  }
  onSubmit(){
    this.service.signUp(this.signupForm.value).subscribe(res =>{
      this.snackBar.open("Registered successfully", 'OK', { duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar'] });
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    err=>{
      alert("something went wrong");
    })
      
  }

}
