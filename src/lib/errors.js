const errors = (error) => {
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

export default errors;
