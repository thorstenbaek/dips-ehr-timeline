import {writable, derived, Readable} from "svelte/store";
import {oauth2 as SMART} from 'fhirclient';
import type Client from "fhirclient/lib/Client";

export const context = writable(null);

export const fhirClient: Readable<Client> = derived(
    context,
    ($context, set) => {
        if ($context != null && $context.client != null)
        {
            set($context.client);            
        }
    }
)

export const patient = derived(
    context,
    ($context, set) => {
        if ($context != null && $context.client != null)
        {
            $context.client.patient.read().then(p => set(p));            
        }
    }
);

SMART.ready()
    .then(client => {
        console.log(client);
        var newContext = {
            client: client,
            error: null
        };        
        context.set(newContext)
    })
    .catch(error => {
        console.error(error);
        var newContext = {
            client: null,
            error: error
        };        
        context.set(newContext)
    });