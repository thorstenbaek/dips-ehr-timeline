<script lang="ts">
    import Accordion from "./Accordion.svelte";
    import type TimeRuler from "../Utils/timeRuler";

    export let title: string;
    export let color: string;
    export let timeRuler: TimeRuler;
    export let width: number;
    export let height: number;

    export let observations: any;
    export let filter: string;

</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
    {title}
    {#each observations.filter(o => o.code == filter) as weight}            
        <span class="observation" 
            style={`left:${timeRuler.getX(weight.time, width)}px;top:5px;background:${color};`}
            title="{new Date(weight.time).toLocaleDateString("nb-no")} {new Date(weight.time).toLocaleTimeString("nb-no")} {title} {weight.value} {weight.unit}">
        </span>
    {/each}
</div>

<style>
    .observation {
        position: absolute;        
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: black solid 0.5px;                
    }
</style>