import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('contactMeContainer') contactMeContainer: any;
  @ViewChild('aboutMeContainer') aboutMeContainer: any;
  @ViewChild('home') homeButton: any;
  homeButtonElement : any;
  contactMe = {text: "contact me", active: false, initialized: false};
  aboutMe = {text: "contact me", active: false, initialized: false};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['']);
  }

  ngAfterViewInit(): void {
  this.homeButtonElement = this.homeButton.nativeElement;}

setHome(set:boolean){
  let tl = gsap.timeline();
  if(set){
    tl.to(this.homeButtonElement, {duration: 1, opacity: 1, width: "100%", ease: Power4.easeOut});
  }
  else{
    
    tl.to(this.homeButtonElement, {duration: 1, opacity: 0, width:"0px", ease: Power4.easeOut});
  }
  }
  activateContactMe(){
    this.aboutMe.initialized = false;
    this.contactMe.initialized = !this.contactMe.initialized ;
    this.contactMe.text = this.contactMe.initialized ? "CLOSE" :"contact me";
    /*
    this.contactMe.initialized = true;
    this.contactMe.active = !this.contactMe.active;
    this.contactMe.text = this.contactMe.active ? "close" :"contact me";
    let tl = gsap.timeline();
    if(!this.contactMe.active){
    tl.set(this.contactMeContainer.nativeElement, {css:{zIndex:1}})
    .to(this.contactMeContainer.nativeElement, {duration: 1, y: -2000, ease: Power4.easeOut});
    }
    if(this.contactMe.active){
    tl.set(this.contactMeContainer.nativeElement, {css:{zIndex:1}})
    .to(this.contactMe
    Container.nativeElement, {duration: 0.5, y: 0, ease: Power4.easeIn});
    }*/
  }
  activateAboutMe(){
    this.contactMe.initialized = false;
    this.aboutMe.initialized = !this.aboutMe.initialized ;

    this.aboutMe.text = this.aboutMe.initialized ? "CLOSE" :"contact me";
  }
}
