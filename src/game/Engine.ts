import { Action } from './action/Action';
import { Entity } from './Entity';
import { Cell } from './map/Cell';
import { Vector } from './Vector';

export class Engine {
    public actionTick = 8000;

    public entities: Entity[] = [];
    public squares: any[] = Array.from(Array(15))
    .map(x => (x = Array.from(Array(15))));
    public cells: Cell[][] = Array.from(Array(15))
    .map(y => (y = Array.from(Array(15)).map(x => new Cell(this, new Vector(x, y)))));
    public squareElements: IOnlyElements;

    private actionStartTimer?: number = 0;
    private actionTimer: number = 0;

    private actionQueue: Action[] = [];

    public constructor(args: IEngineArgs) {
        const {squareElements} = args;
        this.squareElements = squareElements;
    }

    public getCenterPosition(x: number, y: number): Vector {
		const center: HTMLElement = (<HTMLElement[]>(
			this.squareElements[`cen-${x}-${y}`]
        ))[0];
        if (!center) {
            return Vector.zero();
        }
		return new Vector(center.offsetLeft, center.offsetTop);
    }
    
    public addEntity(entity: Entity): void {
        entity.engine = this;
        this.entities.push(entity);
        entity.onWorldAdd();
    }

    public run(): void {
        setTimeout(() => {
            if (!this.actionStartTimer) {
                this.actionStartTimer = Date.now();
            }
            this.entities.forEach((entity: Entity) => entity.update());
            this.actionTimer += Date.now() - this.actionStartTimer;
            if (this.actionTimer >= this.actionTick) {
                this.actionQueue.forEach((action) => {
                    action.engine = this;
                    action.resolve();
                });
                this.actionStartTimer = undefined;
                this.actionTimer = 0;
                this.actionQueue.length = 0;
            }
			this.run();
		}, 50);
    }

    public getEntityByPostion(position: Vector): Entity | undefined {
        return this.entities.find((entity) => entity.position.equals(position));
    }

    public pushAction(action: Action): void {
        this.actionQueue.push(action);
    }

    public getCell(x: number, y: number): Cell | undefined {
        const yCells = this.cells[y];
        if (yCells) {
            return yCells[x];
        }
    }

    public placeEntity(entity: Entity, position: Vector): void {
        const currentCell = this.getCell(entity.position.x, entity.position.y);
        if (currentCell) {
            currentCell.leave(entity);
        }
        const nextCell = this.getCell(position.x, position.y);
        if (nextCell) {
            nextCell.enter(entity);
        }
    }

    public findCloseEntity(position: Vector, range: number): Entity[] {
        // TODO: find entity by range
        return [];
    }
}

export interface IEngineArgs {
    squareElements: IOnlyElements;
}

export interface IOnlyElements {
    [key: string]: HTMLElement[];
}
