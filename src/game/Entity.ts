import { Vector } from './Vector';

export abstract class Entity {
    public name: string;
    public position: Vector;

    constructor(position = new Vector()) {
        this.name = 'Mario';
        this.position = position;
    }

    public abstract update(): void;
}