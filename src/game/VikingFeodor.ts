import { Action, MoveAction } from './action/Action';
import { Entity } from './Entity';
import { EntityRenderer, Sprite } from './Sprite';
 
export class VikingFeodor extends Entity implements EntityRenderer {
    public sprite: Sprite;

    constructor(sprite: Sprite) {
        super();
        this.sprite = sprite;
    }

    public update(): void {
        super.update();
    }

    public render(): void {
        
    }

    public nextAction(): Action | undefined {
        const entities = this.engine.findCloseEntity(this, 3);
        if (entities.length) {
            return new MoveAction(this, entities[0].position);
        }
    }

    public search(): void {
        console.log(this.engine.findCloseEntity(this, 3));
    }

}