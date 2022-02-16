import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  @ViewChild('home') homeButton: any;
  homeButtonElement : any;
  home = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['']);
  }

  ngAfterViewInit(): void {
  this.homeButtonElement = this.homeButton.nativeElement;
}

addHome(){
  let tl = gsap.timeline();
    tl.to(this.homeButtonElement, {duration: 2, height: "0%"});
    console.log('addHome');
    this.home = false;
  }
}
