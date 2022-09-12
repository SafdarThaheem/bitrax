import { Component } from '@angular/core';
import { Database , set, ref, update } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitrax';

  constructor(public database: Database){

  }

  registerUser(user:any){
    set(ref(this.database, 'users/' + user.email), {
      email: user.email,
      password: user.password
    });
    alert("User have been added")

  }
}
