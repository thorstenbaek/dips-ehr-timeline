<script lang="ts">
    import {Canvas} from 'svelte-canvas';    
    import BackgroundLayer from './BackgroundLayer.svelte';
    import Content from "./Content.svelte";
    import Overlay from "./Overlay.svelte";
    import TimeRuler from '../Utils/timeRuler';    
    import {selection} from "../stores/timelineStore";    
    import Content2 from './Content2.svelte';

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
                <div class="content">
                    <Content {timeRuler} /> 
                    <Content2 {timeRuler} />        
                </div>
                <Overlay {timeRuler} {width} {height}/>
            </Canvas>            
            
        </div>
    {/if}

<style>
    .timeline {        
        overflow-y: auto;   
        overflow-x: hidden;     
        height: calc(100% - 100px);        
    }    

    .content {
        position: absolute;
        top: 35px;
        left: 5px;
        right: 0;        
    }

</style>
