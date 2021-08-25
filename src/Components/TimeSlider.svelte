<script>
    import Slider from '@bulatdashiev/svelte-slider';
    import {range, selection} from "../stores/timelineStore";        

    const oneWeekAgo = new Date().getTime() - 3600000*24*7;
    const inOneWeek = new Date().getTime() + 3600000*24*7;
</script>

<Slider min={oneWeekAgo} max={inOneWeek} range order bind:value={$range}/>