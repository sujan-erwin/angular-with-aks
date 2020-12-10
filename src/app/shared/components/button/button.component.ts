import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() label: string;
  @Input() isBlock = false;
  @Input() disabled = false;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() isPrimary = false;
  @Input() isSecondary = false;
  @Input() isOutlinePrimary = false;
  @Input() isOutlineSecondary = false;

  @Output() btnclicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  clicked(event) {
    console.log('the event is ', event);
    this.btnclicked.emit();
  }

}
