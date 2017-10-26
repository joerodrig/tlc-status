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

  _taxiInfo = () => {
    const baseUrl = "https://data.cityofnewyork.us/resource/xtra-f75s.json";
    const appNumberFilterParam = `app_no=${this.state.appNumber}`;

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
      this.setState(() => ({ error: response, submitted: true }))
    });
  }

  _updateAppNumber = (val) => (
    this.setState(() => ({ appNumber: val }))
  )

  render() {
    return (
      <div className="App">
        <div className="app-form">
          <h3>Application Number</h3>
          <input
            type="number"
            defaultValue={this.state.appNumber}
            onChange={(e) => this._updateAppNumber(e.target.value)}
          />
          <button onClick={() => this._taxiInfo()} type="submit">Search</button>
        </div>

        {this.state.submitted &&
          <TLCApplication
            application={this.state.application}
            error={this.state.error}
          />
        }
      </div>
    );
  }
}

export default App;
