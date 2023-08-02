import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent {
  @Input() message:string;
  @Output() close = new EventEmitter<void>();

  public onClose():void {
    this.close.emit();
  }
}
