import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Particle } from './model';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-particle-network',
  templateUrl: './particle-network.component.html',
  styleUrls: ['./particle-network.component.scss'],
})
export class ParticleNetworkComponent implements OnInit, AfterViewInit {
  @ViewChild ('canvas') canvasReference : any;
  public canvas: any;
  public netActivated = true;
  public netType = "poly";
  public renderedFrames = 0;
  public h: number = 0;
  public w: number = 0;
  public loopId: number = 0;
  public id: number = 0;
  public ctx: any;
  public particles: any[] = [];
  public options = {
    particleColor: 'rgba(255,255,255)',
    lineColor: 'rgba(0,181,255)',
    particleAmount: 4,
    defaultRadius: 0.5,
    variantRadius: 0.5,
    defaultSpeed: 1,
    variantSpeed: 1,
    linkRadius: 100,
  };

  public staticParticleOptions = {    
  particleColor: 'rgba(255,255,255)',
  lineColor: 'rgba(0,181,255)',
  particleAmount: 4,
  defaultRadius: 0.5,
  variantRadius: 0.5,
  defaultSpeed: 0,
  variantSpeed: 0,
  linkRadius: 100,
};
  value: number = 100;
  sliderOptions: Options = {
    floor: 4,
    ceil: 1500,
  };
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas =this.canvasReference.nativeElement;
    this.canvas.width = window.innerWidth * 0.87;
    this.canvas.height = window.innerHeight * 0.7;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    window.addEventListener("click", (event) => {
      this.particles.push(new Particle(event.offsetX, event.offsetY, this.staticParticleOptions, this.ctx, false));})
    this.ctx = this.canvas.getContext('2d');
    this.initializeElements();
    this.startAnimation();
  }

  reset() {
    this.initializeElements();
    this.startAnimation();
	  //this.particles.push(new Particle(this.w, this.h, this.options, this.ctx));
  }

  initializeElements() {
    this.particles = this.particles.filter(x=>!x.value);
    for (let i = 0; i < this.options.particleAmount; i++) {
      this.particles.push(new Particle(this.w, this.h, this.options, this.ctx));
      //this.particles.push(new Particle(this.w, this.h, this.staticParticleOptions, this.ctx));
    }

  }


  startAnimation() {
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  activateNet() {
    this.netActivated = !this.netActivated;
  }

  animationLoop() {
    this.renderedFrames ++;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawScene();
    requestAnimationFrame(this.animationLoop.bind(this));
  }


  drawScene() {
    this.drawLine();
    this.drawParticle();
  }

  drawParticle() {
    for (let particle of this.particles) {
      particle.update();
      particle.draw();
    }
  }

  drawLine() {
    for (let particle of this.particles) {
      if(this.netType === "poly") {
      this.linkPointsPoly(particle, this.particles);}
      else {
        this.linkPoints(particle, this.particles);
      }
    }
  }

  
  linkPoints(point: any, hubs: Particle[]) {
    point.radius = 0.5;
    let particleNeighborsNumber = point.radius;
    for (var i = 0; i < hubs.length; i++) {
      var distance = this.checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
      var opacity = 1 - distance / this.options.linkRadius;
      if (opacity > 0) {
        //particleNeighborsNumber += 0.3;
        if (this.netActivated && point.valid && !(hubs[i].valid)){
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = 'rgba(100,100,200,' + opacity + ')';
        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(hubs[i].x, hubs[i].y);
        this.ctx.closePath();
        this.ctx.stroke();}
      }
    }
    point.radius = particleNeighborsNumber;
  }
  

  linkPointsPoly(point: any, hubs: any[]) {
    point.radius = 0.5;
    let particleNeighborsNumber = point.radius;
    let neighbors = [];
    for (var i = 0; i < hubs.length; i++) {
      var distance = this.checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
      var opacity = 1 - distance / this.options.linkRadius;
      if ((opacity > 0 ) && hubs[i].valid) {
        //particleNeighborsNumber += 0.3;
        if (this.netActivated){
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = 'rgb(100,100,200)';
        neighbors.push(hubs[i]);
        }
      }
    }
    if (neighbors.length > 0 && this.netActivated) {
      this.ctx.beginPath();
      for(let neighbor of neighbors) {
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(neighbor.x, neighbor.y);
        this.ctx.moveTo(point.x, point.y);}
      this.ctx.closePath();
      this.ctx.stroke();
    }
    point.radius = particleNeighborsNumber;
  }
  switchNetType() {
    this.netType === "poly" ? this.netType = "single" : this.netType = "poly";
  }
  checkDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
