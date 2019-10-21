import { v4 } from 'uuid';
import { Action } from './action/Action';
import { Engine } from './Engine';
import { Vector } from './Vector';

export abstract class Entity {
    public readonly id = v4();
    public name: string;
    public position: Vector;
    public worldPosition: Vector = new Vector();
    public engine!: Engine;
    public sides: EntitySide[] = [EntitySide.ALLY];

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

    public pushAction(action: Action): void {
        
    }
}

export enum EntitySide {
    ALLY = 1,
    ENEMY = 2
}