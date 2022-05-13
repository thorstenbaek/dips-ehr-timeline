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

FROM COMPOSITION a CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.respiration.v1]
ORDER BY a_a/data[at0001]/events[at0002]/time DESC`;

const AQL_TEMP = `SELECT
a_a/data[at0002]/events[at0003]/time,
a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude,
a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units

FROM COMPOSITION a CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.body_temperature.v2]
ORDER BY a_a/data[at0002]/events[at0003]/time DESC`;

const AQL_PULSE = `SELECT
a_a/data[at0002]/events[at0003]/time,
a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude,
a_a/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units

FROM COMPOSITION a CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.pulse.v1]
ORDER BY a_a/data[at0002]/events[at0003]/time DESC`;

const AQL_MEDICATIONS = `SELECT
a/time,
a/description[at0017]/items[openEHR-EHR-CLUSTER.dosage.v1]/items[at0144]/value/magnitude,
a/description[at0017]/items[openEHR-EHR-CLUSTER.dosage.v1]/items[at0144]/value/units,
a/description[at0017]/items[at0020]/value/value

FROM
COMPOSITION c
CONTAINS ACTION a[openEHR-EHR-ACTION.medication.v1] CONTAINS CLUSTER cl[openEHR-EHR-CLUSTER.dosage.v1]
ORDER BY
a/time DESC`;


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
export const TEMP: ClinicalConcept = {
    name: "Temperatur",
    code: "703421000",
    aql: AQL_TEMP
}
export const PULSE: ClinicalConcept = {
    name: "Puls",
    code: "8499008",
    aql: AQL_PULSE
}

export const MEDICATION: ClinicalConcept = {
    name: "Medikamenter",
    code: "123456",
    aql: AQL_MEDICATIONS
}

