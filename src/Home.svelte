<script lang="ts">
  import { fhirClient, patient, status } from "./smartOnFhirStore";

  import PatientHeader from "./Components/PatientHeader.svelte";
  import DocumentReferences from "./Components/DocumentReferences.svelte";
  import Timeline from "./Components/Timeline.svelte";
  import Navigator from "./Components/Navigator.svelte";
  import TimeSlider from "./Components/TimeSlider.svelte";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import Notifier from "./Components/Notifier.svelte";
  import Refresher from "./Components/Refresher.svelte";

  function someFunction() {
    notifier.danger("Notifications work!", 1000);
  }
</script>

{#if $fhirClient != null && $patient != null}  
  <div class="home">
    <Timeline />
    <div class="panel">
      <TimeSlider />
      <Navigator />
      <Refresher/>
      <NotificationDisplay />
      <Notifier />
    </div>
  </div>
{:else}
  Loading patient...
{/if}
<div>
  {$status}
</div>

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
