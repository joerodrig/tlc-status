import React from "react";

const errorMessage = (error) => {
  switch(error.code) {
    case "query.soql.no-such-column":
    case "query.compiler.malformed":
      return "The application number entered is invalid";
    case "404":
      return (`
        We were unable to find your application. \n
        Are you sure the application number is correct? \n
      `);
    default:
      return "There was an issue retrieving your application";
  }
}

const completionCount = (application) => {
  const requirementKeys = [
    "defensive_driving",
    "driver_exam",
    "drug_test",
    "fru_interview_scheduled",
    "wav_course",
    "other requirements",
  ];
  const totalRequirementsCount = requirementKeys.filter((k) => application[k] !== "Not Applicable").length
  const completedRequirementsCount = requirementKeys.filter((k) => application[k] === "Complete").length
  return { completed: completedRequirementsCount, total: totalRequirementsCount };
};

const TLCApplication = ({application, error, resetSearch}) => {
  if (error) {
    return (
      <div className="tlc-application-error">
        {errorMessage(error)}
      </div>
    )
  }

  return (
    <div className="tlc-application-container">
      <div className="tlc-application-header">
        <span className="tlc-application-header--type">{application.type} Application #{application.app_no}</span>
        <span
          onClick={resetSearch}
          className="tlc-application-header--search"
        >
          Search again
        </span>
      </div>

      <div className="tlc-application-sub-header">
        <h2 className="tlc-application-sub-header--status">{application.status}</h2>
        <p><i>({completionCount(application).completed}/{completionCount(application).total}) complete</i></p>
      </div>

      <div className="tlc-application-requirements">
        <h2>Requirements</h2>

        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">FRU interview scheduled <span className="tlc-application-requirement--status">{application.fru_interview_scheduled}</span></p>
          <p>Fitness Review Unit Interview: “Not Applicable” if no Fitness Review is necessary. OR If there is a date, a Fitness Interview has been scheduled. Watch your mail/email for more information.</p>
        </div>

        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">Drug test <span className="tlc-application-requirement--status">{application.drug_test}</span></p>
          <p>Drug testing is required for Medallion and FHV TLC driver’s licenses. "Needed": You must take and pass a drug test at an approved testing facility. “Not Applicable”: If you applied for a Paratransit or Commuter Van license you do not need to take a TLC Drug Test. “Complete”: Your drug test information has been received and updated in your TLC record.</p>
        </div>

        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">WAV course <span className="tlc-application-requirement--status">{application.wav_course}</span></p>
          <p>Wheelchair Accessible Vehicle Training (WAV) is a requirement for those who apply for a Medallion or For-Hire Vehicle driver’s license. “Needed”: You must take the Wheelchair Accessible Vehicle Training Course within 90 days from the date you submitted your application. “Not Applicable”: If you applied for a Paratransit or Commuter Van license you will not need to take this training. “Complete”: Your WAV training information has been received and updated in your TLC record.</p>
          {/* Uber wav training docs: https://www.uber.com/drive/new-york/get-a-license/wav-training/ */}
        </div>

        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">Defensive driving <span className="tlc-application-requirement--status">{application.defensive_driving}</span></p>
          <p>A NYS certified 6 hour Defensive Driving Course is a requirement to receive your TLC license.</p>
        </div>
        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">Driver exam <span className="tlc-application-requirement--status">{application.driver_exam}</span></p>
          <p>Upon Completion of TLC Driver Training (Taxi School), you will need to take and pass a final exam. Passing score is 70%. “Needed”: Your TLC Driver Exam information is not in our system. If you have not taken your TLC Driver Exam please do so. “Not Applicable”: If you applied for a Paratransit or Commuter Van license you will not need to take this exam. “Complete”: Your TLC Driver Exam information has been received and updated in your TLC record
</p>
        </div>

        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">Medical clearance form <span className="tlc-application-requirement--status">{application.medical_clearance_form}</span></p>
          <p>A Medical Clearance form from a licensed medical doctor is a requirement for those who apply for a Medallion or a For-Hire Vehicle driver’s license. If the entry is: “Needed”: Your Medical Clearance form is not in our system. If you have not been medically cleared by a licensed medical doctor please do so immediately. “Not Applicable”: If you applied for a Paratransit or Commuter Van license you will not need to take this step as it is covered by your 19A status. “Complete”: Your Medical Clearance has been received and updated in your TLC record.</p>
        </div>
        <div className="tlc-application-requirement">
          <p className="tlc-application-requirement--type">Other requirements <span className="tlc-application-requirement--status">{application.other_requirements}</span></p>
          <p>This field is for miscellaneous items that may need more sensitive information. Visit www.nyc.gov/tlcup for more information and to upload missing requirements. “Not Applicable”: “Other requirements” do not apply to you at this time.</p>
        </div>
        </div>
        <div className="tlc-application-footer">
          <span className="tlc-application-footer--applied">Applied on {new Date(application.app_date).toISOString().slice(0,10)}</span>
          <span className="tlc-application-footer--updated">Last Updated on {new Date(application.lastupdate).toISOString().slice(0,10)}</span>
        </div>
    </div>
  );
}

export default TLCApplication;
