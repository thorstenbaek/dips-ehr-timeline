<script>
    import TimeSlider from "../Timeslider/TimeSlider.svelte"
    import {range} from "../stores/timelineStore";        

    const oneWeekAgo = new Date().getTime() - 3600000*24*7;
    const inOneWeek = new Date().getTime() + 3600000*24*7;
</script>

<TimeSlider min={oneWeekAgo} max={inOneWeek} range order bind:value={$range}/>
