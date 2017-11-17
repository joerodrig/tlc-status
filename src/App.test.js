import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import ApplicationRequestForm from "./ApplicationRequestForm";
import TLCApplication from "./TLCApplication";

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find(".App")).toHaveLength(1);
  });

  describe("Application submitted", () => {
    describe("errors exist", () => {
      beforeEach(() => {
        wrapper.setState({
          submitted: true,
          error: "uh oh!",
        });
      });

      it("should display the application request form component", () => {
        expect(wrapper.find(ApplicationRequestForm)).toHaveLength(1);
      });

      it("should display the TLCApplication component", () => {
        expect(wrapper.find(TLCApplication)).toHaveLength(1);
      });
    });

    describe("no errors exist", () => {
      beforeEach(() => {
        wrapper.setState({
          submitted: true,
          error: null,
        });
      });

      it("should NOT display the application request form component", () => {
        expect(wrapper.find(ApplicationRequestForm)).toHaveLength(0);
      });

      it("should display the TLCApplication component", () => {
        expect(wrapper.find(TLCApplication)).toHaveLength(1);
      });
    });
  });

  describe("Application not submitted", () => {
    it("should display the application request form component", () => {
      expect(wrapper.find(ApplicationRequestForm)).toHaveLength(1);
    });

    it("should NOT display the TLCApplication component", () => {
      expect(wrapper.find(TLCApplication)).toHaveLength(0);
    });
  });
});
