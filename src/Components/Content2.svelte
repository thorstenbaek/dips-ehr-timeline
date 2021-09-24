<script lang="ts">    
    import {fhirClient, patient} from "../smartOnFhirStore";    
    import Accordion from "./Accordion.svelte";
    import type TimeRuler from "../Utils/timeRuler";
    import type Observation from "../Utils/Observation";
    import ContentLine from "./ContentLine.svelte";

    export let timeRuler: TimeRuler;

    const bodyWeightAql: string =   `select
                            a_a/data[at0002]/events[at0003]/time/value as time,
                            e/data[at0001]/items[at0004]/value/magnitude as value,
                            e/data[at0001]/items[at0004]/value/units as unit
                            from
                            composition a
                                contains observation a_a[openEHR-EHR-OBSERVATION.body_weight.v1]
                                    contains event e
                            order by a_a/data[at0002]/events[at0003]/time desc`

    const bodyTemperatureAql: string = `select
                            a/uid/value as compositionid,
                            a/composer/name as author,
                            tag(a,'documentId') as documentid,
                            a_a/archetype_details/archetype_id/value as archetypeid,
                            a_a/data[at0002]/events[at0003]/time as time,
                            e/data[at0001]/items[at0004]/value/units as unit,
                            e/data[at0001]/items[at0004]/value/magnitude as value,
                            e/state[at0008]/items[at0009]/value/value as additionalinfo1
                            from
                            composition a
                            contains observation a_a[openEHR-EHR-OBSERVATION.body_temperature.v*]
                            contains event e
                            where
                            e/archetype_node_id = 'at0003'
                            order by a_a/data[at0002]/events[at0003]/time desc`;
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

            const res = await fetch(
                ehrStoreApi,
                {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                            aql: bodyTemperatureAql,
                             tagScope: {
                                 tags: [
                                 {
                                     values: [
                                        cleanedPatientId      
                                     //"2008687"
                                     ],
                                     tag: "PatientId"
                                 }
                                 ]
                             }                           
                          })
                }
            );            
            const json = await res.json()
            console.log(json);
        }

        var observations: Observation[] = [];
        
        /*if (data && Array.isArray(data)) {
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
        }*/   

        return observations;
    }
</script>

    {#if $fhirClient && patient}
        {#await loadObservations()}
            <p>Loading Vital signs from OpenEHR...</p>
        {:then observations}
            <Accordion title="OpenEHR Vital Signs">        
                <ContentLine title="Body Weight" color="#df6f35" {timeRuler} {observations} filter="29463-7"/>        
                <ContentLine title="Length" color="#579c8e" {timeRuler} {observations} filter="8302-2"/>                    
            </Accordion>
        {:catch error}
            {error}
        {/await}
    {/if}

