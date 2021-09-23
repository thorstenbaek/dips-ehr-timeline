<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import pan from "./pan";
  
    const dispatch = createEventDispatcher();    
    
    export let pos: number;
    export let active: boolean = false;
</script>

<div class="thumb"     
     use:pan
     on:panstart={e => {active = true; dispatch('active', active);}}
     on:panend={e => {active = false; dispatch('active', active);}}
     on:pan={e => {pos = e.detail}}>        
</div>

<style>    
    .thumb {        
        position: relative;        
        width: 25px;
        height: 25px;
        transform: translate(-50%, -50%);        
    }
</style>

