import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.scss']
})
export class HourglassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let canvas = <HTMLCanvasElement>document.querySelector('canvas');
    canvas.width = window.innerWidth * 0.87;
    canvas.height = window.innerHeight * 0.70;
    console.log(canvas.width, canvas.height);
  }

}
