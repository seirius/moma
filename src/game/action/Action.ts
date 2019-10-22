import { Engine } from '../Engine';
import { Entity } from '../Entity';
import { Cell } from '../map/Cell';
import { Vector } from '../Vector';

export class Action {
    public engine!: Engine;
    public parent: Entity;
    public cb: () => void;

    public constructor(parent: Entity, cb: () => void) {
        this.parent = parent;
        this.cb = cb;
    }

    public resolve(): void {
        this.parent.freeForAction = true;
        if (this.cb) {
            this.cb();
        }
    }

}

export class EmptyAction extends Action {
    public constructor(parent: Entity) {
        super(parent, () => {});
    }
}

export class MoveAction extends Action {

    private targetMove: Vector;

    public constructor(parent: Entity, targetMove: Vector) {
        super(parent, () => {
            if (this.targetMove) {
                const next = MoveAction.getNextSquare(this.parent.position, this.targetMove);
                const nextCell: Cell | undefined = this.engine.getCell(next.x, next.y);
                if (nextCell instanceof Cell && nextCell.canWalkThrough()) {
                    this.engine.placeEntity(this.parent, next);
                }
            }
        });
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