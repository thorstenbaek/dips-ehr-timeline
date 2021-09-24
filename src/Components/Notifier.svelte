<script lang="ts">
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { RESPIRASJON, SYSTOLIC } from "../aqls";
  import { queryClinicalConcept } from "../openEHRStore";
  import { fhirClient, patient } from "../smartOnFhirStore";
  import Observation from "../Utils/Observation";
  import { onMount } from "svelte";
  function someFunction() {
    notifier.danger("Notifications work!", 1000);
  }
  function cleanPatientId(patientId: string): string {
    return patientId.replace("cdp", "");
  }
  onMount(async () => {
    evaluateNotifications();
  });
  async function evaluateNotifications() {
    if ($fhirClient && $patient) {
      const url = new URL($fhirClient.state.serverUrl);
      const ehrStoreApi = url.protocol + url.hostname + ":4443/api/v1/query";

      const cleanedPatientId = cleanPatientId($patient.id);
      const resps = await queryClinicalConcept(
        cleanedPatientId,
        ehrStoreApi,
        RESPIRASJON
      );
      const sysols = await queryClinicalConcept(
        cleanedPatientId,
        ehrStoreApi,
        SYSTOLIC
      );
      let theResp: Observation | null = null;
      let theSystolic: Observation | null = null;
      if (resps && resps.length > 0) {
        theResp = resps[0];
      }
      if (sysols && sysols.length > 0) {
        theSystolic = resps[0];
      }
      if (
        theResp != null &&
        theResp.value >= 22 &&
        theSystolic != null &&
        theSystolic.value <= 100
      ) {
        notifier.danger(
          "Mistanke om infeksjon og mulig sepsis. Kontakt lege",
          10000
        );
      } else {
        notifier.info("Ingen problemer med tanke på sepsis", 10000);
      }
    }
  }
</script>

{#if $fhirClient != null && $patient != null}
  <NotificationDisplay />

  <button on:click={someFunction}>Alert</button>
{:else}
  Loading patient...
{/if}

<style>
</style>
