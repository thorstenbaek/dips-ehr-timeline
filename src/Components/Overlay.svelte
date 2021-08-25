<script lang="ts">
    import type Timeline from "../Utils/timeRuler";    
    import {now} from "../stores/timelineStore";

    export let timeRuler: Timeline;
    export let width: number;
    export let height: number;

    let pos: number;

$: {    
    pos = timeRuler?.getX($now.getTime(), width);
}

</script>

<div class=line style={`left:${pos}px;height:${height}`}/>
<div class=overlay style={`left:${pos}px`}>
    {$now.toLocaleTimeString("nb-no", {
        hour: '2-digit',
        minute:'2-digit',
        second:'2-digit',
        hour12: false
    })}</div>


<style>
    .overlay {
        position: absolute;
        transform: translate(-50%, 0);
        top: 3px;
        padding: 3px 0 0 0;
        height: 16px;
        width: 90px;
        background: #ef8113;        
        color: white;
        font: bold 12px Arial;
        text-align: center;        
        border-radius: 4px;        
    }

    .line {
        position: absolute;
        top: 3px;
        bottom: 0;
        width: 2px;
        transform: translate(-50%, 0);
        background: #ef8113;
        opacity: 0.6;
    }
</style>