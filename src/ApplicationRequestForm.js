import React from "react";

const ENTER_KEY = 13;

const ApplicationRequestForm = ({applicationNumber, fetchTaxiAppInfo, updateApplicationNumber}) => (
  <div className="app-form">
    <div className="app-form-fieldset">
      <label className="app-form--label">Enter your application number</label>
      <div style={{marginBottom: "12px" }}>
        <small>For help with your application, visit the <a href="http://www.nyc.gov/html/tlc/html/industry/new_driver_app_lookup.shtml">NYC New Driver Application Status</a> site</small>
      </div>
      <input
        type="text"
        className="app-form--input"
        autoFocus
        placeholder="5817306"
        defaultValue={applicationNumber}
        onKeyPress={(e) => {
          // If enter is clicked in the input, try searching
          const k = e.keyCode ? e.keyCode : e.which;
          if (k === ENTER_KEY) {
            fetchTaxiAppInfo();
          }
        }}
        onChange={(e) => updateApplicationNumber(e.target.value)}
      />
    </div>
    <button
      className="app-form--submit"
      onClick={fetchTaxiAppInfo}
      type="submit"
    >
      Search
    </button>
  </div>
);

export default ApplicationRequestForm;
