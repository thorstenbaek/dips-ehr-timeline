<script lang="ts">
    export let client;
    
    async function loadDocumentReferences() {
            var data = await client.request("/DocumentReference?patient=" + client.patient.id);
         
            var documents = [];
            data.entry.map(item => {
                documents.push({
                    id: client.getPath(item, "id"),
                    text: client.getPath(item, "resource.type.text")
                });
            });            

            return documents;
        }

</script>
<p>
    {#await loadDocumentReferences()}
        Loading documents...
    {:then documents}
        Documents: {documents.length}
    {:catch error}
        error
    {/await}
</p>
