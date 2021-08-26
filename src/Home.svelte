<script lang="ts">
    import {fhirClient, patient} from "./SmartOnFhirStore";        
    import PatientHeader from "./Components/PatientHeader.svelte";
    import DocumentReferences from "./Components/DocumentReferences.svelte";
    import Observations from "./Components/Observations.svelte";
    import Timeline from "./Components/Timeline.svelte";
    import Navigator from "./Components/Navigator.svelte";
    import TimeSlider from "./Components/TimeSlider.svelte";                
</script>
{#if $fhirClient != null && $patient != null}
    <!-- <PatientHeader patient={$patient}/>
    <DocumentReferences client={$fhirClient} />
    <Observations client={$fhirClient} /> -->
    <div class=home>
        <Timeline/>                
        <div class=panel>
            <TimeSlider/>
            <Navigator/> 
        </div>
    </div>
{:else}
    Loading patient...
{/if}

<style>
    .home {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;        
        background: #eeeeee;
    }

    .panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 150px;
    }
</style>