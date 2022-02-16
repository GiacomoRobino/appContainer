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

setHome(set:boolean){
  let tl = gsap.timeline();
  if(set){
    tl.to(this.homeButtonElement, {duration: 1, opacity: 1, width: "100%", ease: Power4.easeOut});
  }
  else{
    
    tl.to(this.homeButtonElement, {duration: 1, opacity: 0, width:"0px", ease: Power4.easeOut});
  }
  }
}
