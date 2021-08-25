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
    <Timeline/>    
    <TimeSlider/>
    <Navigator />
{:else}
    Loading patient...
{/if}