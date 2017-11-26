import errors from "./errors";

describe("errors", () => {
  describe("404", () => {
    it("should return the correct error message", () => {
      expect(errors({code: "404"})).toEqual(`
        We were unable to find your application. \n
        Are you sure the application number is correct? \n
      `)
    })
  });

  describe("malformed or incorrect field specified", () => {
    it("should return the correct error message", () => {
      expect(errors({code: "query.soql.no-such-column"})).toEqual("The application number entered is invalid")
    });

    it("should return the correct error message", () => {
      expect(errors({code: "query.compiler.malformed"})).toEqual("The application number entered is invalid")
    });
  });

  describe("unhandled error message", () => {
    it("should return the default error message", () => {
      expect(errors({code: "unhandled"})).toEqual("There was an issue retrieving your application")
    });
  });
});
