<template>
	<div>
		<UnitRenderer v-for="entity in engine.entities" :key="entity.id" :entity="entity" />
		<div class="grid" v-for="(y, yIndex) in engine.squares" :key="yIndex">
			<div class="cell" v-for="(x, xIndex) in y" :key="xIndex" @click="positionHere(xIndex, yIndex)" ref="center">
				<div class="center" :class="'cen-' + yIndex + '-' + xIndex" :ref="'cen-' + yIndex + '-' + xIndex"></div>
			</div>
		</div>
        <button type="button" @click="search()">search</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VikingFeodor } from "./../game/VikingFeodor";
import { SjokzValkyr } from "./../game/SjokzValkyr";
import { Vector } from "../game/Vector";
import { Entity } from "../game/Entity";
import UnitRenderer from "../components/UnitRenderer.vue";
import { Engine, IOnlyElements } from "./../game/Engine";
import { MoveAction } from '../game/action/Action';

@Component({
	components: {
		UnitRenderer
	}
})
export default class Home extends Vue {
	public engine!: Engine;
	
    public sjokz = new SjokzValkyr();
    public feodor = new VikingFeodor({
        color: 'dodgerblue',
        width: 15,
        height: 15,
    });

    public constructor() {
        super();
        this.engine = new Engine({
            squareElements: <IOnlyElements>this.$refs
        });
        this.engine.placeEntity(this.sjokz, new Vector(5, 5));
		this.engine.addEntity(this.sjokz);
        this.engine.placeEntity(this.feodor, new Vector(1, 1));
        this.engine.addEntity(this.feodor);
        this.engine.run();
    }

	public positionHere(x: number, y: number): void {
        this.sjokz.moveTowards(new Vector(x, y));
	}

    public search(): void {
        this.feodor.search();
    }

}
</script>

<style lang="scss" scoped>
.grid {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	grid-auto-rows: 1fr;
	grid-gap: 10px;
	margin-bottom: 10px;
	// border: 1px solid red;
	.cell {
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;
		height: 100%;
		color: white;
		border: 1px solid rgb(32, 139, 77);
		border-collapse: collapse;
		&:hover {
			border: 2px solid rgb(120, 20, 167);
			z-index: 2px;
		}
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
</style>
