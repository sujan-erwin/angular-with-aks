import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IInputChanges } from 'src/app/core/models/input-changes';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {

  @Input() type = 'text';
  @Input() label: string;
  @Input() maxLength = 50;
  @Input() isBGGray = false;
  @Input() hasAction = false;
  @Input() hasActionIcn = 'eye';
  @Input() isDisabled: boolean;
  @Input() autofocus = false;
  @Input() placeHolder = '';
  @Input() pattern = '';
  @Input() inputmode = 'text ';
  @Input() min = 0;
  @Input() allowAlphaNumeric = false;
  @Input() isInline = false;
  @Input() isCharacterCount = false;
  @Input() inputText: string;
  @Input() helpingText: string;

  // for autofill input
  @Output() updateInputChange = new EventEmitter<IInputChanges>();
  @Output() actionChanges = new EventEmitter();
  @Output() keyPressChanges = new EventEmitter();
  @ViewChild('autofocus', { static: false }) private elementRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit(): void {
    if (this.autofocus) {
      this.elementRef.nativeElement.focus();
    }
  }

  inputChanges() {
    this.updateInputChange.emit({
      inputValue: this.inputText,
      label: this.label
    });
  }
  actionInfo() {
    this.actionChanges.emit();
  }
  keyPress(event: KeyboardEvent) {
    if (this.type === 'tel') {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    } else if (this.allowAlphaNumeric) {
        this.allowAlphaNumericSpace(event);
    }
  }
  focusIn(event: any) {
    this.keyPressChanges.emit();
  }

  allowAlphaNumericSpace(e) {
    const code = ('charCode' in e) ? e.charCode : e.keyCode;
    if (!(code === 32) && // space
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      e.preventDefault();
    }
  }

  showAndHidePassword() {
    if (this.type === 'password') {
       this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
