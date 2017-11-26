import {
  fitnessInterviewCopy,
  drugTestCopy,
  driverExamCopy,
  medicalClearanceCopy,
  wavCopy
 } from "./categories";

describe("Categories", () => {
  describe("Fitness Interview", () => {
    describe("Not Applicable", () => {
      it("should return the correct copy", () => {
        expect(fitnessInterviewCopy("Not Applicable")).toEqual("No fitness review is necessary at this time.");
      });
    });

    describe("unhandled status", () => {
      it("should return the default copy", () => {
        expect(fitnessInterviewCopy("some status")).toEqual("A Fitness Interview has been scheduled. Watch your mail/email for more information.");
      });
    });
  });

  describe("Drug test", () => {
    describe("Needed", () => {
      it("should return the correct copy", () => {
        expect(drugTestCopy("Needed")).toEqual("Drug testing is required for Medallion and FHV TLC driver’s licenses. You must take and pass a drug test at an approved testing facility.");
      });
    });

    describe("Complete", () => {
      it("should return the correct copy", () => {
        expect(drugTestCopy("Complete")).toEqual("Your drug test information has been received and updated in your TLC record.");
      });
    });

    describe("Not Applicable", () => {
      it("should return the correct copy", () => {
        expect(drugTestCopy("Not Applicable")).toEqual("If you applied for a Paratransit or Commuter Van license you do not need to take a TLC Drug Test.");
      });
    });

    describe("unhandled status", () => {
      it("should return the default copy", () => {
        expect(drugTestCopy("some status")).toEqual("Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data");
      });
    });
  });

  describe("Driver Exam", () => {
    describe("Needed", () => {
      it("should return the correct copy", () => {
        expect(driverExamCopy("Needed")).toEqual("Upon Completion of TLC Driver Training (Taxi School), you will need to take and pass a final exam. A Passing score is 70%. If you have not taken your TLC Driver Exam please do so.");
      });
    });

    describe("Complete", () => {
      it("should return the correct copy", () => {
        expect(driverExamCopy("Complete")).toEqual("Your TLC Driver Exam information has been received and updated in your TLC record.");
      });
    });

    describe("Not Applicable", () => {
      it("should return the correct copy", () => {
        expect(driverExamCopy("Not Applicable")).toEqual("If you applied for a Paratransit or Commuter Van license you will not need to take this exam.");
      });
    });

    describe("unhandled status", () => {
      it("should return the default copy", () => {
        expect(driverExamCopy("some status")).toEqual("Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data");
      });
    });
  });

  describe("Medical Clearance", () => {
    describe("Needed", () => {
      it("should return the correct copy", () => {
        expect(medicalClearanceCopy("Needed")).toEqual("A Medical Clearance form from a licensed medical doctor is a requirement for those who apply for a Medallion or a For-Hire Vehicle driver’s license. If you have not been medically cleared by a licensed medical doctor please do so immediately.");
      });
    });

    describe("Complete", () => {
      it("should return the correct copy", () => {
        expect(medicalClearanceCopy("Complete")).toEqual("Your Medical Clearance has been received and updated in your TLC record.");
      });
    });

    describe("Not Applicable", () => {
      it("should return the correct copy", () => {
        expect(medicalClearanceCopy("Not Applicable")).toEqual("If you applied for a Paratransit or Commuter Van license you will not need to take this step as it is covered by your 19A status.");
      });
    });

    describe("unhandled status", () => {
      it("should return the default copy", () => {
        expect(medicalClearanceCopy("some status")).toEqual("Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data");
      });
    });
  });

  describe("WAV Copy", () => {
    describe("Needed", () => {
      it("should return the correct copy", () => {
        expect(wavCopy("Needed")).toEqual("Wheelchair Accessible Vehicle Training (WAV) is a requirement for those who apply for a Medallion or For-Hire Vehicle driver’s license. You must take the Wheelchair Accessible Vehicle Training Course within 90 days from the date you submitted your application.");
      });
    });

    describe("Complete", () => {
      it("should return the correct copy", () => {
        expect(wavCopy("Complete")).toEqual("Your WAV training information has been received and updated in your TLC record.");
      });
    });

    describe("Not Applicable", () => {
      it("should return the correct copy", () => {
        expect(wavCopy("Not Applicable")).toEqual("If you applied for a Paratransit or Commuter Van license you do not need to take this exam.");
      });
    });

    describe("unhandled status", () => {
      it("should return the default copy", () => {
        expect(wavCopy("some status")).toEqual("Something went wrong fetching this field. For more information on this application, go to https://data.cityofnewyork.us/Transportation/New-Driver-Application-Status/dpec-ucu7/data");
      });
    });
  });
});
