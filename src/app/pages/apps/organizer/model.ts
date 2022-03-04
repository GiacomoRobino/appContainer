export class Activity {
    public name: string;
    public duration: number;
    public grade: string;
    constructor(name: string, duration: number, color: string) {
        this.name = name;
        this.duration = duration;
        this.grade = color;
    }
}