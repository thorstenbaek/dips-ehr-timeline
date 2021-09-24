<script lang="ts">    
    import {fhirClient, patient} from "../smartOnFhirStore";
    import Accordion from "./Accordion.svelte";
    import type TimeRuler from "../Utils/timeRuler";
    import Observation from "../Utils/Observation";
    import ContentLine from "./ContentLine.svelte";

    export let timeRuler: TimeRuler;
/**
    --dips-red: #cd3925;
    --dips-blue: #06082d;
    --lightest-gray: #e9ecef;
    --lighter-gray: #d4d7d9;
    --gray: #7a7e82;
    --dark-gray: #3c3f42;
    --lightest-blue: #d9ecf0;
    --lighter-blue: #b4dee5;
    --blue: #558c9f;
    --dark-blue: #1b4b5c;
    lightest_cold_green: "#d9efe5",
    lighter_cold_green: "#b5e4d5",
    cold_green: "#579c8e",
    dark_cold_green: "#1c545c",
    lightest_orange: "#fdedcb",
    lighter_orange: "#f7cca4",
    --orange: #df6f35;
    /*dark_orange: "#ad4219",
    lightest_warm_green: "#d5e8cb",
    lighter_warm_green: "#bce3b0",
    warm_green: "#60975d",
    dark_warm_green: "#225628",
 * **/
    async function loadObservations() {
        const growthChartCodes = "code=http://loinc.org|29463-7,http://loinc.org|3141-9,http://loinc.org|8302-2,http://loinc.org|8306-3,http://loinc.org|8287-5,http://loinc.org|39156-5,http://loinc.org|18185-9,http://loinc.org|37362-1,http://loinc.org|11884-4";
        var data = await $fhirClient.request(`/Observation?patient=${$patient.id}&${growthChartCodes}`);

        var observations: Observation[] = [];
        
        if (data && Array.isArray(data)) {
            data.map(item => {
                observations.push(
                    new Observation(
                        item.id,
                        item.code.coding[0].code,
                        item.code.text,
                        new Date(item.effectiveDateTime),
                        item.valueQuantity.value,
                        item.valueQuantity.unit)
                );
            });       
        }    

        return observations;
    }
</script>

    {#if $fhirClient && patient}
        {#await loadObservations()}
            <p>Loading Vital signs from FHIR...</p>
        {:then observations}
            <Accordion title="FHIR Vital Signs">        
                <ContentLine title="Body Weight" color="#df6f35" {timeRuler} {observations} filter="29463-7" icon="⚖"/>        
                <ContentLine title="Length" color="#579c8e" {timeRuler} {observations} filter="8302-2" icon="📏"/>                    
            </Accordion>
        {:catch error}
            {error}
        {/await}
    {/if}

<style>
    .content {
        position: absolute;
        top: 35px;
        left: 5px;
        right: 0;        
    }

    
</style>