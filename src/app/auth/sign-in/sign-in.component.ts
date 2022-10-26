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
    this.myReactiveLoginForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }


  onLoginForm(email : string, password : string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user.uid;
      alert("User signed in " + user)
      // this.fetchData(user)
      this.getUserRec(user)
    
      this.myReactiveLoginForm.reset();
    }).catch((error) => {
      alert("something went wrong");
    });
  } 


//  userPro: Observable<any[]> | undefined; 
//  fetchData(uUid: string){
//     this.userPro = this.db.list("users/superAdmin/" + uUid ).valueChanges()
//     let Subscription = this.userPro.subscribe(u => console.log(u))
//     Subscription.unsubscribe();
//   }

  ngOnDestroy() {
  }

  
  getUserRec(userID : string){
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
