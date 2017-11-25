import React from "react";
import {
  fitnessInterviewCopy,
  drugTestCopy,
  driverExamCopy,
  medicalClearanceCopy,
  wavCopy
} from "./lib/categories";

import errors from "./lib/errors";

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

const requirements = (application) => [
  {
    type: "FRU interview scheduled",
    status: application.fru_interview_scheduled,
    text: fitnessInterviewCopy(application.fru_interview_scheduled)
  },
  {
    type: "Drug test",
    status: application.drug_test,
    text: drugTestCopy(application.drug_test)
  },
  {
    type: "WAV course",
    status: application.wav_course,
    text: wavCopy(application.wav_course)
  },
  {
    type: "Defensive driving",
    status: application.defensive_driving,
    text: "A NYS certified 6 hour Defensive Driving Course is a requirement to receive your TLC license."
  },
  {
    type: "Driver exam",
    status: application.driver_exam,
    text: driverExamCopy(application.driver_exam)
  },
  {
    type: "Medical clearance form",
    status: application.medical_clearance_form,
    text: medicalClearanceCopy(application.medical_clearance_form)
  },
  {
    type: "Other requirements",
    status: application.other_requirements,
    text: "This field is for miscellaneous items that may need more sensitive information. Visit www.nyc.gov/tlcup for more information and to upload missing requirements."
  },
];

const TLCApplication = ({application, error, resetSearch}) => {
  if (error) {
    return (
      <div className="tlc-application-error">
        {errors(error)}
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
        {
          requirements(application).map((r) => (
            <div key={r.type} className="tlc-application-requirement">
              <p className="tlc-application-requirement--type">{r.type} <span className="tlc-application-requirement--status">{r.status}</span></p>
              <p>{r.text}</p>
            </div>
            )
          )
        }
        </div>
        <div className="tlc-application-footer">
          <span className="tlc-application-footer--applied">Applied on {new Date(application.app_date).toISOString().slice(0,10)}</span>
          <span className="tlc-application-footer--updated">Updated on {new Date(application.lastupdate).toISOString().slice(0,10)}</span>
        </div>
    </div>
  );
}

export default TLCApplication;
