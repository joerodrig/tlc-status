import React, { Component } from "react";
import "./App.css";
import TLCApplication from "./TLCApplication";
import ApplicationRequestForm from "./ApplicationRequestForm";
import { fetchApplication } from "./actions/async.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appNumber: null,
      submitted: false,
      error: null,
      application: {}
    };
  }

  componentWillMount() {
    const hash = window.location.hash;
    const appNumber = hash.replace(/#?\{?\}?/g, "").split(": ")[1];
    if (appNumber) {
      this._updateAppNumber(appNumber);
      this._taxiInfo(appNumber);
    }
  }

  _taxiInfo = async(appNumber) => {
    // Attempt to use the appNumber saved in state.
    // If it's null, use a passed appNumber
    const appNum = this.state.appNumber || appNumber;

    this.setState(() => ({ error: null, submitted: false }))
    return await fetchApplication(appNum)
      .then(response =>
        response.json().then(json => response.ok ? json : Promise.reject(json))
      )
      .then(response => {
        window.location.hash = `#{application_number:${appNum}}`;

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
          <ApplicationRequestForm
            applicationNumber={this.state.appNumber}
            fetchTaxiAppInfo={this._taxiInfo}
            updateApplicationNumber={this._updateAppNumber}
          />
        }
        {this.state.submitted &&
          <TLCApplication
            application={this.state.application}
            error={this.state.error}
            resetSearch={() => {
              window.location.hash = "";
              this.setState(() => ({ appNumber: null, error: null, submitted: false, application: null }))
            }}
          />
        }
      </div>
    );
  }
}

export default App;
