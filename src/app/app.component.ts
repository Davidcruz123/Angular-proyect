import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public tabSelected = "recipe-button";

  public onheaderButtonClicked(buttonPressed:"recipe-button"|"shopping-list-button"):void{
    this.tabSelected= buttonPressed;
  }

}

