<script lang="ts">    
    import {fhirClient, patient} from "../smartOnFhirStore";    
    import Accordion from "./Accordion.svelte";
    import type TimeRuler from "../Utils/timeRuler";
    import Observation from "../Utils/Observation";
    import ContentLine from "./ContentLine.svelte";

    export let timeRuler: TimeRuler;

    const bloodPressureAql = `SELECT
                                    a_a/data[at0001]/events[at0006]/time,
                                    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude,
                                    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude,
                                    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/units

                                FROM
                                    COMPOSITION a
                                        CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.blood_pressure.v1]
                                ORDER BY
                                    a_a/data[at0001]/events[at0006]/time DESC`;
    
    const bodyWeightAql: string =   `select
                            a_a/data[at0002]/events[at0003]/time/value as time,
                            e/data[at0001]/items[at0004]/value/magnitude as value,
                            e/data[at0001]/items[at0004]/value/units as unit
                            from
                            composition a
                                contains observation a_a[openEHR-EHR-OBSERVATION.body_weight.v1]
                                    contains event e
                            order by a_a/data[at0002]/events[at0003]/time desc`

    const bodyTemperatureAql: string = `SELECT
                                            a_a/data[at0002]/events[at0003]/time,
                                            a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude,
                                            a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units

                                        FROM
                                            COMPOSITION a
                                                CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.body_temperature.v2]
                                        ORDER BY
                                            a_a/data[at0002]/events[at0003]/time DESC`;
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
        var observations: Observation[] = [];

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
                                     ],
                                     tag: "PatientId"
                                 }
                                 ]
                             }                           
                          })
                }
            );            

            const data = await res.json()
            console.log(data);

            if (data.totalResults > 0) {              
                data.rows.map(row => {
                    console.log(row);

                    observations.push(
                        new Observation(
                            "0",
                            "29463-7",
                            "item.code.text",
                            new Date(row[0].value),
                            row[1],
                            row[2])
                    );
                });
            }
        }
        
        return observations;
    }
</script>

    {#if $fhirClient && patient}
        {#await loadObservations()}
            <p>Loading Vital signs from OpenEHR...</p>
        {:then observations}
            <Accordion title="OpenEHR Vital Signs">        
                <ContentLine title="Body Temperature" color="#df6f35" {timeRuler} {observations} filter="29463-7"/>        
            </Accordion>
        {:catch error}
            {error}
        {/await}
    {/if}

