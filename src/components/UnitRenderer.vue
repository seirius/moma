<template>
    <div v-if="entity.sprite" class="sprite" v-bind:style="{
        'background-color': entity.sprite.color,
        width: `${entity.sprite.width}px`, 
        height: `${entity.sprite.height}px`,
        top: `${entity.worldPosition.x - (entity.sprite.width / 2)}px`,
        left: `${entity.worldPosition.y - (entity.sprite.height) / 2}px`
    }"></div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import { Entity } from '../game/Entity';

@Component({ components: {} })
export default class UnitRenderer extends Vue {
    @Prop()
    public entity!: Entity;
}
</script>

<style lang="scss" scope>
.sprite {
    position: absolute;
}
</style>