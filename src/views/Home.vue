<template>
<div>
    <div class="grid" v-for="(x, xIndex) in squares" :key="xIndex">
        <div v-for="(y, yIndex) in x" :key="yIndex" @click="positionHere(xIndex, yIndex)">
            <span>{{}}</span>
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
        positionHere: function (x: number, y: number) {
        },
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
        this.entities.push(new VikingFeodor());
    }
})
export default class Home extends Vue {}
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
        color: red;
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
</style>
