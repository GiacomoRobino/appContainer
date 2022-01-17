import { SimulationNodeDatum } from "d3-force";
export class Node implements SimulationNodeDatum {
    public x: number;
    public y: number;
    constructor(public body : any = {}) {
      this.x = 0;
      this.y = 0;
    }
  }