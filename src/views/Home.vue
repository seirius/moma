<template>
<div>
    <div class="me" ref="me"></div>
    <div class="grid" v-for="(x, xIndex) in squares" :key="xIndex">
        <div v-for="(y, yIndex) in x" :key="yIndex" @click="positionHere(xIndex, yIndex)" ref="center">
            <div class="center" :ref="'cen-' + xIndex + '-' + yIndex"></div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VikingFeodor } from './../game/VikingFeodor';
import { Vector } from "../game/Vector";
import { Entity } from "../game/Entity";

@Component({
    components: {},
    data: () => {
        return {
            entities: [],
            squares: Array.from(Array(15)).map((x) => x = Array.from(Array(15)))
        }
    },
    methods: {
        getEntityByPosition: function (x: number, y: number): void {
            return this.$data.entites.find((entity: Entity) => entity.position.x === x && entity.position.y === y);
        },
        run: function () {
            setTimeout(() => {
                this.$data.entities.forEach((entity: Entity) => {
                    entity.update();
                });
            }, 50);
        }
    },
    mounted: function ()  {
        this.$data.entities.push(new VikingFeodor());
    }
})
export default class Home extends Vue {
    public getCenterPosition(x: number, y: number): Vector {
        const center: HTMLElement = (<HTMLElement[]>this.$refs[`cen-${x}-${y}`])[0];
        const rect = center.getBoundingClientRect();
        return new Vector(center.offsetLeft, center.offsetTop);
    }
    public positionHere(x: number, y: number): void {
        const position = this.getCenterPosition(x, y);

        const me = this.getMe();
        me.style.left = position.x - 7.5 + "px";
        me.style.top = position.y - 7.5 + "px";
    }
    public getMe(): HTMLElement {
        return (<HTMLElement>this.$refs.me);
    }
}
</script>

<style lang="scss" scoped>
.grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    grid-auto-rows: 1fr;
    // border: 1px solid red;
    div {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        height: 100%;
        color: white;
        .center {
            display: hidden;
            width: 0px;
            height: 0px;
        }
    }
}

.grid::before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
}

.grid > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
}

/* Just to make the grid visible */

.grid > * {
    background: rgba(0, 0, 0, 0.1);
    border: 1px white solid;
}

.me {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: dodgerblue;
    border: 1px solid red;
}
</style>
