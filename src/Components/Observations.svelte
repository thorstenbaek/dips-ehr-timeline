<script lang="ts">
    export let client;

    async function loadObservations() {
            const growthChartCodes = "code=http://loinc.org|29463-7,http://loinc.org|3141-9,http://loinc.org|8302-2,http://loinc.org|8306-3,http://loinc.org|8287-5,http://loinc.org|39156-5,http://loinc.org|18185-9,http://loinc.org|37362-1,http://loinc.org|11884-4";
            var data = await client.request(`/Observation?patient=${client.patient.id}&${growthChartCodes}`);

            var observations = [];
            
            if (data && Array.isArray(data)) {
                data.map(item => {
                    observations.push({
                        id: client.getPath(item, "id"),
                        text: client.getPath(item, "resource.type.text")
                    });
                });       
            }    

            return observations;
        }
</script>
<p>
    {#await loadObservations()}
        Loading Observations...
    {:then observations}
        Observations: {observations.length}
    {:catch error}
        {error}
    {/await}
</p>
