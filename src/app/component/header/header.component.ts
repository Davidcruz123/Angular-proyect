import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Output() headerButtonClicked = new EventEmitter<string>();
  public collapsed = true;

  public onSelected(buttonSelected: string): void {
    this.headerButtonClicked.emit(buttonSelected);
  }

}
