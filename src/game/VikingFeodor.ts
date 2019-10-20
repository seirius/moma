import { Entity } from './Entity';
import { Sprite, EntityRenderer } from './Sprite';
import { Action } from './action/Action';
 
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

    public getAction(): Action {
        return new Action(() => {});
    }
}