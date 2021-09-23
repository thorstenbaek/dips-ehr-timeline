<script lang="ts">

    import Area from "./Area.svelte";

    export let min: number;
    export let max: number;
    export let value: number[] = [0, 0];
    
    let step = 1;
    let pos: number[] = [0, 0];
    let active: boolean = false;

    $: if (active) toValue(pos);
    $: if (!active) toPos(value);    
    $: min, max, clamp();

    function toValue(p: number[]) {
        const offset = min % step;
        const width = max - min
        value = p
            .map(v => min + v * width)
            .map(v => Math.round((v - offset) / step) * step + offset);
    }

    function toPos(v: number[]) {
        const width = max - min;
        pos = v.map(p => (p - min) / width);
    }    

    function clamp() {
        console.log("clamp");
        toPos(value);
        toValue(pos);
    }

    function onActive(e) {
        console.log(e);
    } 
    
</script>

<p>{value[0]} {value[1]}</p>

<div class=track>
    <Area bind:pos={pos} on:active={onActive}>
        
    </Area>        
</div>



<style>    
    .track {
        position: relative;
        margin: 20px 40px 20px 40px;
        height: 8px;        
        background: #cccccc;
    }
</style>