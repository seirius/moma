import { Action, MoveAction } from './action/Action';
import { Entity } from './Entity';
import { EntityRenderer, Sprite } from './Sprite';
import { Vector } from './Vector';

export class SjokzValkyr extends Entity implements EntityRenderer {

    public sprite: Sprite;
    public targetMove?: Vector;

    constructor() {
        super();
        this.sprite = new Sprite(20, 20, 'pink');
    }

    public update(): void {
        super.update();
    }

    public render(): void {}

    public moveTowards(target: Vector): void {
        this.targetMove = target;
    }

    public nextAction(): Action | undefined {
        if (this.targetMove !== undefined && !this.targetMove.equals(this.position)) {
            return new MoveAction(this, this.targetMove);
        }
    }

}