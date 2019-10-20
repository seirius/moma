export class Vector {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public add(other: Vector): Vector {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    public subtract(other: Vector): Vector {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    public clone(): Vector {
        return new Vector(this.x, this.y);
    }

    public equals(other: Vector): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public static zero(): Vector {
        return new Vector(0, 0);
    }
}