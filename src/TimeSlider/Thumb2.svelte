<script lang="ts">
    import Thumb from "./Thumb.svelte";

    export let pos: number[];
    let active: boolean = false;
</script>

<div class="thumb"
     style={`left: ${pos[0] * 100}%;`}>

    <Resizer on:active={d => active = d.detail} style="align-self:left">
        <div class="my-thumb" />
    </Resizer>     
    <Thumb on:active={d => active = d.detail} style="align-self:right">
        <div class="my-thumb" />
    </Thumb>

</div>

<style>
    .thumb {
        position: absolute;
        top: 50%;
        min-width: 25px;
        width: 100px;
        height: 25px;
        background: red;
        transform: translate(-50%, -50%);        
    }

    .my-thumb {
        width: 5px;
        height: 20px;
        background: rgba(175, 175, 175, 0.75);
        border: 1px solid black;        
    }
</style>    