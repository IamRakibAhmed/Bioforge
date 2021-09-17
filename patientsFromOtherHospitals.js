//importing the current patients from patient.js
const patients = require("./patient");

const patientsFromOtherHospital = [
    {
        firstName: "John",
        lastName: "Philips",
        diseases: ["COVID"],
    },
    {
        firstName: "Finn",
        lastName: "Balor",
        diseases: ["Fever"]
    },
    {
        firstName: "James",
        lastName: "Roy",
        diseases: ["Kidney", "Liver"],
    },
    {
        firstName: "Gennedy",
        lastName: "Zocovicks",
        diseases: ["Depression", "Hairfall"],
    },
];

// adding the outside patients
const addOutsidePatients = () => {
    let lastID = patients.reduce((previous, current) => previous.patientID > current.patientID ? previous : current).patientID;
    patientsFromOtherHospital.map(patient => {
        patient.patientID = String(++lastID).padStart(3, '0');
        patient.isAdmitted = true;
    })
}

addOutsidePatients();
console.log('All patients has been added and admitted:', [...patients, ...patientsFromOtherHospital]);
