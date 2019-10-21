import { Engine } from '../Engine';
import { Entity } from '../Entity';
import { Vector } from '../Vector';

export class Action {
    public engine!: Engine;
    public cb: () => void;

    public constructor(cb: () => void) {
        this.cb = cb;
    }

    public resolve(): void {
        if (this.cb) {
            this.cb();
        }
    }

}

export class EmptyAction extends Action {
    public constructor() {
        super(() => {});
    }
}

export class MoveAction extends Action {

    private targetMove: Vector;
    private originEntity: Entity;

    public constructor(originEntity: Entity, targetMove: Vector) {
        super(() => {
            if (this.targetMove) {
                const next = MoveAction.getNextSquare(this.originEntity.position, this.targetMove);
                const nextCell = this.engine.getCell(next.x, next.y);
                if (nextCell && nextCell.canWalkThrough()) {
                    this.engine.placeEntity(this.originEntity, next);
                }
            }
        });
        this.originEntity = originEntity;
        this.targetMove = targetMove;
    }

    public static getNextSquare(origin: Vector, target: Vector): Vector {
        const newOrigin = origin.clone();
        const newTarget = target.clone();
        newTarget.subtract(newOrigin);

        const next = new Vector(0, 0);
        if (newTarget.x > 0) {
            next.x = 1;
        } else if (newTarget.x < 0) {
            next.x = -1;
        }

        if (newTarget.y > 0) {
            next.y = 1;
        } else if (newTarget.y < 0) {
            next.y = -1;
        }

        return newOrigin.add(next);
    }

}