import { AfterViewInit, Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, AfterViewInit{
  @Output()
  closeContactEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

  mail = "robinogiacomo@gmail.com";

  constructor() { }

  ngOnInit(): void {
  }

  copyMailToClipboard() {
    navigator.clipboard.writeText(this.mail);
  }
  ngAfterViewInit() {
  }

  closeContact(){
    this.closeContactEvent.emit(true);
  }

}
