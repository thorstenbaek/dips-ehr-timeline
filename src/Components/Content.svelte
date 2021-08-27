<script lang="ts">
    import {fhirClient, patient} from "../smartOnFhirStore";
    import type TimeRuler from "../Utils/timeRuler";

    export let timeRuler: TimeRuler;
    export let width: number;
    let top = 35;
    
    async function loadObservations() {
        const growthChartCodes = "code=http://loinc.org|29463-7,http://loinc.org|3141-9,http://loinc.org|8302-2,http://loinc.org|8306-3,http://loinc.org|8287-5,http://loinc.org|39156-5,http://loinc.org|18185-9,http://loinc.org|37362-1,http://loinc.org|11884-4";
        var data = await $fhirClient.request(`/Observation?patient=${$patient.id}&${growthChartCodes}`);

        var observations = [];
        
        if (data && Array.isArray(data)) {
                
            //var weights = data.filter(d => d.code.coding[0].code == "29463-7");

            data.map(item => {
                observations.push({
                    id: item.id,
                    code: item.code.coding[0].code,
                    text: item.code.text,
                    time: new Date(item.effectiveDateTime).getTime(),
                    value: item.valueQuantity.value,
                    unit: item.valueQuantity.unit
                });
            });       
        }    

        return observations;
    }

</script>

<div class=content>
    {#await loadObservations()}
        Loading Vital signs...
    {:then observations}
        <div>Vital signs</div>
        <div>            
            Body Weight
            {#each observations.filter(o => o.code == "29463-7") as weight}            
                <span class="observation" 
                    style={`left:${timeRuler.getX(weight.time, width)}px;top:${top}px;background: lightgreen;`}
                    title="{weight.value} {weight.unit}">
                </span>
            {/each}
        </div>
        <div>
            Length
            {#each observations.filter(o => o.code == "8302-2") as height}            
                <span class="observation" 
                    style={`left:${timeRuler.getX(height.time, width)}px;top:${top += 20}px;background: lightblue;`}
                    title="{height.value} {height.unit}">
                </span>
            {/each}
        </div>
    {:catch error}
        {error}
    {/await}
</div>

<style>
    .content {
        position: absolute;
        top: 35px;
        left: 5px;
        right: 0;        
    }

    .observation {
        position: absolute;        
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: black solid 0.5px;                
    }
</style>