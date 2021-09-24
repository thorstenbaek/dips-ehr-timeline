import {ClinicalConcept, SYSTOLIC, RESPIRASJON, PULSE, TEMP} from './aqls';

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
        TEMP
    ]
    const allObservatoins: Observation[] = [];
    concepts.forEach(async c => {
        const result = await queryClinicalConcept(patientId, ehrStoreUrl, c);
        allObservatoins.concat(result);
    })
    return allObservatoins;

}
async function queryClinicalConcept(patientId: string, ehrStoreUrl: string, aql: ClinicalConcept): Promise<Observation[]> {
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
        console.log(json);

        json.rows.forEach(row => {
            const t = row[0];
            const v = row[1];
            const u = row[2];
            const o = new Observation("theid", aql.code, aql.name, new Date(t), v, u);

        })
    }
    return observations;


}