<script lang="ts">
    
    import type TimeRuler from "../Utils/timeRuler";
    import type Observation from "../Utils/Observation";

    export let title: string;
    export let color: string;
    export let timeRuler: TimeRuler;
    let width: number;
    let height: number;

    export let observations: Observation[];
    export let filter: string;

</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
    {title}
    {#each observations.filter(o => o.code == filter) as observation}            
        <span class="observation" 
            style={`left:${timeRuler.getX(observation.time.getTime(), width)}px;top:5px;background:${color};`}
            title="{observation.time.toLocaleDateString("nb-no")} {observation.time.toLocaleTimeString("nb-no")} {title} {observation.value} {observation.unit}">
        </span>
    {/each}
</div>

<style>
    .observation {
        position: absolute;        
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
</style>