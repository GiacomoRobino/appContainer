import { SimulationNodeDatum } from "d3-force";
export class Node implements SimulationNodeDatum {
    public x: number;
    public y: number;
    constructor(public name : string) {
      this.x = 30;
      this.y = 30;
    }
  }