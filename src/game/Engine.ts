import { Entity } from './Entity';
import { Vector } from './Vector';

export class Engine {
    public actionTick = 8000;

    public entities: Entity[] = [];
    public squares: any[] = Array.from(Array(15))
    .map(x => (x = Array.from(Array(15))));
    public squareElements: IOnlyElements;

    private actionStartTimer?: number = 0;
    private actionTimer: number = 0;

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
                this.entities.forEach((entity: Entity) => {
                    const action = entity.getAction();
                    action.engine = this;
                    action.resolve();
                });
                this.actionStartTimer = undefined;
                this.actionTimer = 0;
            }
			this.run();
		}, 50);
    }

    public getEntityByPostion(position: Vector): Entity | undefined {
        return this.entities.find((entity) => entity.position.equals(position));
    }
}

export interface IEngineArgs {
    squareElements: IOnlyElements;
}

export interface IOnlyElements {
    [key: string]: HTMLElement[];
}
