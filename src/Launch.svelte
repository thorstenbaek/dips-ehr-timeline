<script lang="typescript">
    import {oauth2 as SMART} from "fhirclient";
    import {onMount} from "svelte";

    onMount(async () => {
        SMART.authorize({
            clientId: 'dips-ehr-timeline',	
            //clientSecret: 'SecretPassword',					
			scope: 'openid launch online_access fhirUser launch/patient patient/DocumentReference.write patient/DocumentReference.read patient/Patient.read patient/encounter patient/resource',						
			redirectUri: './app',			
			//iss:		  'https://launch.smarthealthit.org/v/r3/sim/'
			//  			+ 'eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYT'
			//  			+ 'EtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQt'
			//  			+ 'UHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir',
			//iss: 'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			//iss: 'https://localhost:44308',            
			iss: 'https://thor.dips.fhir.service.api.dips.no',   			
			//launch: 'cdp2010025:kjetil:adrian'        
			launch: '6c5d9ca9-54d7-42f5-bfae-a7c19cd217f2'
        });
    })

</script>