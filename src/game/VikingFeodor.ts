import { Entity } from './Entity';

export class VikingFeodor extends Entity {
    constructor() {
        super();
    }

    public update(): void {
        this.position.x++;
    }
}