<script type="ts">
    import { createEventDispatcher } from "svelte";
    import Thumb from "./Thumb.svelte";
    import pan from "./pan";

    const dispatch = createEventDispatcher();    

    export let pos: number[];
    let start: number;
    let width: number;

    $: setWidth(pos);      
    function setWidth(p) {
        width = (p[1] - p[0])*100;
    }
    
    $: setStart(start);
    function setStart(s) {
        console.log(s);
        pos[0] = s;
    }

    $: setPos(width);
    function setPos(w) {
        pos[1] = pos[0] + w;
    }
    
    export let active: boolean = false;

</script>

<div class="area" style={`left:${pos[0]*100}%;width:${width}%`}>
    <div class="zoom left"
        use:pan
        on:panstart={e => {active = true; dispatch('active', active);}}
        on:panend={e => {active = false; dispatch('active', active);}}
        on:pan={e => {start = e.detail}}/>
    <div class="zoom right"
        use:pan
        on:panstart={e => {active = true; dispatch('active', active);}}
        on:panend={e => {active = false; dispatch('active', active);}}
        on:pan={e => {start = e.detail}}/>
</div>

<style>
    .area {
        min-width: 25px;
        position: absolute;
        height: 8px;
        top: 50%;  
        background: #0077aa;
        border-style: solid;
        border-color: black;
        border-width: 1px 0 1px 0;
        transform: translate(-50%, -50%); 
    }

    .zoom {
        top: -7px;  
        height: 22px;
        width: 22px;
        background: white;
        border: 1px black solid;
        border-radius: 2px;
    }

    .left {
        position: absolute;
        left: 0;
    }

    .right {
        position: absolute;
        right: 0;
    }
</style>