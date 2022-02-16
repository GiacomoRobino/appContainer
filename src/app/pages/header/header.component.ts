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
    tl.from(this.homeButtonElement, {duration: 2, x: 200});
    console.log('addHome');
  }
}
