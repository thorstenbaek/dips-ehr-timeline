import {ClinicalConcept, SYSTOLIC, RESPIRASJON, PULSE, TEMP, MEDICATION} from './aqls';

import Observation from "./Utils/Observation";

interface ResultSet {

    columns: Column[];
    creation_time: string;
    totalResults: string;
    rows: Array<Array<any>>;

}
interface Column {
    name: string;
    path: string;
}


export async function queryObservations(patientId: string, ehrStoreUrl: string): Promise<Observation[]> {
    const concepts: ClinicalConcept[] = [
        SYSTOLIC,
        RESPIRASJON,
        PULSE,
        TEMP,
        MEDICATION
    ]
    var allObservatoins: Observation[] = [];
    concepts.forEach(async c => {
        const result = await queryClinicalConcept(patientId, ehrStoreUrl, c);
        result.forEach(r => {
            allObservatoins.push(r);
        })
    })
    console.log(allObservatoins);
    return allObservatoins;

}
export async function queryClinicalConcept(patientId: string, ehrStoreUrl: string, aql: ClinicalConcept): Promise<Observation[]> {
    const observations: Observation[] = [];
    
    if (patientId) {
        const res = await fetch(
            ehrStoreUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    aql: aql.aql,
                    tagScope: {
                        tags: [
                            {
                                values: [
                                    patientId
                                ],
                                tag: "PatientId"
                            }
                        ]
                    }
                })
            }
        );
        const json: ResultSet = await res.json()
                    
        json.rows?.forEach(row => {
            const t = row[0].value;
            const v = row[1];
            const u = row[2];

            var text = row.length > 3 ? row[3] : aql.name;
            const o = new Observation("theid", aql.code, text, new Date(t), v, u);
            observations.push(o);
        })
    }

    return observations;
}