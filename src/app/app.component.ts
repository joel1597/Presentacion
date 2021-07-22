import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'angularJS';
  public mensaje: string;

  constructor(){
  	 this.mensaje = "hola como estas";
  }


}
