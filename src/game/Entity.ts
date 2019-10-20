import { Vector } from './Vector';
import { v4 } from 'uuid';
import { Engine } from './Engine';
import { Action } from './action/Action';

export abstract class Entity {
    public readonly id = v4();
    public name: string;
    public position: Vector;
    public worldPosition: Vector = new Vector();
    public engine!: Engine;

    constructor(position = new Vector()) {
        this.name = 'Mario';
        this.position = position;
    }

    public update(): void {
        if (this.position && this.engine) {
            this.worldPosition = this.engine
            .getCenterPosition(this.position.x, this.position.y);
        }
    }

    public onWorldAdd(): void {}

    public abstract getAction(): Action;
}