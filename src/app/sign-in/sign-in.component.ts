import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signInWithEmailAndPassword } from "@angular/fire/auth";
import { Database} from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  myReactiveLoginForm!: FormGroup;

  constructor(public auth: Auth , public database: Database, public router : Router) { }

  ngOnInit(): void {
    this.myReactiveLoginForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  onLoginForm(email : string, password : string){
    console.log(this.myReactiveLoginForm.value);

    // const auth = getAuth();
  signInWithEmailAndPassword(this.auth, email , password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    alert("User signed in")
    this.router.navigate(['/signUp'])
    this.myReactiveLoginForm.reset();
  })
  .catch((error) => {
    alert("something went wrong");
  });
  }

}
