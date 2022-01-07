import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.scss']
})
export class HourglassComponent implements OnInit {
  c : any;
  canvas : any;


public startingPointX : number;
public startingPointY : number;
public endingPointX : number;
public endingPointY : number;
  constructor() { 
    this.startingPointX = 0;
    this.startingPointY = 0;
    this.endingPointX = 100;
    this.endingPointY = 100;
  }
  
  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.canvas.width = window.innerWidth * 0.87;
    this.canvas.height = window.innerHeight * 0.70;
    this.c = this.canvas.getContext('2d');
    this.createPath(this.canvas.width/2, this.canvas.height/2);
    //this.createLineAnimate();
  }

  createPath_(x : number, y : number, timeStep : number = 10, timeTrendDecreasing: boolean = true) {
    let lowerBound = 2;
    let higherBound = 100;
    this.c.beginPath();
    this.c.moveTo(x, y);
    if (timeStep > lowerBound && timeStep < higherBound) {
      if (timeTrendDecreasing){
        timeStep -= 1;
      } else {
        timeStep += 1;
      }}
      else if (timeStep >= higherBound){
      timeStep = timeStep - 1;
      timeTrendDecreasing = true;
    }
    else if (timeStep <= lowerBound){
      timeStep += 1;
      timeTrendDecreasing = false;
    }
      setTimeout(() => {
        x = this.getCoordinateOnCanvas(x, timeStep, this.canvas.width);
        y = this.getCoordinateOnCanvas(y, timeStep, this.canvas.height);
        this.c.lineTo(x, y);
        let color = "rgb(" + (y).toString() + "," + (x).toString() + "," + (y % 10).toString() + ")";
        this.c.strokeStyle = color;
        this.c.stroke();
        this.createPath(x, y, timeStep, timeTrendDecreasing);
      }, timeStep);
  }
  createPath(x : number, y : number, timeStep : number = 10, timeTrendDecreasing: boolean = true) {
    let lowerBound = 2;
    let higherBound = 100;
    this.c.beginPath();
    this.c.moveTo(x, y);
    if (timeStep > lowerBound && timeStep < higherBound) {
      if (timeTrendDecreasing){
        timeStep -= 1;
      } else {
        timeStep += 1;
      }}
      else if (timeStep >= higherBound){
      timeStep = timeStep - 1;
      timeTrendDecreasing = true;
    }
    else if (timeStep <= lowerBound){
      timeStep += 1;
      timeTrendDecreasing = false;
    }
      setTimeout(() => {
        let endingX = this.getCoordinateOnCanvas(x, timeStep, this.canvas.width);
        let endingY = this.getCoordinateOnCanvas(y, timeStep, this.canvas.height);
        let points = this.getCoordinatesOfPointsBetween(x, y, endingX, endingY);
        let color = "rgb(" + (endingX).toString() + "," + (endingY).toString() + "," + (y % 10).toString() + ")";
        this.drawLineAnimated(points, color);
        this.createPath(endingX, endingY, timeStep, timeTrendDecreasing);
      }, 1000);
  }


  getCoordinateOnCanvas(startingPoint: number, boundaries: number, canvasCoordinate: number) {
    let result = startingPoint + this.getRandomInt(-boundaries,boundaries);
    while(result < 0 || result > canvasCoordinate){
      result = startingPoint + this.getRandomInt(-boundaries,boundaries);
    }
    return result;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;}

    drawLineAnimated(points: any, color: string){
      requestAnimationFrame(() => this.drawLineAnimated(points, color));
      if(points.length >= 2){
        let p0 = points.shift();
        let p1 = points.shift();
        this.c.beginPath();
        this.c.moveTo(p0.x, p0.y);
        this.c.lineTo(p1.x, p1.y);
        this.c.strokeStyle = color;
        this.c.stroke();
      }
    }

createLineAnimate(){
  requestAnimationFrame(this.createLineAnimate.bind(this));
  this.c.beginPath();
  this.c.moveTo(this.startingPointX, this.startingPointY);
  this.startingPointX ++;
  this.startingPointY ++;
  this.c.lineTo(this.startingPointX, this.startingPointY);
  this.c.stroke();
  
}

getCoordinatesOfPointsBetween(x0: number, y0: number, x1: number, y1: number){
    let result = [];
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
 
    while(true) {
       result.push({x : x0,y : y0}); // Do what you need to for this
 
       if ((x0 === x1) && (y0 === y1)) break;
       var e2 = 2*err;
       if (e2 > -dy) { err -= dy; x0  += sx; }
       if (e2 < dx) { err += dx; y0  += sy; }
    }
    return result;
 
}

}
