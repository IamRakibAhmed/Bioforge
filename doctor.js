// Doctors List
const doctorList = [
    {
        doctorID: "6215",
        firstName: "Jalaluddin",
        lastName: "Mahbub",
        teamID: "008",
        doctorType: "Consultant",
        email: "jabub@hospital.com",
        active: true,
        doctorRequests: []
    },
    {
        doctorID: "6216",
        firstName: "Amin",
        lastName: "Morshed",
        teamID: "008",
        doctorType: "Assistant Consultant",
        email: "amhed@hospital.com",
        active: true
    },
    {
        doctorID: "6214",
        firstName: "Mahady",
        lastName: "Selim",
        teamID: "005",
        doctorType: "Consultant",
        email: "malim@hospital.com",
        active: true,
        doctorRequests: ["6213", ]
    },
    {
        doctorID: "6213",
        firstName: "Jamela",
        lastName: "Begum",
        teamID: "005",
        doctorType: "RMO",
        email: "jagum@hospital.com",
        active: false
    },
]

// team list
const teamList = [
    {
        teamName: "nephrology",
        teamID: "008",
        consultantInCharge: "6215",
        teamMates: ["6216",]
    },
    {
        teamName: "cardiology",
        teamID: "005",
        consultantInCharge: "6214",
        teamMates: []
    },
]

// 1. adding new doctor and generating their email address
const addNewDoctor = (newDoctor) => {
    let lastID = doctorList.reduce((previous, current) => previous.doctorID > current.doctorID ? previous : current).doctorID;
    newDoctor.doctorID = String(++lastID).padStart(3, '0');
    let { firstName, lastName } = newDoctor;
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    newDoctor.email = firstName.slice(0, 2) + lastName.slice(lastName.length - 3) + '@hospitalname.com';
    doctorList.push(newDoctor);
    console.log("New doctor added:", doctorList);
    return doctorList;
}

addNewDoctor({
    firstName: 'Rakib',
    lastName: 'Ahmed',
    doctorType: 'RMO',
    teamID: '',
    active: false,
});

const getDoctorByID = (doctorID) => {
    for (let doctor of doctorList) {
        if (doctor.doctorID === doctorID) return doctor;
    }
}

// 2(a) adding new doctors into the team 008
const addNewDoctorTeam = (newDoctorID, teamID) => {
    const consultantInChargeID = teamList.find(team => team.teamID === teamID).consultantInCharge;
    const consultantInCharge = doctorList.find(doctor => doctor.doctorID === consultantInChargeID);
    consultantInCharge.doctorRequests.push(newDoctorID);
    console.log('Consultant in Charge Request:', consultantInCharge);
    console.log('Do you want to approve the following doctor?', getDoctorByID(newDoctorID));

    approveNewDoctor(newDoctorID, teamID);
    const doctor = doctorList.filter(team => team.teamID.includes('8'));
    console.log('All doctors of the team 008', doctor);
}

// 2(b) approving the new doctor
const approveNewDoctor = (newDoctorID, teamID) => {
    const updatedTeam = teamList.find(team => team.teamID === teamID);
    updatedTeam.teamMates.push(newDoctorID);
    console.log('Added to the team', updatedTeam)
    const newDoctor = doctorList.find(doctor => doctor.doctorID === newDoctorID);
    newDoctor.teamID = teamID;
    newDoctor.active = true;
    console.log('New Doctor Status & updated Team', newDoctor);
}

addNewDoctorTeam('6217', '008');

// 3 promoting the doctor
const promoteDoctor = (ID, doctorType) => {
    const index = doctorList.findIndex(doctor => doctor.doctorID === ID);
    index !== -1 && (doctorList[index].doctorType = doctorType);
    console.log('Updated doctors list after promotion:', doctorList);
}

promoteDoctor('6217', 'Assistant Consultant');

// 4 removing Amin Morshed and disabled his account
const removeDoctorFromTeam = (ID) => {
    const doctor = doctorList.find(doctor => doctor.doctorID === ID)
    const teamID = doctor.teamID;
    const teamMates = teamList.find(t => t.teamID === teamID).teamMates;
    const index = teamMates.findIndex(teamMate => teamMate === ID);
    teamMates.splice(index, 1);
    doctor.active = false;
    console.log('Doctor Removed:', doctor);
}

removeDoctorFromTeam('6216');
