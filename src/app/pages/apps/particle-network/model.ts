export class Particle {
  public h: number;
  public w: number;
  public x: number;
  public y: number;
  public color: string;
  public radius: number;
  public speed: number;
  public directionAngle: number;
  public vector: { x: number; y: number };
  public ctx: any;

  constructor(w: number, h: number, options: any, ctx: any) {
    this.ctx = ctx;
    this.h = h;
    this.w = w;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.color = options.particleColor;
    this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.vector = {
      x:
        Math.cos(Math.floor(Math.random() * 360)) * options.defaultSpeed +
        Math.random() * options.variantSpeed,

      y:
        Math.sin(Math.floor(Math.random() * 360)) * options.defaultSpeed +
        Math.random() * options.variantSpeed,
    };
  }

  public update() {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  public border() {
    if (this.x >= this.w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= this.h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > this.w) this.x = this.w;
    if (this.y > this.h) this.y = this.h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
