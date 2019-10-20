export class Sprite {
    public width: number;
    public height: number;
    public color: string;

    public constructor(width: number, height: number, color: string) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

export interface EntityRenderer {
    render: () => void;
}