import "whatwg-fetch";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TLCApplication from "./TLCApplication";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appNumber: null,
      submitted: false,
      error: null,
      application: {
        // app_date: "2017-08-14T00:00:00.000",
        // app_no: "5811854",
        // defensive_driving: "Complete",
        // driver_exam: "Needed",
        // drug_test: "Needed",
        // fru_interview_scheduled: "Not Applicable",
        // lastupdate: "2017-10-25T18:00:25.000",
        // medical_clearance_form: "Complete",
        // other_requirements: "Fingerprints needed",
        // status: "Incomplete",
        // type: "HDR",
        // wav_course: "Complete",
      }
    };
  }

  componentWillMount() {
    const hash = window.location.hash;
    //"#{application_number: 5758825}"
    const appNumber = hash.replace(/#?\{?\}?/g, "").split(": ")[1];
    if (appNumber) {
      this._updateAppNumber(appNumber);
      this._taxiInfo(appNumber);
    }
  }

  _taxiInfo = (appNumber) => {
    // Attempt to use the appNumber saved in state.
    // If it's null, use a passed appNumber
    const appNo = this.state.appNumber || appNumber;
    const baseUrl = "https://data.cityofnewyork.us/resource/xtra-f75s.json";
    const appNumberFilterParam = `app_no=${appNo}`;

    this.setState(() => ({ error: null, submitted: false }))
    return fetch(`${baseUrl}?${appNumberFilterParam}`, {
    method: "GET",
    body: {
      "$limit" : 2,
      //"$$app_token" : "not necessary yet :)"
    }
  })
    .then(response =>
      response.json().then(json => response.ok ? json : Promise.reject(json))
    )
    .then(response => {
      window.location.hash = `#{application_number: ${appNo}}`;

      // If the response returns an empty array, the application wasn't found
      if (response.length === 0) {
        this.setState(() => ({ error: { code: "404" }, submitted: true }))
      }

      // Set application from the response. The response returns an array,
      // but since we're filtering by App number and app numbers are unique,
      // we just take the first response
      this.setState(() => ({ application: response[0], submitted: true }))
    })
    .catch(response => {
      if (response.errorCode === "query.soql.no-such-column") {
        window.location.hash = "";
      }

      this.setState(() => ({ error: response, submitted: true }))
    });
  }

  _updateAppNumber = (val) => (
    this.setState(() => ({ appNumber: val }))
  )

  render() {
    return (
      <div className="App">
        {(!this.state.submitted || this.state.error) &&
          <div className="app-form">
            <div className="app-form-fieldset">
              <label className="app-form--label">Enter your application number</label>
              <div style={{marginBottom: "12px" }}>
                <small>For more help, the <a href="http://www.nyc.gov/html/tlc/html/industry/new_driver_app_lookup.shtml">NYC New Driver Application Status</a> site</small>
              </div>
              <input
                type="text"
                className="app-form--input"
                autoFocus
                placeholder="5817306"
                defaultValue={this.state.appNumber}
                onKeyPress={(e) => {
                  // If enter is clicked in the input, try searching
                  const k = e.keyCode ? e.keyCode : e.which;
                  if (k === 13) {
                    this._taxiInfo();
                  }
                }}
                onChange={(e) => this._updateAppNumber(e.target.value)}
              />
            </div>
            <button
              className="app-form--submit"
              onClick={() => this._taxiInfo()}
              type="submit"
            >
              Search
            </button>
          </div>
        }
        {this.state.submitted &&
          <TLCApplication
            application={this.state.application}
            error={this.state.error}
            resetSearch={() => {
              window.location.hash = "";
              this.setState(() => ({appNumber: null, error: null, submitted: false, application: null }))
            }}
          />
        }
      </div>
    );
  }
}

export default App;
