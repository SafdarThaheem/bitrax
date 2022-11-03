import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signInWithEmailAndPassword, Auth, user} from "@angular/fire/auth";
import { Router } from '@angular/router';
import {AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

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
    public db : AngularFireDatabase) {}

  ngOnInit(): void {
    // initialized the MyReactiveForm Properties
    this.myReactiveLoginForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  // SignIn user Authentication
  onLoginForm(email : string, password : string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.uid;
      alert("User signed in " + user)
      this.getLoginDetails(user)
    
      this.myReactiveLoginForm.reset();
    }).catch((error) => {
      alert("something went wrong");
    });
  } 

  // Get login user Detail for Realtime Database
  getLoginDetails(userID : string){
    this.db.database
      .ref('users/superAdmin/')
      .child(userID)
      .once('value')
      .then(snapshot => {
        if(snapshot.exists()){
          console.log(snapshot.val())
        }
      }).catch(error => {
        console.log(error)
      }) 
  }

}
