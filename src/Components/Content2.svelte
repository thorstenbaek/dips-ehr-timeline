<script lang="ts">    
    import {fhirClient, patient} from "../smartOnFhirStore";    
    import Accordion from "./Accordion.svelte";
    import type TimeRuler from "../Utils/timeRuler";
    import type Observation from "../Utils/Observation";
    import ContentLine from "./ContentLine.svelte";
    import {queryObservations} from "../openEHRStore";

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
    function cleanPatientId(patientId: string): string {
        return patientId.replace("cdp", "");
    }

    async function loadObservations(): Promise<Observation[]> {
        if ($fhirClient && $patient) {
            const url = new URL($fhirClient.state.serverUrl);
            const ehrStoreApi = url.protocol + url.hostname + ":4443/api/v1/query";

            const cleanedPatientId = cleanPatientId($patient.id);
            const result = await queryObservations(cleanedPatientId, ehrStoreApi);                        
            console.log(result);
            return result;
        } else {
            return [];
        }
    }
</script>

    {#if $fhirClient && patient}
        {#await loadObservations()}
            <p>Loading Vital signs from OpenEHR...</p>
        {:then observations}
            <Accordion title="OpenEHR Vital Signs">        
                <ContentLine title="Respirasjon" color="#bce3b0" {timeRuler} {observations} filter="86290005" icon="🎺"/>                        
                <ContentLine title="Temperature" color="#1c545c" {timeRuler} {observations} filter="703421000" icon="🌡"/>       
                <ContentLine title="Puls" color="#b4dee5" {timeRuler} {observations} filter="8499008" icon="❤"/>                        
                <ContentLine title="Systolic Blood Pressure" color="#df6f35" {timeRuler} {observations} filter="271649006" icon="❤"/>        
            </Accordion>
        {:catch error}
            {error}
        {/await}
    {/if}

