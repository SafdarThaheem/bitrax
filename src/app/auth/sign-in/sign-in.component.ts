import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signInWithEmailAndPassword, Auth} from "@angular/fire/auth";
import { Router } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  myReactiveLoginForm!: FormGroup;

  constructor(
    public auth: Auth ,
    public router : Router,
    public db : AngularFireDatabase , 
    private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.myReactiveLoginForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }


  onLoginForm(email : string, password : string){

  signInWithEmailAndPassword(this.auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user.email;
    alert("User signed in " + user)
    this.fetchData()
  
    this.myReactiveLoginForm.reset();
  })
  .catch((error) => {
    alert("something went wrong");
  });
  } 

  public profileData : any;
  uEmail : string ='' ;
  id : any;


  fetchData(){
    this.afAuth.authState.subscribe(
      (res)=>{
        this.profileData = res?.uid;
        console.log(this.profileData)
      }
    )
    this.db.list('users/superAdmin/' + this.profileData).valueChanges().subscribe(details => {

   })
  }

}
