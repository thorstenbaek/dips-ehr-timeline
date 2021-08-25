
<script lang="ts">
    import {range} from "../stores/timelineStore";    

    function getWeek() : Date[] {
        let curr = new Date();
        let week = []

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i 
            let time = new Date(curr.setDate(first)); 
            if (i == 7) {
                let day = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 23, 59, 59);
                week.push(day)
            } else {
                let day = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                week.push(day)
            }
            
        }

        return week;
    }

    const currentWeek = getWeek();
    const ranges = [];
    const today = new Date();
    ranges.push({title: "Today", range: [today.getTime() - 12*3600000, today.getTime() + 12*3600000]});
    ranges.push({title: "Week", range: [currentWeek[0].getTime(), currentWeek[6].getTime()]});
    ranges.push({title: "Summer", range: [new Date("2021-03-27T20:00:00.000").getTime(), new Date("2021-03-28T08:00:00.000").getTime()]});
    ranges.push({title: "Winter", range: [new Date("2021-10-30T20:00:00.000").getTime(), new Date("2021-10-31T08:00:00.000").getTime()]});
    
</script>

<form on:submit|preventDefault={() => {}}>
    <select bind:value={$range}>
        {#each ranges as range}
            <option value={range.range}>{range.title}</option>
        {/each}
    </select>
</form>