<script lang="ts">
    
    import type TimeRuler from "../Utils/timeRuler";
    import type Observation from "../Utils/Observation";

    export let title: string;
    export let color: string;
    export let timeRuler: TimeRuler;
    let width: number;
    let height: number = 120;

    export let observations: Observation[];
    export let filter: string;
    export let icon: string;

</script>

<div class="line" bind:clientWidth={width} bind:clientHeight={height}>    
    {title}
    {#each observations.filter(o => o.code == filter) as observation}          
        <span title="{observation.time.toLocaleDateString("nb-no")} {observation.time.toLocaleTimeString("nb-no")} {title} {observation.value} {observation.unit}">
            <span class="observation" 
                style={`left:${timeRuler.getX(observation.time.getTime(), width, true) - 20}px;top:5px;color:${color};`}>
                {icon}
            </span>
            <span class="value" 
                style={`left:${timeRuler.getX(observation.time.getTime(), width, true)}px;top:5px;`}>
                {observation.value}            
            </span>
        </span>
    {/each}
</div>

<style>
    .observation {
        position: absolute;        
    }

    .value {
        position: absolute;
        font-weight: normal;                
    }    
</style>