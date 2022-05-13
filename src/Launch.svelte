<script lang="typescript">
    import {oauth2 as SMART} from "fhirclient";
    import {onMount} from "svelte";

    onMount(async () => {
        SMART.authorize({
            clientId: 'dips-ehr-timeline',	            
			scope: 'openid launch online_access fhirUser launch/patient patient/Observation.read patient/Patient.read',						            
			redirectUri: './app',			
			iss: 'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			//iss: 'https://localhost:44308',            
			//iss: 'https://thor.dips.fhir.service.api.dips.no',   			
			//launch: 'cdp2008703::'        
            launch: 'cdp2012466::'        
			//launch: '62247e85-c8c1-4047-90b3-e0b3a9c59600'

        });
    })

</script>

Loading...