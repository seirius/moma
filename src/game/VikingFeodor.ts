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

    public search(): void {
        console.log(this.engine.findCloseEntity(this.position, 3));
    }

}