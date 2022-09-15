import { Component } from '@angular/core';
import { Database , set, ref, update } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitrax';

  constructor(){

  }
}
