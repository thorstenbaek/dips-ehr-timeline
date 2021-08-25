<script>
    export let patient;
</script>

    {#each patient?.name[0].given as given, i}
        {given}
    {/each}
    {patient?.name[0].family}    