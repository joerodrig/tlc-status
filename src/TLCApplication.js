import React from "react";

const errorMessage = (error) => {
  switch(error.code) {
    case "query.soql.no-such-column":
    case "query.compiler.malformed":
      return "The application number entered is invalid";
    case "404":
      return "We were unable to find your application";
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

const TLCApplication = ({application, error}) => {
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
        <p className="tlc-application-type">{application.type} Application for {application.app_no}</p>
        <p className="tlc-application-status">{application.status}</p>
        <div className="tlc-application-times">
          <span>Applied on {new Date(application.app_date).toISOString().slice(0,10)}</span>
          <span>Last Updated on {new Date(application.lastupdate).toISOString().slice(0,10)}</span>
        </div>
      </div>


      <div className="tlc-application-requirements">
        <h2>Requirements</h2>
        <span><i>({completionCount(application).completed}/{completionCount(application).total}) complete</i></span>
        <div className="tlc-application-requirement">
          <p>Defensive driving {application.defensive_driving}</p>
        </div>
        <div className="tlc-application-requirement">
          <p>Driver exam {application.driver_exam}</p>
        </div>
        <div className="tlc-application-requirement">
          <div>Drug test {application.drug_test}</div>
        </div>
        <div className="tlc-application-requirement">
          <p>Wav course {application.wav_course}</p>
          {/* Uber wav training docs: https://www.uber.com/drive/new-york/get-a-license/wav-training/ */}
        </div>
        <div className="tlc-application-requirement">
          <p>Defensive driving {application.defensive_driving}</p>
        </div>



        <div>Medical clearance form {application.medical_clearance_form}</div>
        <div>Other requirements {application.other_requirements}</div>

        <div>fru interview scheduled {application.fru_interview_scheduled}</div>
      </div>
    </div>
  );
}

export default TLCApplication;
