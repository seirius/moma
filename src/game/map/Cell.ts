import { Engine } from '../Engine';
import { Entity } from '../Entity';
import { Vector } from '../Vector';

export class Cell {
    public engine: Engine;
    public position: Vector;

    public entities: Entity[] = [];

    public constructor(engine: Engine, position: Vector) {
        this.engine = engine;
        this.position = position;
    }

    public enter(entity: Entity): void {
        entity.position.x = this.position.x;
        entity.position.y = this.position.y;
        this.entities.push(entity);
    }

    public leave(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    public canWalkThrough(): boolean {
        return !this.entities.length;
    }
}