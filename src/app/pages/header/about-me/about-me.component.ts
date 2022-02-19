import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
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
