
/**
* @param {string} fruStatus
* @return {string}
**/
export const fitnessInterviewCopy = (fruStatus) => {
  switch(fruStatus) {
    case "Not Applicable":
      return "No fitness review is necessary at this time.";
    default:
      return "A Fitness Interview has been scheduled. Watch your mail/email for more information.";
  }
};

export const drugTestCopy = (drugTestStatus) => {
  switch(drugTestStatus) {
    case "Needed":
      return "Drug testing is required for Medallion and FHV TLC driver’s licenses. You must take and pass a drug test at an approved testing facility.";
    case "Complete":
      return "Your drug test information has been received and updated in your TLC record.";
    case "Not Applicable":
      return "If you applied for a Paratransit or Commuter Van license you do not need to take a TLC Drug Test.";
    default:
      return "Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data";
  }
};

export const driverExamCopy = (driverExamStatus) => {
  switch(driverExamStatus) {
    case "Needed":
      return "Upon Completion of TLC Driver Training (Taxi School), you will need to take and pass a final exam. A Passing score is 70%. If you have not taken your TLC Driver Exam please do so.";
    case "Complete":
      return "Your TLC Driver Exam information has been received and updated in your TLC record.";
    case "Not Applicable":
      return "If you applied for a Paratransit or Commuter Van license you will not need to take this exam.";
    default:
      return "Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data";
  }
};

export const medicalClearanceCopy = (medClearanceStatus) => {
  switch(medClearanceStatus) {
    case "Needed":
      return "A Medical Clearance form from a licensed medical doctor is a requirement for those who apply for a Medallion or a For-Hire Vehicle driver’s license. If you have not been medically cleared by a licensed medical doctor please do so immediately.";
    case "Complete":
      return "Your Medical Clearance has been received and updated in your TLC record.";
    case "Not Applicable":
      return "If you applied for a Paratransit or Commuter Van license you will not need to take this step as it is covered by your 19A status.";
    default:
      return "Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data";
  }
}

export const wavCopy = (wavStatus) => {
  switch(wavStatus) {
    case "Needed":
      return "Wheelchair Accessible Vehicle Training (WAV) is a requirement for those who apply for a Medallion or For-Hire Vehicle driver’s license. You must take the Wheelchair Accessible Vehicle Training Course within 90 days from the date you submitted your application.";
    case "Complete":
      return "Your WAV training information has been received and updated in your TLC record.";
    case "Not Applicable":
      return "If you applied for a Paratransit or Commuter Van license you do not need to take this exam.";
    default:
      return "Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data";
  }
};
