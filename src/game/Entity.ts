import { v4 } from 'uuid';
import { Action, EmptyAction } from './action/Action';
import { Engine } from './Engine';
import { Vector } from './Vector';

export abstract class Entity {
    public readonly id = v4();
    public name: string;
    public position: Vector;
    public worldPosition: Vector = new Vector();
    public engine!: Engine;
    public sides: EntitySide[] = [EntitySide.ALLY];
    public freeForAction: boolean = true;

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

    public nextAction(): Action | undefined {
        return new EmptyAction(this);
    }

    public setAsBusy(): void {
        this.freeForAction = false;
    }

    public isBusy(): boolean {
        return !this.freeForAction;
    }

    public setFree(): void {
        this.freeForAction = true;
    }
}

export enum EntitySide {
    ALLY = 1,
    ENEMY = 2
}