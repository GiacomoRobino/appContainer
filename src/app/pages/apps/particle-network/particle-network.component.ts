import { Component, OnInit } from '@angular/core';
import { Particle } from './model';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-particle-network',
  templateUrl: './particle-network.component.html',
  styleUrls: ['./particle-network.component.scss'],
})
export class ParticleNetworkComponent implements OnInit {
  public h: number = 0;
  public w: number = 0;
  public loopId: number = 0;
  public id: number = 0;
  public canvas: any;
  public ctx: any;
  public particles: any[] = [];
  public options = {
    particleColor: 'rgba(255,255,255)',
    lineColor: 'rgba(0,181,255)',
    particleAmount: 4,
    defaultRadius: 2,
    variantRadius: 2,
    defaultSpeed: 1,
    variantSpeed: 1,
    linkRadius: 100,
  };
  value: number = 100;
  sliderOptions: Options = {
    floor: 20,
    ceil: 150,
  };
  constructor() {}

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.canvas.width = window.innerWidth * 0.87;
    this.canvas.height = window.innerHeight * 0.7;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.initializeElements();
    this.startAnimation();
  }

  reset() {
	  this.particles.push(new Particle(this.w, this.h, this.options, this.ctx));
  }

  initializeElements() {
    for (let i = 0; i < this.options.particleAmount; i++) {
      this.particles.push(new Particle(this.w, this.h, this.options, this.ctx));
    }
  }

  startAnimation() {
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  animationLoop() {
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
      this.linkPoints(particle, this.particles);
    }
  }

  linkPoints(point: any, hubs: any[]) {
    for (var i = 0; i < hubs.length; i++) {
      var distance = this.checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
      var opacity = 1 - distance / this.options.linkRadius;
      if (opacity > 0) {
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = 'rgba(100,100,200,' + opacity + ')';
        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(hubs[i].x, hubs[i].y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }
  }

  checkDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
