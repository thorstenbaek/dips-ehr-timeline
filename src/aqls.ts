import Observation from './Utils/Observation';
const AQL_SYSTOLIC = `SELECT
    a_a/data[at0001]/events[at0006]/time,
    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude,
    a_a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/units

FROM COMPOSITION a CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.blood_pressure.v*]
ORDER BY  a_a/data[at0001]/events[at0006]/time DESC`;
const AQL_RESP = `SELECT
a_a/data[at0001]/events[at0002]/time,
a_a/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude,
a_a/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/units
FROM
COMPOSITION a
CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.respiration.v1]
ORDER BY
a_a/data[at0001]/events[at0002]/time DESC`;



export interface ClinicalConcept {
    name: string;
    code: string;
    aql: string;
}

export const SYSTOLIC: ClinicalConcept = {
    name: "Systolisk",
    code: "271649006",
    aql: AQL_SYSTOLIC
}
export const RESPIRASJON: ClinicalConcept = {
    name: "Respirasjon",
    code: "86290005",
    aql: AQL_RESP
}

