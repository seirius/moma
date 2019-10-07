<template>
    <div class="grid">
        <div v-for="sq in squares" :key="sq"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data: () => {
        return {
            squares: Array.from(Array(225))
        }
    }
});
</script>

<style lang="scss">
.grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    grid-auto-rows: 1fr;
    // border: 1px solid red;
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
