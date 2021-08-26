<script lang="ts">
    import {Canvas} from 'svelte-canvas';    
    import BackgroundLayer from './BackgroundLayer.svelte';
    import Overlay from "./Overlay.svelte";
    import TimeRuler from '../Utils/timeRuler';    
    import {selection} from "../stores/timelineStore";    

    let width: number;
    let height: number;
    let canvasElement: Element;   
    let timeRuler: TimeRuler;
    
    $: {
        timeRuler = new TimeRuler($selection, 200);
    }
</script>
    {#if $selection && timeRuler}
        <div class="timeline" bind:clientWidth={width} bind:clientHeight={height}>
            <Canvas width={width} height={height} bind:this={canvasElement} autoClear="false">                
                <BackgroundLayer {timeRuler}/>                         
                <Overlay {timeRuler} {width} {height}/>
            </Canvas>            
            
        </div>
    {/if}

<style>
    .timeline {        
        overflow-y: auto;        
        height: calc(100% - 150px);        
    }

    .content {
        position: absolute;
        top: 35px;
        left: 5px;
    }
</style>
