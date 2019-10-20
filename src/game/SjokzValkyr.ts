import { EntityRenderer, Sprite } from './Sprite';
import { Entity } from './Entity';
import { Action, MoveAction, EmptyAction } from './action/Action';
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

    public getAction(): Action {
        if (this.targetMove) {
            return new MoveAction(this, this.targetMove);
        } else {
            return new EmptyAction();
        }
    }

}