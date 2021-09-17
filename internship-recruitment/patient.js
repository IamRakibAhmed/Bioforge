// patient List
const kidneysInStock = 10, patientsList = [
    {
        firstName: "John",
        lastName: "Doe",
        patientID: "09",
        diseases: ["COVID", "Kidney", "Diabetes"],
        isAdmitted: false,
    },
    {
        firstName: "Rashid",
        lastName: "Khan",
        patientID: "05",
        diseases: ["Heart Disease"],
        isAdmitted: false,
    },
    {
        firstName: "Lord",
        lastName: "Velvet",
        patientID: "02",
        diseases: ["COVID"],
        isAdmitted: true,
    },
    {
        firstName: "Rihan",
        lastName: "Ahmed",
        patientID: "03",
        diseases: ["COVID", "Kidney"],
        isAdmitted: true,
    },
]

// 1. Listing the patients and ordering them according to their ID
const listPatientsByID = () => {
    patientsList.sort((patient1, patient2) => patient1.patientID - patient2.patientID);
    console.log('Listing all patients by their patient ID:', patientsList);
};

// 2. listing the patients who didn't admit yet and then admit them
const listNonAdmittedPatientsAndAdmit = () => {
    const nonAdmittedPatients = patientsList.filter(patient => !patient.isAdmitted);
    console.log('List of Non-Admitted Patients:', nonAdmittedPatients);
    patientsList.map(patient => {
        patient.isAdmitted || (patient.isAdmitted = true);
        return patient;
    })

    console.log('List of All Patients After getting admitted:', patientsList);
}

// 3. listing the patients who requires kidney
const findPatientsWhoRequiresKidney = () => {
    return patientsList.filter(({diseases}) => diseases.find(disease => disease.includes('Kidney')));
}

// 3(a). finding the number of kidney that are in stock currently
const RemainingKidneyStock = () => {
    const numberOfKidneyPatient = findPatientsWhoRequiresKidney();
    const remainingKidneyStock = kidneysInStock - numberOfKidneyPatient.length;
    console.log('Number of Kidney Remaining in Stock:', remainingKidneyStock);
}

// 4. listing all the covid patients and display them
const findCovidPatientsAndDisplay = () => {
    const covidPatients = patientsList.filter(patient => patient.diseases.find(disease => disease.includes('COVID')));
    console.log('Covid Patient Details:');
    covidPatients.map(patient => {
        const { lastName, firstName, diseases } = patient;
        const diseasesSuffix = diseases.length > 1 ? 'diseases' : 'disease';
        const information = `${firstName}, ${lastName}, ${diseases.length} ${diseasesSuffix}`;
        console.log(information);
    })
}


// function calling
listPatientsByID();
listNonAdmittedPatientsAndAdmit();
console.log('List of patients who requires Kidney:', findPatientsWhoRequiresKidney());
RemainingKidneyStock();
findCovidPatientsAndDisplay();

// to import the array in the patientsFromOtherHospitals file
module.exports = patientsList;
